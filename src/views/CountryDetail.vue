<template>
  <div class="country-detail" v-if="country">
    <div class="hero-section glass">
      <div class="flag-container">
        <img 
          :src="`https://flagcdn.com/${country.details.countryCode.toLowerCase()}.svg`"
          :alt="`${country.name} flag`"
          class="country-flag"
        />
      </div>
      <h2>{{ country.name }}</h2>
      <div class="medal-summary">
        <div class="medal gold">
          <i class="fas fa-medal"></i>
          <span>{{ country.goldMedals }}</span>
        </div>
        <div class="medal silver">
          <i class="fas fa-medal"></i>
          <span>{{ country.silverMedals }}</span>
        </div>
        <div class="medal bronze">
          <i class="fas fa-medal"></i>
          <span>{{ country.bronzeMedals }}</span>
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
               :class="sport.medalType">
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
        <div class="comment-list">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMedalStore } from '../stores/medalStore';

const route = useRoute();
const store = useMedalStore();
const newComment = ref('');

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
</script>

<style scoped>
.country-detail {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.hero-section {
  text-align: center;
  padding: 3rem;
  margin-bottom: 2rem;
}

.flag-container {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.medal-summary {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.medal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.medal i {
  font-size: 2rem;
}

.medal.gold i { color: #FFD700; }
.medal.silver i { color: #C0C0C0; }
.medal.bronze i { color: #CD7F32; }

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.details-card,
.sports-card,
.comments-card {
  padding: 2rem;
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: var(--olympic-blue);
}

.info-grid {
  display: grid;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.info-item i {
  font-size: 1.5rem;
  color: var(--olympic-blue);
}

.info-item label {
  font-size: 0.9rem;
  color: #666;
}

.info-item p {
  font-weight: 500;
}

.sports-grid {
  display: grid;
  gap: 1rem;
}

.sport-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f8fafc;
  transition: transform 0.2s ease;
}

.sport-item:hover {
  transform: translateX(10px);
}

.sport-item.gold i { color: #FFD700; }
.sport-item.silver i { color: #C0C0C0; }
.sport-item.bronze i { color: #CD7F32; }

.comment-list {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.comment {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
}

.comment small {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-top: 0.5rem;
}

.comment-form textarea {
  width: 100%;
  height: 100px;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
}

button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: var(--olympic-blue);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background: #0066a0;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .medal-summary {
    flex-wrap: wrap;
  }
}

.country-flag {
  width: 200px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style> 