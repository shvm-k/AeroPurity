export function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: 'Good',                          color: '#22a74a' };
  if (aqi <= 100) return { label: 'Moderate',                      color: '#f0b429' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: '#f07d00' };
  if (aqi <= 200) return { label: 'Unhealthy',                     color: '#e63946' };
  if (aqi <= 300) return { label: 'Very Unhealthy',                color: '#7b2d8b' };
  return          { label: 'Hazardous',                            color: '#7e0023' };
}

// Calm WhatsApp-style base with a subtle wash of the AQI color in the
// top-right corner — clean, but you still sense air quality at a glance.
const DAY_BASE = '#f4efe4';
const NIGHT_BASE = '#0b141a';

export function getAQIBackground(aqi, isDay = true) {
  const base = isDay ? DAY_BASE : NIGHT_BASE;
  if (aqi == null) return base;
  const { color } = getAQIInfo(aqi);
  const alpha = isDay ? '24' : '38'; // ~14% / ~22% opacity (8-digit hex)
  return `radial-gradient(135% 95% at 100% 0%, ${color}${alpha} 0%, ${base} 58%)`;
}
