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
  const descriptions: { [key: string]: string } = {
    'Table Tennis': 'A high-intensity match featuring rapid exchanges and precise ball control. Players demonstrate exceptional skill in serves, returns, and tactical gameplay, making table tennis one of China\'s strongest Olympic events.',
    
    'Swimming': 'Athletes compete in a state-of-the-art aquatics center, pushing the boundaries of human performance in the water. Events range from explosive sprints to endurance-testing distance races.',
    
    'Athletics': 'Track and field events showcase raw speed, power, and endurance. Athletes compete in various disciplines including sprinting, jumping, throwing, and distance running.',
    
    'Diving': 'Competitors perform complex acrobatic maneuvers from various heights, combining grace, precision, and athleticism. Judges evaluate technique, execution, and entry into the water.',
    
    'Weightlifting': 'Athletes demonstrate incredible strength and technique in two Olympic lifts: the snatch and the clean & jerk. Each competitor gets three attempts at each lift.',
    
    'Gymnastics': 'A combination of strength, flexibility, and artistic expression. Athletes perform routines on various apparatus, showcasing both technical difficulty and graceful execution.',
    
    'Basketball': 'Teams compete in fast-paced matches requiring teamwork, skill, and strategy. The sport combines athletic prowess with tactical team play.',
    
    'Judo': 'A martial art emphasizing throws and grappling techniques. Athletes compete in weight categories, demonstrating both physical skill and strategic thinking.',
    
    'Fencing': 'A tactical combat sport where athletes score points using three types of weapons: foil, épée, and sabre. Requires quick reflexes and strategic thinking.',
    
    'Cycling': 'Athletes compete in various disciplines including track cycling, road racing, and BMX. Events test speed, endurance, and tactical awareness.',
    
    'Rowing': 'Teams and individuals race over a 2000m course, demonstrating strength, endurance, and perfect synchronization in various boat classes.',
    
    'Badminton': 'Fast-paced rallies and strategic play characterize this racquet sport. Players demonstrate agility, power, and precise shot control.',
    
    'Wrestling': 'Athletes compete in freestyle and Greco-Roman styles, combining strength, technique, and tactical skill in weight-class competitions.',
    
    'Archery': 'Competitors demonstrate precision and mental focus, shooting arrows at targets 70 meters away in individual and team events.',
    
    'Boxing': 'Athletes compete in weight divisions, showcasing technical skill, strategy, and conditioning in three-round bouts.',
    
    'Taekwondo': 'A Korean martial art featuring dynamic kicking techniques. Athletes score points through controlled strikes to permitted target areas.',
    
    'Climbing': 'Athletes compete in three disciplines: speed climbing, bouldering, and lead climbing, testing different aspects of climbing ability.',
    
    'Water Polo': 'A physically demanding team sport combining swimming, throwing, and tactical play. Teams compete in a deep pool, requiring exceptional stamina.',
    
    'Hockey': 'Field hockey teams compete in fast-paced matches requiring stick skills, teamwork, and tactical awareness.',
    
    'Marathon': 'The ultimate test of endurance, athletes race over 42.195 kilometers through the host city streets.',
    
    'Shooting': 'Athletes demonstrate exceptional precision and mental control in various rifle, pistol, and shotgun events.',
    
    'Sailing': 'Competitors harness wind and waves in various boat classes, combining technical skill with tactical decision-making.',
    
    'Karate': 'Athletes compete in kata (forms) and kumite (sparring) events, demonstrating traditional techniques with modern athletic application.',
    
    'Tennis': 'Players compete in singles and doubles events on hard courts, showcasing power, skill, and endurance in best-of-three set matches.',
    
    'Rugby Sevens': 'A fast-paced version of rugby with seven players per team, featuring explosive runs, tactical kicks, and team coordination.',
    
    'Canoeing': 'Athletes race in sprint and slalom events, demonstrating power, technique, and water reading skills.',
    
    'Mountain Biking': 'Cyclists navigate challenging off-road courses, combining technical skill with physical endurance.',
    
    'Long Distance Running': 'Athletes compete in track events from 5000m to 10000m, demonstrating endurance and tactical racing ability.'
  };
  
  return descriptions[sport] || 'An Olympic event showcasing the highest level of athletic achievement and competitive spirit.';
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