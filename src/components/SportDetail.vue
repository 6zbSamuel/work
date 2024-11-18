<template>
  <div class="sport-detail-overlay" v-if="show" @click="close">
    <div class="sport-detail-modal" @click.stop>
      <div class="modal-header">
        <h3>
          <i class="fas fa-trophy"></i>
          {{ sport.sport }}
        </h3>
        <button class="close-button" @click="close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="modal-content">
        <div class="medal-type">
          <i :class="['fas fa-medal', sport.medalType]"></i>
          <span>{{ getMedalLabel(sport.medalType) }}</span>
        </div>

        <div class="event-details">
          <div class="detail-item">
            <i class="fas fa-calendar"></i>
            <div>
              <label>Date</label>
              <p>July 25, 2021</p>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <label>Venue</label>
              <p>Tokyo Olympic Stadium</p>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-users"></i>
            <div>
              <label>Participants</label>
              <p>32 Athletes from 24 Countries</p>
            </div>
          </div>
        </div>

        <div class="event-description">
          <h4>Event Highlights</h4>
          <p>{{ getEventDescription(sport.sport) }}</p>
        </div>

        <div class="medal-ceremony">
          <h4>Medal Ceremony</h4>
          <div class="podium">
            <div class="podium-place silver">
              <span>2</span>
              <div class="podium-block"></div>
            </div>
            <div class="podium-place gold">
              <span>1</span>
              <div class="podium-block"></div>
            </div>
            <div class="podium-place bronze">
              <span>3</span>
              <div class="podium-block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SportMedal } from '../types';

const props = defineProps<{
  show: boolean;
  sport: SportMedal;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};

const getMedalLabel = (type: string) => {
  const labels = {
    gold: 'Gold Medal 🥇',
    silver: 'Silver Medal 🥈',
    bronze: 'Bronze Medal 🥉'
  };
  return labels[type as keyof typeof labels];
};

const getEventDescription = (sport: string) => {
  // 这里可以添加更多运动项目的描述
  const descriptions: { [key: string]: string } = {
    'Table Tennis': 'An intense match showcasing exceptional skill and precision, with rapid exchanges and strategic gameplay that kept spectators on the edge of their seats.',
    'Swimming': 'A thrilling race that came down to the final meters, with athletes pushing their limits in pursuit of Olympic glory.',
    'Athletics': 'A display of pure athletic excellence, breaking records and showcasing the pinnacle of human performance.',
    // 可以继续添加其他运动项目的描述
  };
  return descriptions[sport] || 'A spectacular Olympic event demonstrating the highest level of athletic achievement.';
};
</script>

<style scoped>
.sport-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.sport-detail-modal {
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-light);
}

.modal-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--olympic-blue);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.close-button:hover {
  color: var(--olympic-red);
}

.modal-content {
  padding: 2rem;
}

.medal-type {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.medal-type i {
  font-size: 2.5rem;
}

.medal-type i.gold { color: var(--olympic-yellow); }
.medal-type i.silver { color: #C0C0C0; }
.medal-type i.bronze { color: #CD7F32; }

.event-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
}

.detail-item i {
  font-size: 1.5rem;
  color: var(--olympic-blue);
}

.detail-item label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.detail-item p {
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 0.2rem;
}

.event-description {
  margin-bottom: 2rem;
}

.event-description h4,
.medal-ceremony h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.event-description p {
  line-height: 1.6;
  color: var(--text-secondary);
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  height: 150px;
  margin-top: 2rem;
}

.podium-place {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.podium-block {
  width: 80px;
  border-radius: 8px 8px 0 0;
}

.podium-place span {
  font-size: 1.2rem;
  font-weight: 600;
}

.podium-place.gold .podium-block {
  height: 100px;
  background: var(--olympic-yellow);
}

.podium-place.silver .podium-block {
  height: 80px;
  background: #C0C0C0;
}

.podium-place.bronze .podium-block {
  height: 60px;
  background: #CD7F32;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .sport-detail-modal {
    width: 95%;
    max-height: 95vh;
  }

  .event-details {
    grid-template-columns: 1fr;
  }

  .podium-block {
    width: 60px;
  }
}
</style> 