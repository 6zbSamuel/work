<template>
  <div class="app">
    <header>
      <div class="olympic-rings">
        <span class="ring blue"></span>
        <span class="ring yellow"></span>
        <span class="ring black"></span>
        <span class="ring green"></span>
        <span class="ring red"></span>
      </div>
      <h1>Olympic Medal Table</h1>
      <div class="subtitle-container">
        <p class="subtitle">Tokyo 2020</p>
        <div class="olympic-decoration">
          <div class="olympic-bars">
            <span class="bar blue"></span>
            <span class="bar yellow"></span>
            <span class="bar black"></span>
            <span class="bar green"></span>
            <span class="bar red"></span>
          </div>
          <div class="olympic-dots">
            <span class="dot blue"></span>
            <span class="dot yellow"></span>
            <span class="dot black"></span>
            <span class="dot green"></span>
            <span class="dot red"></span>
          </div>
        </div>
      </div>
    </header>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --olympic-blue: #0085C7;
  --olympic-yellow: #F4C300;
  --olympic-black: #000000;
  --olympic-green: #009F3D;
  --olympic-red: #DF0024;
  --background: #f5f7fa;
  --text: #2c3e50;
  --border: #e2e8f0;
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --bg-gradient-1: #f1f5f9;
  --bg-gradient-2: #f8fafc;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, var(--bg-gradient-1), var(--bg-gradient-2));
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
}

header {
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  box-shadow: 0 4px 20px rgba(44, 62, 80, 0.15);
  color: white;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%);
  pointer-events: none;
}

header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, var(--bg-primary));
  opacity: 0.3;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0;
  background: linear-gradient(
    45deg,
    var(--olympic-blue),
    var(--olympic-yellow),
    var(--olympic-black),
    var(--olympic-green),
    var(--olympic-red)
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 10s ease infinite;
  background-size: 300% 300%;
}

.subtitle-container {
  position: relative;
  padding: 1rem 0;
  margin-top: 1.5rem;
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  letter-spacing: 2px;
}

.olympic-rings {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.ring {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid;
  display: inline-block;
  transition: transform 0.3s ease;
}

.ring:hover {
  transform: scale(1.1);
}

.olympic-decoration {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.olympic-bars {
  display: flex;
  justify-content: center;
  gap: 4px;
  opacity: 0.6;
}

.bar {
  height: 3px;
  width: 40px;
  border-radius: 2px;
  animation: barPulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(255,255,255,0.1);
}

.olympic-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 0.5rem;
  opacity: 0.6;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: dotPulse 1.5s ease-in-out infinite;
}

.blue { 
  background-color: rgba(0, 133, 199, 0.7);
}

.yellow { 
  background-color: rgba(244, 195, 0, 0.7);
}

.black { 
  background-color: rgba(0, 0, 0, 0.5);
}

.green { 
  background-color: rgba(0, 159, 61, 0.7);
}

.red { 
  background-color: rgba(223, 0, 36, 0.7);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes barPulse {
  0% {
    transform: scaleX(1);
    opacity: 0.5;
  }
  50% {
    transform: scaleX(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.5;
  }
}

@keyframes dotPulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

.bar::after,
.dot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: 0 0 10px currentColor;
  opacity: 0.3;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.4rem;
  }
  
  .ring {
    width: 40px;
    height: 40px;
  }
  
  .bar {
    width: 30px;
  }
  
  .dot {
    width: 6px;
    height: 6px;
  }
}
</style> 