/**
 * Format a date string to a more readable format
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Unknown';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format movie runtime from minutes to hours and minutes
 */
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'Unknown';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}m`;
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};

/**
 * Convert vote average (0-10) to star rating (1-5)
 */
export const voteAverageToStars = (voteAverage: number): number => {
  if (!voteAverage) return 0;
  // Convert from 0-10 scale to 1-5 scale
  return Math.round((voteAverage / 2) * 10) / 10;
};

/**
 * Format large numbers with commas (e.g., 1,000,000)
 */
export const formatNumber = (num: number): string => {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Format currency (e.g., $1,000,000)
 */
export const formatCurrency = (amount: number): string => {
  if (!amount) return '$0';
  return `$${formatNumber(amount)}`;
};
