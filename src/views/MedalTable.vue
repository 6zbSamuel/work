<template>
  <div class="medal-table">
    <div class="olympic-decorations left">
      <div class="decoration-item torch">
        <i class="fas fa-fire"></i>
        <span>Olympic Flame</span>
      </div>
      <div class="decoration-item laurel">
        <i class="fas fa-award"></i>
        <span>Victory</span>
      </div>
      <div class="decoration-item sports">
        <i class="fas fa-running"></i>
        <span>Athletics</span>
        <i class="fas fa-swimming-pool"></i>
        <span>Swimming</span>
        <i class="fas fa-table-tennis"></i>
        <span>Table Tennis</span>
      </div>
    </div>

    <div class="main-content">
      <div v-if="isLoading" class="loading">
        <i class="fas fa-spinner fa-spin"></i>
        Loading...
      </div>

      <template v-else>
        <div class="controls glass">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search countries..."
            />
          </div>
          <PageSizeControl v-model="store.itemsPerPage" />
        </div>

        <div class="table-container glass">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>
                  <i class="fas fa-medal gold"></i>
                  Gold
                </th>
                <th>
                  <i class="fas fa-medal silver"></i>
                  Silver
                </th>
                <th>
                  <i class="fas fa-medal bronze"></i>
                  Bronze
                </th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(country, index) in displayedCountries"
                :key="country.id"
                @click="navigateToCountry(country.id)"
                class="country-row"
              >
                <td>{{ getRank(index) }}</td>
                <td class="country-name">
                  <img
                    :src="`https://flagcdn.com/${country.details.countryCode.toLowerCase()}.svg`"
                    :alt="`${country.name} flag`"
                    class="table-flag"
                  />
                  {{ country.name }}
                </td>
                <td>{{ country.goldMedals }}</td>
                <td>{{ country.silverMedals }}</td>
                <td>{{ country.bronzeMedals }}</td>
                <td class="total">
                  {{
                    country.goldMedals +
                    country.silverMedals +
                    country.bronzeMedals
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination glass">
          <button @click="currentPage--" :disabled="currentPage === 1">
            <i class="fas fa-chevron-left"></i>
            Previous
          </button>
          <div class="page-numbers">
            <button
              v-for="page in displayedPages"
              :key="page"
              :class="{
                active: currentPage === page,
                ellipsis: page === -1,
              }"
              @click="page !== -1 && (currentPage = page)"
            >
              {{ page === -1 ? "..." : page }}
            </button>
          </div>
          <button @click="currentPage++" :disabled="currentPage === totalPages">
            Next
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </template>
    </div>

    <div class="olympic-decorations right">
      <div class="decoration-item motto">
        <span>"Citius, Altius, Fortius"</span>
        <small>Faster, Higher, Stronger</small>
      </div>
      <div class="decoration-item rings">
        <div class="mini-rings">
          <span class="ring blue"></span>
          <span class="ring yellow"></span>
          <span class="ring black"></span>
          <span class="ring green"></span>
          <span class="ring red"></span>
        </div>
      </div>
      <div class="decoration-item venue">
        <i class="fas fa-landmark"></i>
        <span>Tokyo 2020</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useMedalStore } from "../stores/medalStore";
import { useRouter } from "vue-router";
import PageSizeControl from "../components/PageSizeControl.vue";

const router = useRouter();
const store = useMedalStore();
const currentPage = ref(1);
const searchQuery = ref("");
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    if (store.countries.length === 0) {
      store.$reset();
    }
  } finally {
    isLoading.value = false;
  }
});

