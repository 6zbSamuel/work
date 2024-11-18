<template>
  <div class="medal-table">
    <div class="controls glass">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search countries..."
        >
      </div>
      <PageSizeControl
        v-model="store.itemsPerPage"
      />
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
          <tr v-for="(country, index) in displayedCountries" 
              :key="country.id"
              @click="navigateToCountry(country.id)"
              class="country-row">
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
              {{ country.goldMedals + country.silverMedals + country.bronzeMedals }}
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
            'ellipsis': page === -1
          }"
          @click="page !== -1 && (currentPage = page)"
        >
          {{ page === -1 ? '...' : page }}
        </button>
      </div>
      <button @click="currentPage++" :disabled="currentPage === totalPages">
        Next
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useMedalStore } from '../stores/medalStore';
import { useRouter } from 'vue-router';
import PageSizeControl from '../components/PageSizeControl.vue';

const router = useRouter();
const store = useMedalStore();
const currentPage = ref(1);
const searchQuery = ref('');

const filteredCountries = computed(() => {
  const filtered = store.countries.filter(country => 
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

const startIndex = computed(() => 
  (currentPage.value - 1) * store.itemsPerPage
);

const displayedCountries = computed(() => 
  filteredCountries.value.slice(startIndex.value, startIndex.value + store.itemsPerPage)
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
  const totalCurrent = country.goldMedals + country.silverMedals + country.bronzeMedals;
  const goldCurrent = country.goldMedals;
  
  return filteredCountries.value.findIndex(c => 
    c.goldMedals + c.silverMedals + c.bronzeMedals === totalCurrent &&
    c.goldMedals === goldCurrent &&
    c.id === country.id
  ) + 1;
};
</script>

<style scoped>
.medal-table {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.medal-table::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--olympic-blue) 0%, transparent 70%);
  opacity: 0.1;
  border-radius: 50%;
  z-index: -1;
}

.medal-table::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--olympic-red) 0%, transparent 70%);
  opacity: 0.1;
  border-radius: 50%;
  z-index: -1;
}

.glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
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

.fa-medal.gold { color: var(--secondary); text-shadow: 0 2px 4px rgba(244, 195, 0, 0.2); }
.fa-medal.silver { color: #C0C0C0; text-shadow: 0 2px 4px rgba(192, 192, 192, 0.2); }
.fa-medal.bronze { color: #CD7F32; text-shadow: 0 2px 4px rgba(205, 127, 50, 0.2); }

.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
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
</style> 