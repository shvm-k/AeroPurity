export function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: 'Good',                          color: '#22a74a' };
  if (aqi <= 100) return { label: 'Moderate',                      color: '#f0b429' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: '#f07d00' };
  if (aqi <= 200) return { label: 'Unhealthy',                     color: '#e63946' };
  if (aqi <= 300) return { label: 'Very Unhealthy',                color: '#7b2d8b' };
  return          { label: 'Hazardous',                            color: '#7e0023' };
}

// Bright pastel gradients for daytime.
const DAY_GRADIENTS = {
  none: 'linear-gradient(135deg, #c4b5fd, #fca5a5)',
  good: 'linear-gradient(135deg, #86efac, #6ee7b7)',
  moderate: 'linear-gradient(135deg, #fde68a, #fcd34d)',
  sensitive: 'linear-gradient(135deg, #fdba74, #fb923c)',
  unhealthy: 'linear-gradient(135deg, #fca5a5, #f87171)',
  veryUnhealthy: 'linear-gradient(135deg, #d8b4fe, #c084fc)',
  hazardous: 'linear-gradient(135deg, #fda4af, #fb7185)',
};

// Deep, muted gradients for nighttime — same AQI hue family, darkened.
const NIGHT_GRADIENTS = {
  none: 'linear-gradient(135deg, #2a2545, #3d2740)',
  good: 'linear-gradient(135deg, #143d2c, #1c5040)',
  moderate: 'linear-gradient(135deg, #4a3c14, #5a4a1c)',
  sensitive: 'linear-gradient(135deg, #4d2e12, #66401c)',
  unhealthy: 'linear-gradient(135deg, #4d2222, #66302f)',
  veryUnhealthy: 'linear-gradient(135deg, #2e2350, #3d2560)',
  hazardous: 'linear-gradient(135deg, #3f1622, #52162a)',
};

function aqiKey(aqi) {
  if (!aqi)       return 'none';
  if (aqi <= 50)  return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'sensitive';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'veryUnhealthy';
  return 'hazardous';
}

export function getAQIGradient(aqi, isDay = true) {
  const key = aqiKey(aqi);
  return isDay ? DAY_GRADIENTS[key] : NIGHT_GRADIENTS[key];
}
