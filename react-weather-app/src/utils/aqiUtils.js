export function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: 'Good',                          color: '#22a74a' };
  if (aqi <= 100) return { label: 'Moderate',                      color: '#f0b429' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: '#f07d00' };
  if (aqi <= 200) return { label: 'Unhealthy',                     color: '#e63946' };
  if (aqi <= 300) return { label: 'Very Unhealthy',                color: '#7b2d8b' };
  return          { label: 'Hazardous',                            color: '#7e0023' };
}

export function getAQIGradient(aqi) {
  if (!aqi)       return 'linear-gradient(135deg, #c4b5fd, #fca5a5)';
  if (aqi <= 50)  return 'linear-gradient(135deg, #86efac, #6ee7b7)';
  if (aqi <= 100) return 'linear-gradient(135deg, #fde68a, #fcd34d)';
  if (aqi <= 150) return 'linear-gradient(135deg, #fdba74, #fb923c)';
  if (aqi <= 200) return 'linear-gradient(135deg, #fca5a5, #f87171)';
  if (aqi <= 300) return 'linear-gradient(135deg, #d8b4fe, #c084fc)';
  return          'linear-gradient(135deg, #fda4af, #fb7185)';
}
