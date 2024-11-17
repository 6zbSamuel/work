<template>
  <div class="container">
    <div class="header-section">
      <h1 class="title">
        <i class="fas fa-medal title-icon"></i>
        Olympic Medal Table
      </h1>
      <p class="subtitle">Tokyo 2020 Olympics</p>
    </div>

    <div class="search-container" :class="{ 'search-focus': isSearchFocused }">
      <i class="fas fa-search search-icon"></i>
      <input
        v-model="searchCountry"
        type="text"
        placeholder="Search by country name"
        @keyup.enter="navigateToCountry"
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
        class="search-input"
      />
    </div>

    <div class="table-wrapper">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="rank-column">#</th>
              <th>Country</th>
              <th class="medal-column">
                <div class="medal-header">
                  <i class="fas fa-medal gold"></i>
                  <span>Gold</span>
                </div>
              </th>
              <th class="medal-column">
                <div class="medal-header">
                  <i class="fas fa-medal silver"></i>
                  <span>Silver</span>
                </div>
              </th>
              <th class="medal-column">
                <div class="medal-header">
                  <i class="fas fa-medal bronze"></i>
                  <span>Bronze</span>
                </div>
              </th>
              <th class="total-column">
                <div class="medal-header">
                  <i class="fas fa-trophy"></i>
                  <span>Total</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(country, index) in paginatedCountries"
              :key="country.name"
              @click="showCountryDetails(country.name)"
              class="country-row"
            >
              <td class="rank-column">{{ (currentPage - 1) * countriesPerPage + index + 1 }}</td>
              <td>
                <div class="country-cell">
                  <img :src="getFlagImage(country.name)" alt="Flag" class="flag" />
                  <span class="country-name">{{ country.name }}</span>
                </div>
              </td>
              <td class="medal-column">
                <span class="medal-count gold-text">{{ country.gold }}</span>
              </td>
              <td class="medal-column">
                <span class="medal-count silver-text">{{ country.silver }}</span>
              </td>
              <td class="medal-column">
                <span class="medal-count bronze-text">{{ country.bronze }}</span>
              </td>
              <td class="total-column">
                <span class="total-count">{{ totalMedals(country) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="pagination">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        <i class="fas fa-chevron-left"></i>
        Previous
      </button>
      <div class="page-indicator">
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
      </div>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        Next
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useOlympicStore } from '../store'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useOlympicStore()
    const router = useRouter()
    const countriesPerPage = 5
    const currentPage = ref(1)
    const searchCountry = ref('')
    const isSearchFocused = ref(false)

    const paginatedCountries = computed(() => {
      const start = (currentPage.value - 1) * countriesPerPage
      const end = start + countriesPerPage
      return store.medalTable.slice(start, end)
    })

    const totalPages = computed(() => {
      return Math.ceil(store.medalTable.length / countriesPerPage)
    })

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    const showCountryDetails = (countryName: string) => {
      router.push(`/country/${countryName}`)
    }

    const totalMedals = (country: { gold: number; silver: number; bronze: number }) => {
      return country.gold + country.silver + country.bronze
    }

    const navigateToCountry = () => {
      const foundCountry = store.medalTable.find(
        (country) => country.name.toLowerCase() === searchCountry.value.toLowerCase(),
      )
      if (foundCountry) {
        router.push(`/country/${foundCountry.name}`)
      } else {
        alert('Country not found')
      }
    }

    const getFlagImage = (countryName: string) => {
      const flagMap = {
        'United States': '/images/us.png',
        China: '/images/cn.png',
        Russia: '/images/ru.png',
        Japan: '/images/jp.png',
        Germany: '/images/de.png',
        Australia: '/images/au.png',
      }

      // 使用类型断言
      return flagMap[countryName as keyof typeof flagMap] || '/images/default-flag.png'
    }

    return {
      paginatedCountries,
      currentPage,
      searchCountry,
      prevPage,
      nextPage,
      showCountryDetails,
      totalMedals,
      navigateToCountry,
      getFlagImage,
      totalPages,
      isSearchFocused,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
  border-radius: 24px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);
}