const filteredCountries = computed(() => {
  const filtered = store.countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  return filtered.sort((a, b) => {
    const totalA = a.goldMedals + a.silverMedals + a.bronzeMedals;
    const totalB = b.goldMedals + b.silverMedals + b.bronzeMedals;

    if (totalA !== totalB) {
      return totalB - totalA;
    } else if (a.goldMedals !== b.goldMedals) {
      return b.goldMedals - a.goldMedals;
    } else if (a.silverMedals !== b.silverMedals) {
      return b.silverMedals - a.silverMedals;
    } else {
      return b.bronzeMedals - a.bronzeMedals;
    }
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredCountries.value.length / store.itemsPerPage)
);

const startIndex = computed(() => (currentPage.value - 1) * store.itemsPerPage);

const displayedCountries = computed(() =>
  filteredCountries.value.slice(
    startIndex.value,
    startIndex.value + store.itemsPerPage
  )
);

const displayedPages = computed(() => {
  const pages: number[] = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const leftBound = Math.max(1, currentPage.value - 2);
    const rightBound = Math.min(totalPages.value, currentPage.value + 2);

    if (leftBound > 1) {
      pages.push(1);
      if (leftBound > 2) pages.push(-1);
    }

    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(i);
    }

    if (rightBound < totalPages.value) {
      if (rightBound < totalPages.value - 1) pages.push(-1);
      pages.push(totalPages.value);
    }
  }

  return pages;
});

watch([searchQuery, () => store.itemsPerPage], () => {
  currentPage.value = 1;
});

watch([totalPages, currentPage], ([total, current]) => {
  if (current > total && total > 0) {
    currentPage.value = total;
  }
});

const navigateToCountry = (id: number) => {
  router.push(`/country/${id}`);
};

const getRank = (index: number) => {
  const country = displayedCountries.value[index];
  const totalCurrent =
    country.goldMedals + country.silverMedals + country.bronzeMedals;
  const goldCurrent = country.goldMedals;

  return (
    filteredCountries.value.findIndex(
      (c) =>
        c.goldMedals + c.silverMedals + c.bronzeMedals === totalCurrent &&
        c.goldMedals === goldCurrent &&
        c.id === country.id
    ) + 1
  );
};
</script>

<style scoped>
.medal-table {
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
}

.main-content {
  width: 100%;
  max-width: 1200px;
}

