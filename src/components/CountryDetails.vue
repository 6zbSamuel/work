<template>
  <v-container class="country-details" fluid>
    <v-card class="mx-auto main-card" elevation="3">
      <!-- 头部区域 - 调整高度和内边距 -->
      <v-card-title class="header py-6">
        <div class="d-flex align-center">
          <img
            v-if="country"
            :src="getFlagImage(country.name)"
            alt="Flag"
            class="flag"
            @error="onImageError"
          />
          <h1 class="text-h3 ml-6">{{ country?.name }}</h1>
        </div>
      </v-card-title>

      <!-- 奖牌统计区域 - 增加间距和调整卡片大小 -->
      <v-card-text v-if="country" class="medal-section py-6">
        <v-row class="mx-2">
          <v-col cols="12" sm="6" md="3">
            <v-card class="medal-card gold">
              <v-icon size="36" color="amber darken-2">mdi-medal</v-icon>
              <div class="medal-count">{{ country.gold }}</div>
              <div class="medal-label">Gold</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="medal-card silver">
              <v-icon size="36" color="grey lighten-1">mdi-medal</v-icon>
              <div class="medal-count">{{ country.silver }}</div>
              <div class="medal-label">Silver</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="medal-card bronze">
              <v-icon size="36" color="brown lighten-2">mdi-medal</v-icon>
              <div class="medal-count">{{ country.bronze }}</div>
              <div class="medal-label">Bronze</div>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="medal-card total">
              <v-icon size="36" color="blue-grey">mdi-trophy</v-icon>
              <div class="medal-count">{{ totalMedals(country) }}</div>
              <div class="medal-label">Total</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- 运动项目区域 - 优化列表布局 -->
      <v-card-text v-if="country" class="sports-section py-6">
        <h2 class="text-h5 mb-6 px-4">
          <v-icon left size="32">mdi-run</v-icon>
          Sports
        </h2>
        <v-list class="px-4">
          <v-list-item v-for="sport in country.sports" :key="sport.name" class="sport-item mb-6">
            <v-card width="100%" class="sport-card">
              <v-card-title class="sport-header d-flex justify-space-between align-center">
                <span class="text-h6">{{ sport.name }}</span>
                <div class="medals-summary">
                  <v-chip class="mx-1" color="amber" label>
                    <v-icon left size="small">mdi-medal</v-icon>
                    {{ sport.gold }}
                  </v-chip>
                  <v-chip class="mx-1" color="grey-lighten-1" label>
                    <v-icon left size="small">mdi-medal</v-icon>
                    {{ sport.silver }}
                  </v-chip>
                  <v-chip class="mx-1" color="brown-lighten-1" label>
                    <v-icon left size="small">mdi-medal</v-icon>
                    {{ sport.bronze }}
                  </v-chip>
                </div>
              </v-card-title>
              
              <v-card-text>
                <v-list density="compact">
                  <v-list-item v-for="(detail, index) in sport.details" 
                              :key="index"
                              class="medal-detail-item">
                    <v-icon left size="small" 
                            :color="getMedalColor(detail)">
                      mdi-medal
                    </v-icon>
                    {{ detail }}
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </v-card-text>

      <!-- 评论区域 - 改进评论布局 -->
      <v-card-text class="comments-section py-6">
        <h2 class="text-h5 mb-6 px-4">
          <v-icon left size="32">mdi-comment-multiple</v-icon>
          Comments
        </h2>
        <v-list class="px-4">
          <v-list-item v-for="comment in comments" :key="comment.comment" class="comment-item mb-3">
            <v-list-item-content>
              <v-list-item-title class="text-body-1">
                <span class="comment-author">{{ comment.author || 'Anonymous' }}:</span>
                {{ comment.comment }}
              </v-list-item-title>
              <v-list-item-subtitle class="comment-time">
                {{ formatDate(comment.timestamp) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        
        <v-form @submit.prevent="addComment" class="comment-form mt-6 px-4">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="commentAuthor"
                label="Your Name (Optional)"
                outlined
                dense
                hide-details
                class="mb-4"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newComment"
                label="Write a comment"
                outlined
                hide-details
                class="comment-input"
                append-icon="mdi-send"
                @click:append="addComment"
                :rules="[v => !!v || 'Comment is required']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.country-details {
  padding: 32px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  max-width: 100% !important;
}

.main-card {
  max-width: 1618px;
  margin: 0 auto;
  width: 98%;
}

.header {
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: white;
  padding: 32px;
  border-radius: 8px 8px 0 0;
}

.flag {
  width: 80px;
  height: 50px;
  border-radius: 6px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.flag:hover {
  transform: scale(1.15);
}

.medal-card {
  text-align: center;
  padding: 12px;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 8px;
  width: 144px;
  height: 89px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

.medal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.medal-count {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 4px 0;
}

.medal-label {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  color: #666;
  font-size: 0.8rem;
}

.gold { 
  background: linear-gradient(135deg, #ffd700 0%, #ffed4a 100%);
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.silver { 
  background: linear-gradient(135deg, #e2e2e2 0%, #dbdbdb 100%);
  box-shadow: 0 4px 15px rgba(226, 226, 226, 0.3);
}

.bronze { 
  background: linear-gradient(135deg, #cd7f32 0%, #daa520 100%);
  box-shadow: 0 4px 15px rgba(205, 127, 50, 0.3);
}

.total { 
  background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
  box-shadow: 0 4px 15px rgba(33, 147, 176, 0.3);
}

.sport-item {
  padding: 12px 16px;
  margin: 0 16px;
  border-radius: 6px;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sport-item:hover {
  background-color: #e9ecef;
  transform: translateX(8px);
}

.sport-medals {
  padding: 0 16px;
  height: 32px;
}

.comment-item {
  padding: 12px 24px;
  margin: 0 32px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.comment-item:hover {
  background-color: #e9ecef;
  transform: translateX(8px);
}

.comment-form {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.comment-input {
  border-radius: 8px;
}

.comment-author {
  font-weight: 600;
  color: #2c3e50;
  margin-right: 8px;
}

.comment-time {
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
}

.medal-section, .sports-section, .comments-section {
  padding: 20px 32px;
  max-width: 1000px;
  margin: 0 auto;
}

/* 响应式设计优化 */
@media (max-width: 1200px) {
  .medal-card {
    width: 120px;
    height: 74px;
  }
}

@media (max-width: 960px) {
  .country-details {
    padding: 16px;
  }

  .main-card {
    width: 100%;
  }

  .medal-section, .sports-section, .comments-section {
    padding-left: 16px;
    padding-right: 16px;
  }

  .medal-card {
    width: 100px;
    height: 62px;
  }
  
  .header {
    padding: 24px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .flag {
    width: 60px;
    height: 40px;
  }

  .medal-count {
    font-size: 1.2rem;
  }

  .medal-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 600px) {
  .country-details {
    padding: 8px;
  }

  .header {
    padding: 16px;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .medal-count {
    font-size: 1rem;
  }

  .sport-item, .comment-item {
    margin-bottom: 12px;
  }

  .medal-card {
    width: 80px;
    height: 49px;
  }
}

.sport-card {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.sport-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.sport-header {
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  padding: 12px 20px;
}

.medals-summary {
  display: flex;
  align-items: center;
}

.medal-detail-item {
  padding: 6px 12px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.medal-detail-item:hover {
  background-color: #f5f7fa;
}

.medal-card .v-icon {
  font-size: 20px !important;
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOlympicStore } from '../store'

interface Comment {
  country: string
  comment: string
  author?: string
  timestamp: Date
}

interface Country {
  name: string
  gold: number
  silver: number
  bronze: number
  sports: Array<{ name: string; medals: string }>
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useOlympicStore()

    const commentAuthor = ref('')
    const newComment = ref('')

    const country = computed<Country | undefined>(() => {
      return store.medalTable.find((c) => c.name === route.params.country) as Country | undefined
    })

    const comments = computed(() => {
      return store.comments.filter((c) => c.country === route.params.country)
    })

    const addComment = () => {
      if (newComment.value.trim()) {
        store.addComment({
          country: route.params.country as string,
          comment: newComment.value,
          author: commentAuthor.value.trim() || undefined,
          timestamp: new Date()
        })
        newComment.value = ''
        commentAuthor.value = ''
      }
    }

    const totalMedals = (country: Country | undefined) => {
      if (country) {
        return country.gold + country.silver + country.bronze
      }
      return 0
    }

    const getFlagImage = (countryName: string): string => {
      const flagPath = `/images/${getCountryCode(countryName)}.png`
      console.log('Flag path:', flagPath) // 调试信息
      return flagPath
    }

    const getCountryCode = (countryName: string): string => {
      const countryCodeMap: { [key: string]: string } = {
        'United States': 'us',
        China: 'cn',
        Russia: 'ru',
        Japan: 'jp',
        Germany: 'de',
        Australia: 'au',
      }
      return countryCodeMap[countryName] || ''
    }

    const onImageError = (event: Event) => {
      const img = event.target as HTMLImageElement
      const countryValue = unref(country)
      console.warn(`Failed to load flag image for ${countryValue?.name}`)
    }

    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date))
    }

    const getMedalColor = (detail: string): string => {
      if (detail.toLowerCase().includes('gold')) return 'amber'
      if (detail.toLowerCase().includes('silver')) return 'grey-lighten-1'
      if (detail.toLowerCase().includes('bronze')) return 'brown-lighten-1'
      return 'grey'
    }

    return {
      country,
      comments,
      commentAuthor,
      newComment,
      addComment,
      totalMedals,
      getFlagImage,
      onImageError,
      formatDate,
      getMedalColor,
    }
  },
})
</script>