.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.title {
  color: #1d1d1f;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  color: #007AFF;
  font-size: 2rem;
}

.subtitle {
  color: #86868b;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.search-container {
  position: relative;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px;
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.search-container.search-focus {
  transform: scale(1.01);
}

.search-icon {
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #86868b;
  transition: color 0.3s ease;
}

.search-focus .search-icon {
  color: #007AFF;
}

.search-input {
  width: 100%;
  padding: 1.2rem 1.2rem 1.2rem 3.2rem;
  font-size: 1rem;
  border: 2px solid transparent;
  border-radius: 12px;
  background-color: #f5f5f7;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, #f8f9ff 0%, #ffffff 100%);
}

.search-input:focus {
  outline: none;
  background-color: #fff;
  border-color: #007AFF;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}

.table-wrapper {
  background: linear-gradient(145deg, #e6eeff 0%, #ffffff 100%);
  padding: 1px;
  border-radius: 16px;
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
}

.table-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #007AFF, #00C6FF);
  opacity: 0.7;
}

.table-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  background: linear-gradient(145deg, #f8f9ff 0%, #f5f5f7 100%);
  color: #1d1d1f;
  font-weight: 600;
  padding: 1.2rem 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(0, 122, 255, 0.1);
}

.medal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #f5f5f7;
}

.country-row {
  cursor: pointer;
  transition: all 0.2s ease;
}

.country-row:hover {
  background: linear-gradient(90deg, rgba(0, 122, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
  transform: translateX(4px);
}

.country-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.flag {
  width: 28px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.country-name {
  font-weight: 500;
}

.medal-count {
  font-weight: 600;
  font-size: 1.1rem;
}

.gold-text { color: #FFB800; }
.silver-text { color: #A0A0A0; }
.bronze-text { color: #CD7F32; }

.total-count {
  font-weight: 700;
  color: #007AFF;
  font-size: 1.1rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  background-color: #007AFF;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: linear-gradient(145deg, #007AFF 0%, #0066CC 100%);
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.2);
}

.pagination-btn:hover:not(:disabled) {
  background: linear-gradient(145deg, #0066CC 0%, #004499 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 122, 255, 0.3);
}

.pagination-btn:disabled {
  background-color: #E5E5EA;
  cursor: not-allowed;
}

.page-indicator {
  font-weight: 500;
  color: #1d1d1f;
  background-color: #f5f5f7;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: linear-gradient(145deg, #f8f9ff 0%, #f5f5f7 100%);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.rank-column {
  width: 50px;
  text-align: center;
  color: #86868b;
}

.medal-column {
  width: 100px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.medal-column::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.03;
  z-index: 0;
  pointer-events: none;
}

td.medal-column:nth-child(3)::before {
  background: linear-gradient(145deg, #FFD700 0%, #FFC000 100%);
}

td.medal-column:nth-child(4)::before {
  background: linear-gradient(145deg, #C0C0C0 0%, #A0A0A0 100%);
}

td.medal-column:nth-child(5)::before {
  background: linear-gradient(145deg, #CD7F32 0%, #A05A20 100%);
}

.total-column {
  width: 100px;
  text-align: center;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.country-row {
  animation: fadeIn 0.3s ease-out forwards;
}

@media (max-width: 768px) {
  .container {
    padding: 20px 10px;
    background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
  }
  
  .table-wrapper::before {
    height: 4px;
  }
  
  .header-section {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .country-name {
    font-size: 0.9rem;
  }
  
  .medal-count {
    font-size: 1rem;
  }
}

:root {
  --glass-background: rgba(255, 255, 255, 0.7);
  --glass-border: 1px solid rgba(255, 255, 255, 0.2);
  --glass-blur: blur(10px);
}
</style>
