import React from 'react';
import { formatDate, formatTime, isSameDay } from '@/utils/calendarUtils';
import type { CalendarEvent } from '../CalendarSync';

interface DayViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function DayView({ selectedDate, events, onEventClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (hour: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.start);
      return isSameDay(eventStart, selectedDate) && eventStart.getHours() === hour;
    });
  };

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-[100px_1fr] min-w-[600px]">
        {/* Time column */}
        <div className="border-r border-gray-700">
          {hours.map(hour => (
            <div
              key={hour}
              className="h-20 border-t border-gray-700 pr-2 text-right text-sm text-gray-400 pt-1"
            >
              {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
          ))}
        </div>

        {/* Events column */}
        <div>
          {hours.map(hour => (
            <div
              key={hour}
              className="h-20 border-t border-gray-700 relative group"
            >
              {getEventsForHour(hour).map((event, eventIndex) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="absolute inset-x-2 rounded p-2 cursor-pointer hover:z-10 hover:shadow-lg transition-shadow"
                  style={{
                    backgroundColor: event.color,
                    top: '0.25rem',
                    transform: `translateY(${eventIndex * 32}px)`,
                    minHeight: '28px'
                  }}
                >
                  <div className="font-medium text-sm truncate">{event.title}</div>
                  <div className="text-xs opacity-80">
                    {formatTime(new Date(event.start))} - {formatTime(new Date(event.end))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
