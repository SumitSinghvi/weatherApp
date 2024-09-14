export function timeDifference(time1: string, time2: string): string {
    const getMinutes = (time: string): number => {
      const [timeStr, period] = time.split(' ');
      const [hours, minutes] = timeStr.split(':').map(Number);
      let totalMinutes = hours % 12 * 60 + minutes;
      if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
      if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
      return totalMinutes;
    };
  
    const diff = Math.abs(getMinutes(time2) - getMinutes(time1));
    const minutes = Math.floor(diff);
    const seconds = Math.round((diff - minutes) * 60);
  
    const sign = diff >= 0 ? '+' : '-';

    return `${sign}${minutes}m ${seconds > 0 ? `${seconds}s` : ''}`;
  }
  