.olympic-decorations {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.decoration-item {
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.decoration-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.decoration-item i {
  font-size: 1.5rem;
  color: var(--olympic-blue);
}

.decoration-item span {
  font-size: 0.8rem;
  text-align: center;
  color: var(--text-secondary);
}

.torch i {
  color: var(--olympic-red);
  animation: flicker 2s infinite;
}

.sports {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sports i {
  font-size: 1.2rem;
}

.motto {
  background: linear-gradient(
    135deg,
    var(--olympic-blue),
    var(--olympic-green)
  );
  color: white;
}

.motto span {
  color: white;
  font-style: italic;
  font-weight: 500;
}

.motto small {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.7rem;
}

.mini-rings {
  display: flex;
  gap: 2px;
  transform: scale(0.5);
}

.mini-rings .ring {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

.venue {
  background: linear-gradient(
    135deg,
    var(--olympic-red),
    var(--olympic-yellow)
  );
}

.venue i,
.venue span {
  color: white;
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@media (max-width: 1200px) {
  .medal-table {
    grid-template-columns: 80px 1fr 80px;
    gap: 1rem;
  }

  .decoration-item {
    padding: 0.8rem;
  }
}

@media (max-width: 768px) {
  .medal-table {
    grid-template-columns: 1fr;
  }

  .olympic-decorations {
    display: none;
  }
}

.decoration-item {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.decoration-item:hover i {
  transform: scale(1.2);
}

.sports i:hover {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.glass:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.controls {
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.8)
  );
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.search-box input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
}

.search-box input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 133, 199, 0.1);
  outline: none;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.search-box input:focus + i {
  color: var(--primary);
}

.table-container {
  overflow-x: auto;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.9)
  );
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  background: rgba(248, 250, 252, 0.8);
  padding: 1.2rem 1rem;
  font-weight: 600;
  text-align: left;
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-medium);
  transition: background-color 0.3s ease;
}

th:first-child {
  border-top-left-radius: 15px;
}

th:last-child {
  border-top-right-radius: 15px;
}

td {
  padding: 1.2rem 1rem;
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

.country-row {
  cursor: pointer;
  transition: all 0.3s ease;
}

.country-row:hover {
  background-color: rgba(241, 245, 249, 0.8);
  transform: scale(1.01);
}

.country-name {
  font-weight: 500;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-flag {
  width: 30px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.country-row:hover .table-flag {
  transform: scale(1.1);
}

.total {
  font-weight: 600;
  color: var(--primary-dark);
}

.fa-medal.gold {
  color: var(--secondary);
  text-shadow: 0 2px 4px rgba(244, 195, 0, 0.2);
}
.fa-medal.silver {
  color: #c0c0c0;
  text-shadow: 0 2px 4px rgba(192, 192, 192, 0.2);
}
.fa-medal.bronze {
  color: #cd7f32;
  text-shadow: 0 2px 4px rgba(205, 127, 50, 0.2);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.8)
  );
}

.pagination button {
  padding: 0.8rem 1.2rem;
  border: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.pagination button:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.page-numbers button {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.5);
}

.page-numbers button.active {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 133, 199, 0.2);
}

@media (max-width: 768px) {
  .medal-table {
    padding: 1rem;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .search-box {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-numbers {
    order: 2;
    width: 100%;
    justify-content: center;
    margin: 0.5rem 0;
  }

  .pagination button:first-child {
    order: 1;
  }

  .pagination button:last-child {
    order: 3;
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.loading i {
  font-size: 1.5rem;
  color: var(--olympic-blue);
}

/* 更新表格样式 */
.table-container {
  overflow-x: auto;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.9)
  );
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1.1rem;
}

th {
  background: rgba(248, 250, 252, 0.8);
  padding: 1.2rem 1rem;
  font-weight: 600;
  text-align: left;
  color: var(--text-secondary);
  border-bottom: 2px solid var(--border-medium);
  transition: background-color 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 1;
}

th:first-child {
  border-top-left-radius: 15px;
  padding-left: 2rem;
}

th:last-child {
  border-top-right-radius: 15px;
  padding-right: 2rem;
}

td {
  padding: 1.2rem 1rem;
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s ease;
}

td:first-child {
  padding-left: 2rem;
}

td:last-child {
  padding-right: 2rem;
}

.country-row {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.country-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: var(--olympic-blue);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.country-row:hover {
  background-color: rgba(241, 245, 249, 0.8);
  transform: translateX(5px);
}

.country-row:hover::before {
  opacity: 1;
}

.country-name {
  font-weight: 500;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 12px;
}

.table-flag {
  width: 35px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.country-row:hover .table-flag {
  transform: scale(1.1) rotate(3deg);
}

.fa-medal {
  font-size: 1.2rem;
  margin-right: 0.5rem;
  transition: transform 0.3s ease;
}

th:hover .fa-medal {
  transform: rotate(360deg);
}

.fa-medal.gold {
  color: var(--olympic-yellow);
  text-shadow: 0 2px 4px rgba(244, 195, 0, 0.2);
}

.fa-medal.silver {
  color: #c0c0c0;
  text-shadow: 0 2px 4px rgba(192, 192, 192, 0.2);
}

.fa-medal.bronze {
  color: #cd7f32;
  text-shadow: 0 2px 4px rgba(205, 127, 50, 0.2);
}

.total {
  font-weight: 600;
  color: var(--primary-dark);
  position: relative;
}

.total::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 1rem;
  right: 1rem;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.country-row:hover .total::after {
  transform: scaleX(1);
}

/* 更新搜索框样式 */
.search-box input {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-box input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 133, 199, 0.1);
  outline: none;
  transform: translateY(-1px);
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.search-box input:focus + i {
  color: var(--primary);
  transform: translateY(-50%) scale(1.1);
}

/* 添加加载动画 */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.loading i {
  font-size: 2rem;
  color: var(--olympic-blue);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式优化 */
@media (max-width: 1024px) {
  .medal-table {
    padding: 1rem;
  }

  table {
    font-size: 1rem;
  }

  td,
  th {
    padding: 1rem 0.8rem;
  }
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    max-width: 100%;
  }

  .table-flag {
    width: 25px;
  }
}

/* 添加滚动条样式 */
.table-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--olympic-blue);
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}
</style>
