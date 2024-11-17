export type ViewType = 'month' | 'week' | 'day';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
  type: RecurrenceType;
  interval: number;
  endDate?: string;
}

export function getWeekDays(date: Date): Date[] {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
}

export function getMonthDays(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());
  
  const endDate = new Date(lastDay);
  if (endDate.getDay() !== 6) {
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
  }
  
  const days: Date[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

export function getDayHours(date: Date): Date[] {
  const hours = [];
  const baseDate = new Date(date);
  baseDate.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 24; i++) {
    const hourDate = new Date(baseDate);
    hourDate.setHours(i);
    hours.push(hourDate);
  }
  
  return hours;
}

export function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  const options: Intl.DateTimeFormatOptions = {
    month: format === 'short' ? 'numeric' : 'long',
    day: 'numeric',
    year: format === 'short' ? undefined : 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function generateRecurringEvents(event: {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  recurrence: RecurrenceRule;
}): Array<{
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
}> {
  const events = [];
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const duration = endDate.getTime() - startDate.getTime();
  
  let current = new Date(startDate);
  const recurrenceEnd = event.recurrence.endDate 
    ? new Date(event.recurrence.endDate)
    : new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
  
  while (current <= recurrenceEnd) {
    const eventEnd = new Date(current.getTime() + duration);
    
    events.push({
      id: `${event.id}-${current.getTime()}`,
      title: event.title,
      start: current.toISOString(),
      end: eventEnd.toISOString(),
      color: event.color
    });
    
    switch (event.recurrence.type) {
      case 'daily':
        current.setDate(current.getDate() + event.recurrence.interval);
        break;
      case 'weekly':
        current.setDate(current.getDate() + (7 * event.recurrence.interval));
        break;
      case 'monthly':
        current.setMonth(current.getMonth() + event.recurrence.interval);
        break;
      case 'yearly':
        current.setFullYear(current.getFullYear() + event.recurrence.interval);
        break;
    }
  }
  
  return events;
}
