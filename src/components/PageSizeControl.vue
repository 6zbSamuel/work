<template>
  <div class="page-size-control">
    <label class="control-label">Countries per page:</label>
    <div class="control-container">
      <button 
        class="control-btn" 
        @click="decrease"
        :disabled="modelValue <= 5"
      >
        <i class="fas fa-minus"></i>
      </button>
      <div class="number-display">
        <span>{{ modelValue }}</span>
        <div class="preset-values">
          <div 
            v-for="preset in presets" 
            :key="preset"
            class="preset-value"
            :class="{ active: modelValue === preset }"
            @click="updateValue(preset)"
          >
            {{ preset }}
          </div>
        </div>
      </div>
      <button 
        class="control-btn" 
        @click="increase"
        :disabled="modelValue >= 50"
      >
        <i class="fas fa-plus"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>();

const presets = [5, 10, 20, 50];

const updateValue = (value: number) => {
  emit('update:modelValue', value);
};

const increase = () => {
  if (props.modelValue < 50) {
    emit('update:modelValue', props.modelValue + 5);
  }
};

const decrease = () => {
  if (props.modelValue > 5) {
    emit('update:modelValue', props.modelValue - 5);
  }
};
</script>

<style scoped>
.page-size-control {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.control-label {
  font-size: 0.9rem;
  color: #64748b;
  white-space: nowrap;
}

.control-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8fafc;
  padding: 0.25rem;
  border-radius: 8px;
}

.control-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  color: var(--olympic-blue);
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.control-btn:hover:not(:disabled) {
  background: var(--olympic-blue);
  color: white;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f1f5f9;
}

.number-display {
  position: relative;
  min-width: 50px;
  text-align: center;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.number-display:hover .preset-values {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.preset-values {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  z-index: 10;
  margin-top: 0.5rem;
}

.preset-values::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
}

.preset-value {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.preset-value:hover {
  background: #f1f5f9;
}

.preset-value.active {
  background: var(--olympic-blue);
  color: white;
}
</style> 