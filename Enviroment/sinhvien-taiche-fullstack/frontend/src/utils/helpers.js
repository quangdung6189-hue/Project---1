/**
 * Get high score from localStorage
 */
export const getHighScore = () => {
  return parseInt(localStorage.getItem('ecoGameHighScore') || '0');
};

/**
 * Set high score in localStorage
 */
export const setHighScore = (score) => {
  const current = getHighScore();
  if (score > current) {
    localStorage.setItem('ecoGameHighScore', score.toString());
    return true;
  }
  return false;
};

/**
 * Shuffle array (Fisher-Yates)
 */
export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Format date to Vietnamese locale
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Scroll to element by ID
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone) => {
  return /^[0-9]{8,15}$/.test(phone.replace(/[\s\-()]/g, ''));
};

