import React from 'react';
import { getWeekDays, formatDate, formatTime, isSameDay } from '@/utils/calendarUtils';
import type { CalendarEvent } from '../CalendarSync';

interface WeekViewProps {
  selectedDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function WeekView({ selectedDate, events, onEventClick }: WeekViewProps) {
  const weekDays = getWeekDays(selectedDate);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForDayAndHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const eventStart = new Date(event.start);
      return isSameDay(eventStart, day) && eventStart.getHours() === hour;
    });
  };

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-8 min-w-[800px]">
        {/* Time column */}
        <div className="border-r border-gray-700">
          <div className="h-12" /> {/* Empty corner cell */}
          {hours.map(hour => (
            <div
              key={hour}
              className="h-16 border-t border-gray-700 pr-2 text-right text-sm text-gray-400"
            >
              {hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
          ))}
        </div>

        {/* Days columns */}
        {weekDays.map((day, index) => (
          <div key={index} className="flex-1">
            <div
              className={`h-12 border-b border-gray-700 p-2 text-center ${
                isSameDay(day, new Date()) ? 'bg-purple-500/20' : ''
              }`}
            >
              <div className="text-sm font-medium">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className="text-xs text-gray-400">
                {formatDate(day, 'short')}
              </div>
            </div>

            {hours.map(hour => (
              <div
                key={hour}
                className="h-16 border-t border-gray-700 relative group"
              >
                {getEventsForDayAndHour(day, hour).map((event, eventIndex) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="absolute inset-x-1 rounded p-1 text-xs cursor-pointer truncate hover:z-10 hover:shadow-lg transition-shadow"
                    style={{
                      backgroundColor: event.color,
                      top: '0.25rem',
                      transform: `translateY(${eventIndex * 24}px)`
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
