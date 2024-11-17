<template>
  <v-container fluid class="home-container">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 text-center mb-6">Olympic Medal Table</h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="country in medalTable" :key="country.name">
        <v-card
          class="country-card mx-auto"
          @click="navigateToCountry(country.name)"
          elevation="3"
          hover
        >
          <v-card-title class="country-header d-flex align-center">
            <img
              :src="getFlagImage(country.name)"
              :alt="`${country.name} flag`"
              class="country-flag mr-3"
              @error="onImageError"
            />
            <span class="country-name">{{ country.name }}</span>
          </v-card-title>

          <v-card-text>
            <v-row class="medal-summary">
              <v-col cols="4" class="pa-1">
                <div class="medal-box gold">
                  <v-icon size="small" color="amber darken-2">mdi-medal</v-icon>
                  <span class="medal-count">{{ country.gold }}</span>
                </div>
              </v-col>
              <v-col cols="4" class="pa-1">
                <div class="medal-box silver">
                  <v-icon size="small" color="grey lighten-1">mdi-medal</v-icon>
                  <span class="medal-count">{{ country.silver }}</span>
                </div>
              </v-col>
              <v-col cols="4" class="pa-1">
                <div class="medal-box bronze">
                  <v-icon size="small" color="brown lighten-1">mdi-medal</v-icon>
                  <span class="medal-count">{{ country.bronze }}</span>
                </div>
              </v-col>
            </v-row>

            <div class="sports-preview mt-4">
              <v-chip
                v-for="sport in country.sports.slice(0, 2)"
                :key="sport.name"
                class="ma-1"
                color="primary"
                label
              >
                {{ sport.name }}
              </v-chip>
              <v-chip
                v-if="country.sports.length > 2"
                class="ma-1"
                color="grey lighten-1"
                label
              >
                +{{ country.sports.length - 2 }} more
              </v-chip>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              block
              color="primary"
              variant="tonal"
              @click="navigateToCountry(country.name)"
            >
              View Details
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOlympicStore } from '../store'

export default defineComponent({
  name: 'HomeView',

  setup() {
    const store = useOlympicStore()
    const router = useRouter()

    const medalTable = computed(() => {
      return store.medalTable.sort((a, b) => {
        // 按金牌数排序，如果金牌相同则按银牌，以此类推
        if (a.gold !== b.gold) return b.gold - a.gold
        if (a.silver !== b.silver) return b.silver - a.silver
        return b.bronze - a.bronze
      })
    })

    const navigateToCountry = (countryName: string) => {
      router.push(`/country/${countryName}`)
    }

    const getFlagImage = (countryName: string): string => {
      const countryCodeMap: { [key: string]: string } = {
        'United States': 'us',
        'China': 'cn',
        'Japan': 'jp',
        // 添加更多国家的代码映射
      }
      const code = countryCodeMap[countryName] || countryName.toLowerCase()
      return `/images/${code}.png`
    }

    const onImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      console.warn(`Failed to load flag image: ${img.src}`)
      img.src = '/images/placeholder-flag.png' // 设置一个默认的占位图片
    }

    return {
      medalTable,
      navigateToCountry,
      getFlagImage,
      onImageError,
    }
  },
})
</script>

<style scoped>
.home-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 32px;
}

.country-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.country-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
}

.country-header {
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 16px;
}

.country-flag {
  width: 40px;
  height: 30px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.country-name {
  font-size: 1.5rem;
  font-weight: 500;
}

.medal-summary {
  margin-top: 12px;
}

.medal-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  border-radius: 6px;
  transition: transform 0.3s ease;
  margin: 0 2px;
}

.medal-box:hover {
  transform: scale(1.05);
}

.medal-count {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2px;
}

.gold {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
}

.silver {
  background: linear-gradient(135deg, #e2e2e2 0%, #dbdbdb 100%);
}

.bronze {
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
}

.sports-preview {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

@media (max-width: 960px) {
  .home-container {
    padding: 16px;
  }

  .country-name {
    font-size: 1.2rem;
  }

  .medal-count {
    font-size: 1rem;
  }

  .medal-box {
    padding: 3px;
  }

  .medal-box .v-icon {
    font-size: 16px !important;
  }
}

@media (max-width: 600px) {
  .home-container {
    padding: 8px;
  }
}
</style>
