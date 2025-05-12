
// Theme preferences default values
const defaultThemePreferences = {
    primaryColor: '#3b82f6', // blue
    animationSpeed: 'normal'
  };
  
  // Animation speed durations
  function getAnimationDuration(speed) {
    switch (speed) {
      case 'slow': return '1s';
      case 'fast': return '0.3s';
      case 'normal':
      default: return '0.5s';
    }
  }
  
  // DOM elements
  const themeColorButtons = document.querySelectorAll('.theme-color');
  const speedOptionButtons = document.querySelectorAll('.speed-option');
  const resetButton = document.querySelector('.btn-reset');
  const animatedButtons = document.querySelectorAll('.btn-animated');
  const learnMoreButton = document.querySelector('.btn-learn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  // Get preferences from localStorage or use defaults
  let preferences;
  try {
    const storedPreferences = localStorage.getItem('theme-preferences');
    preferences = storedPreferences 
      ? JSON.parse(storedPreferences) 
      : defaultThemePreferences;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    preferences = defaultThemePreferences;
  }
  
  // Apply preferences on page load
  applyThemePreferences(preferences);
  updateActiveButtons();
  
  // Show welcome message if first visit
  document.addEventListener('DOMContentLoaded', () => {
    const hasSeenWelcome = localStorage.getItem('has-seen-welcome');
    
    if (!hasSeenWelcome) {
      setTimeout(() => {
        showToast("Welcome to the Animation Playground! Try customizing the theme and animations using the controls below.", 5000);
        localStorage.setItem('has-seen-welcome', 'true');
      }, 1000);
    }
  });
  
  // Add event listeners
  themeColorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const color = button.dataset.color;
      preferences.primaryColor = color;
      savePreferences();
      applyThemePreferences(preferences);
      updateActiveButtons();
      showToast('Theme color updated!');
      createRippleEffect(color);
    });
  });
  
  speedOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const speed = button.dataset.speed;
      preferences.animationSpeed = speed;
      savePreferences();
      applyThemePreferences(preferences);
      updateActiveButtons();
      showToast(`Animation speed set to ${speed}!`);
    });
  });
  
  resetButton.addEventListener('click', () => {
    preferences = {...defaultThemePreferences};
    savePreferences();
    applyThemePreferences(preferences);
    updateActiveButtons();
    showToast('Settings reset to defaults!');
  });
  
  // Add click animations to buttons
  animatedButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 300);
    });
  });
  
  learnMoreButton.addEventListener('click', () => {
    showToast('All animations use CSS3 transitions and keyframes!');
  });
  
  // Apply theme preferences to document
  function applyThemePreferences(prefs) {
    document.documentElement.style.setProperty('--primary', prefs.primaryColor);
    document.documentElement.style.setProperty(
      '--theme-animation-speed', 
      getAnimationDuration(prefs.animationSpeed)
    );
  }
  
  // Update active state on buttons
  function updateActiveButtons() {
    // Update color selection
    themeColorButtons.forEach(button => {
      button.classList.remove('active');
      if (button.dataset.color === preferences.primaryColor) {
        button.classList.add('active');
      }
    });
    
    // Update speed selection
    speedOptionButtons.forEach(button => {
      button.classList.remove('active');
      if (button.dataset.speed === preferences.animationSpeed) {
        button.classList.add('active');
      }
    });
  }
  
  // Save preferences to localStorage
  function savePreferences() {
    try {
      localStorage.setItem('theme-preferences', JSON.stringify(preferences));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }
  
  // Show toast message
  function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
  
  // Create ripple effect when changing theme color
  function createRippleEffect(color) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.backgroundColor = color;
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    
    document.body.appendChild(ripple);
    
    // Trigger animation
    setTimeout(() => {
      ripple.style.width = '300vw';
      ripple.style.height = '300vw';
      ripple.style.opacity = '0';
    }, 50);
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(ripple);
    }, 1500);
  }
  