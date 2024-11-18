<template>
  <div class="country-detail" v-if="country">
    <div class="back-button-container">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
        Back to Medal Table
      </button>
    </div>
    <div class="hero-section glass">
      <div class="hero-content">
        <div class="flag-container">
          <img 
            :src="`https://flagcdn.com/${country.details.countryCode.toLowerCase()}.svg`"
            :alt="`${country.name} flag`"
            class="country-flag"
          />
        </div>
        <div class="country-info">
          <h2>{{ country.name }}</h2>
          <div class="medal-summary">
            <div class="medal silver">
              <i class="fas fa-medal"></i>
              <span>{{ country.silverMedals }}</span>
              <label>Silver</label>
            </div>
            <div class="medal gold">
              <i class="fas fa-medal"></i>
              <span>{{ country.goldMedals }}</span>
              <label>Gold</label>
            </div>
            <div class="medal bronze">
              <i class="fas fa-medal"></i>
              <span>{{ country.bronzeMedals }}</span>
              <label>Bronze</label>
            </div>
            <div class="medal total">
              <i class="fas fa-trophy"></i>
              <span>{{ country.goldMedals + country.silverMedals + country.bronzeMedals }}</span>
              <label>Total</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <div class="details-card glass">
        <h3>
          <i class="fas fa-info-circle"></i>
          Country Information
        </h3>
        <div class="info-grid">
          <div class="info-item">
            <i class="fas fa-users"></i>
            <div>
              <label>Population</label>
              <p>{{ country.details.population.toLocaleString() }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-city"></i>
            <div>
              <label>Capital</label>
              <p>{{ country.details.capital }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-globe-americas"></i>
            <div>
              <label>Continent</label>
              <p>{{ country.details.continent }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="sports-card glass">
        <h3>
          <i class="fas fa-trophy"></i>
          Medal Events
        </h3>
        <div class="sports-grid">
          <div v-for="sport in country.sports" 
               :key="sport.sport"
               class="sport-item"
               :class="sport.medalType"
               @click="showSportDetail(sport)">
            <i class="fas fa-medal"></i>
            <span>{{ sport.sport }}</span>
          </div>
        </div>
      </div>

      <div class="comments-card glass">
        <h3>
          <i class="fas fa-comments"></i>
          Fan Support
        </h3>
        <div class="comment-list" ref="commentList">
          <div v-for="comment in countryComments" 
               :key="comment.id" 
               class="comment">
            <p>{{ comment.text }}</p>
            <small>
              <i class="fas fa-clock"></i>
              {{ new Date(comment.timestamp).toLocaleString() }}
            </small>
          </div>
        </div>
        <div class="comment-form">
          <textarea 
            v-model="newComment" 
            placeholder="Share your support for the athletes..."
          ></textarea>
          <button @click="addComment">
            <i class="fas fa-paper-plane"></i>
            Post Comment
          </button>
        </div>
      </div>
    </div>
  </div>
  <SportDetail 
    v-if="selectedSport"
    :show="!!selectedSport"
    :sport="selectedSport"
    @close="selectedSport = null"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMedalStore } from '../stores/medalStore';
import SportDetail from '../components/SportDetail.vue';
import type { SportMedal } from '../types';

const route = useRoute();
const store = useMedalStore();
const newComment = ref('');
const router = useRouter();

const country = computed(() => 
  store.countries.find(c => c.id === Number(route.params.id))
);

const countryComments = computed(() =>
  store.comments.filter(c => c.countryId === Number(route.params.id))
);

const getMedalType = (type: string) => {
  const types = {
    gold: 'Gold Medal 🥇',
    silver: 'Silver Medal 🥈',
    bronze: 'Bronze Medal 🥉'
  };
  return types[type as keyof typeof types];
};

const addComment = () => {
  if (newComment.value.trim()) {
    store.addComment(Number(route.params.id), newComment.value);
    newComment.value = '';
  }
};

const selectedSport = ref<SportMedal | null>(null);

const showSportDetail = (sport: SportMedal) => {
  selectedSport.value = sport;
};

const goBack = () => {
  router.push({ name: 'home' }).then(() => {
    // 跳转成功后刷新页面
    window.location.reload();
  }).catch((error) => {
    console.error('路由跳转失败:', error);
    // 如果路由跳转失败，直接刷新当前页面
    window.location.href = '/';
  });
};
</script>

<style scoped>
.country-detail {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.hero-section {
  padding: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.flag-container {
  flex-shrink: 0;
}

.country-flag {
  width: 300px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.country-flag:hover {
  transform: scale(1.05);
}

.country-info {
  flex-grow: 1;
}

h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, var(--olympic-blue), var(--olympic-black));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.medal-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 2rem;
}

.medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease;
}

.medal:hover {
  transform: translateY(-5px);
}

.medal i {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.medal span {
  font-size: 2rem;
  font-weight: 700;
}

.medal label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.medal.gold {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.2));
  border: 1px solid rgba(255, 215, 0, 0.3);
  z-index: 1;
}

.medal.gold:hover {
  transform: scale(1.15) translateY(-5px);
}

.medal.gold i {
  font-size: 2.8rem;
  color: var(--olympic-yellow);
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.medal.gold span {
  font-size: 2.2rem;
  color: var(--olympic-yellow);
}

.medal.silver i { color: #C0C0C0; }
.medal.bronze i { color: #CD7F32; }
.medal.total i { color: var(--olympic-blue); }

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.details-card,
.sports-card,
.comments-card {
  padding: 2rem;
  height: 100%;
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  color: var(--olympic-blue);
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.8);
  transition: transform 0.3s ease;
}

.info-item:hover {
  transform: translateX(10px);
}

.info-item i {
  font-size: 2rem;
  color: var(--olympic-blue);
}

.info-item label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-item p {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.3rem;
}

.sports-grid {
  display: grid;
  gap: 1rem;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 1rem;
}

.sport-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 12px;
  background: #f8fafc;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sport-item:hover {
  transform: translateX(10px);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.sport-item i {
  font-size: 1.5rem;
}

.sport-item span {
  font-size: 1.1rem;
  font-weight: 500;
}

.comment-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  padding-right: 1rem;
}

.comment {
  padding: 1.2rem;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.8);
  margin-bottom: 1rem;
}

.comment p {
  font-size: 1.1rem;
  line-height: 1.6;
}

.comment small {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  margin-top: 0.8rem;
}

.comment-form textarea {
  width: 100%;
  height: 120px;
  padding: 1rem;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.comment-form textarea:focus {
  border-color: var(--olympic-blue);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 133, 199, 0.1);
}

button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: var(--olympic-blue);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Custom Scrollbar */
.sports-grid::-webkit-scrollbar,
.comment-list::-webkit-scrollbar {
  width: 8px;
}

.sports-grid::-webkit-scrollbar-track,
.comment-list::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.sports-grid::-webkit-scrollbar-thumb,
.comment-list::-webkit-scrollbar-thumb {
  background: var(--olympic-blue);
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .country-flag {
    width: 250px;
  }

  .medal-summary {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .country-detail {
    padding: 1rem;
  }

  .hero-section {
    padding: 2rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .back-button-container {
    top: 1rem;
    left: 1rem;
  }

  .back-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

.back-button-container {
  position: sticky;
  top: 2rem;
  left: 2rem;
  margin-bottom: 1rem;
  z-index: 100;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.5rem;
  background: var(--olympic-blue);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.back-button i {
  font-size: 1.1rem;
}
</style> 