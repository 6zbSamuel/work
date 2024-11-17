<template>
  <div class="container">
    <header class="header">
      <div class="country-info">
        <img
          v-if="country"
          :src="getFlagImage(country.name)"
          alt="Flag"
          class="flag"
          @error="onImageError"
        />
        <h1>{{ country?.name }}</h1>
      </div>
      <button class="back-button" @click="$router.back()">
        ← Back
      </button>
    </header>
    <section v-if="country" class="medal-section">
      <div class="medal gold">
        <span class="medal-icon">🥇</span>
        <span class="medal-value">{{ country.gold }}</span>
        <span class="medal-label">Gold</span>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
        <div class="firework-spark"></div>
      </div>
      <div class="medal silver">
        <span class="medal-icon">🥈</span>
        <span class="medal-value">{{ country.silver }}</span>
        <span class="medal-label">Silver</span>
      </div>
      <div class="medal bronze">
        <span class="medal-icon">🥉</span>
        <span class="medal-value">{{ country.bronze }}</span>
        <span class="medal-label">Bronze</span>
      </div>
      <div class="medal total">
        <span class="medal-icon">🏅</span>
        <span class="medal-value">{{ totalMedals(country) }}</span>
        <span class="medal-label">Total</span>
      </div>
    </section>
    <section v-if="country" class="sports-section">
      <h2>Sports</h2>
      <ul>
        <li v-for="sport in country.sports" :key="sport.name" class="sport-item">
          <span class="sport-name">{{ sport.name }}</span>
          <span class="sport-medals">{{ sport.medals }}</span>
        </li>
      </ul>
    </section>
    <section class="comments-section">
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.comment" class="comment-item">
          {{ comment.comment }}
        </li>
      </ul>
      <form @submit.prevent="addComment" class="comment-form">
        <input
          v-model="newComment"
          type="text"
          placeholder="Write a comment"
          class="comment-input"
        />
        <button type="submit" class="comment-button">Add Comment</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOlympicStore } from '../store'

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

    const newComment = ref('')

    const country = computed<Country | undefined>(() => {
      return store.medalTable.find((c) => c.name === route.params.country) as Country | undefined
    })

    const comments = computed(() => {
      return store.comments.filter((c) => c.country === route.params.country)
    })

    const addComment = () => {
      if (newComment.value.trim()) {
        store.addComment(route.params.country as string, newComment.value)
        newComment.value = ''
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

    return {
      country,
      comments,
      newComment,
      addComment,
      totalMedals,
      getFlagImage,
      onImageError,
    }
  },
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.country-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.flag {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.back-button {
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #f8f9fa;
  transform: translateX(-2px);
}

h1 {
  font-size: 2rem;
  color: #212529;
  margin: 0;
}

.medal-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.medal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.medal:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
}

.medal:hover::before {
  opacity: 1;
}

.medal:hover .medal-icon {
  transform: scale(1.2) rotate(8deg);
}

.medal-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.medal-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #212529;
  transition: transform 0.3s ease;
}

.medal:hover .medal-value {
  transform: scale(1.1);
}

.gold:hover {
  background: linear-gradient(145deg, white, #fff8e7);
}

.silver:hover {
  background: linear-gradient(145deg, white, #f8f9fa);
}

.bronze:hover {
  background: linear-gradient(145deg, white, #fff4ef);
}

.total:hover {
  background: linear-gradient(145deg, white, #f1f8ff);
}

.gold { 
  border-top: 4px solid #ffd700;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.silver { 
  border-top: 4px solid #c0c0c0;
  border-bottom: 1px solid rgba(192, 192, 192, 0.2);
}

.bronze { 
  border-top: 4px solid #cd7f32;
  border-bottom: 1px solid rgba(205, 127, 50, 0.2);
}

.total { 
  border-top: 4px solid #4dabf7;
  border-bottom: 1px solid rgba(77, 171, 247, 0.2);
}

.medal-label {
  font-size: 1rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.sports-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.sport-item {
  padding: 1rem;
  background-color: #f8f9fa;
  border-left: 4px solid #4dabf7;
  margin-bottom: 0.75rem;
}

.comments-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.comment-input {
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
}

.comment-button {
  background-color: #4dabf7;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
}

.comment-button:hover {
  background-color: #3b8fd4;
}

/* 添加礼花动画相关的样式 */
@keyframes firework {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

@keyframes spark {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

@keyframes glitter {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.gold {
  position: relative;
  overflow: visible !important;
}

.gold::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle, 
    rgba(255, 215, 0, 0.8) 5%,
    rgba(255, 183, 0, 0.6) 15%,
    rgba(255, 123, 0, 0.4) 25%,
    transparent 60%
  );
}

.gold:hover::after {
  animation: firework 1s ease-out forwards;
}

.firework-spark {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

/* 创建12个不同颜色和方向的火花 */
.gold:hover .firework-spark:nth-child(1) {
  background: #FFD700;
  --tx: 40px;
  --ty: -40px;
  animation: spark 0.8s ease-out 0.1s, glitter 0.4s ease-in-out infinite;
}

.gold:hover .firework-spark:nth-child(2) {
  background: #FF3377;
  --tx: -40px;
  --ty: 40px;
  animation: spark 0.8s ease-out 0.2s, glitter 0.4s ease-in-out infinite;
}

.gold:hover .firework-spark:nth-child(3) {
  background: #00FF88;
  --tx: -40px;
  --ty: -40px;
  animation: spark 0.8s ease-out 0.3s, glitter 0.4s ease-in-out infinite;
}

.gold:hover .firework-spark:nth-child(4) {
  background: #44AAFF;
  --tx: 40px;
  --ty: 40px;
  animation: spark 0.8s ease-out 0.4s, glitter 0.4s ease-in-out infinite;
}

/* 添加更多火花 */
.gold::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.gold:hover::before {
  opacity: 1;
}

/* 添加闪烁效果到奖牌图标 */
.gold:hover .medal-icon {
  animation: glitter 0.8s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
}

/* 添加发光效果到数值 */
.gold:hover .medal-value {
  animation: glitter 1s ease-in-out infinite;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
  color: #FFB700;
}
</style>
