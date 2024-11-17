import React, { useState } from 'react';
import { X, Calendar, Clock, RefreshCw } from 'lucide-react';
import { RecurrenceType, RecurrenceRule } from '@/utils/calendarUtils';

interface CalendarEventFormProps {
  onClose: () => void;
  onSubmit: (event: {
    title: string;
    start: string;
    end: string;
    calendar: string;
    recurrence?: RecurrenceRule;
  }) => void;
  calendars: Array<{ id: string; name: string; color: string }>;
  initialEvent?: {
    title: string;
    start: string;
    end: string;
    calendar: string;
    recurrence?: RecurrenceRule;
  };
}

export function CalendarEventForm({ onClose, onSubmit, calendars, initialEvent }: CalendarEventFormProps) {
  const [title, setTitle] = useState(initialEvent?.title || '');
  const [startDate, setStartDate] = useState(initialEvent?.start.split('T')[0] || '');
  const [startTime, setStartTime] = useState(initialEvent?.start.split('T')[1] || '');
  const [endDate, setEndDate] = useState(initialEvent?.end.split('T')[0] || '');
  const [endTime, setEndTime] = useState(initialEvent?.end.split('T')[1] || '');
  const [selectedCalendar, setSelectedCalendar] = useState(initialEvent?.calendar || calendars[0]?.id || '');
  const [showRecurrence, setShowRecurrence] = useState(!!initialEvent?.recurrence);
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>(initialEvent?.recurrence?.type || 'none');
  const [recurrenceInterval, setRecurrenceInterval] = useState(initialEvent?.recurrence?.interval || 1);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(initialEvent?.recurrence?.endDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate || !startTime || !endDate || !endTime || !selectedCalendar) {
      return;
    }

    const eventData = {
      title,
      start: `${startDate}T${startTime}`,
      end: `${endDate}T${endTime}`,
      calendar: selectedCalendar,
      ...(showRecurrence && recurrenceType !== 'none' && {
        recurrence: {
          type: recurrenceType,
          interval: recurrenceInterval,
          ...(recurrenceEndDate && { endDate: recurrenceEndDate })
        }
      })
    };

    onSubmit(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h3 className="text-lg font-medium text-white">
            {initialEvent ? 'Edit Event' : 'Add Event'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Calendar
            </label>
            <select
              value={selectedCalendar}
              onChange={(e) => setSelectedCalendar(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              {calendars.map(calendar => (
                <option key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <button
              type="button"
              onClick={() => setShowRecurrence(!showRecurrence)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              {showRecurrence ? 'Hide Recurrence' : 'Add Recurrence'}
            </button>

            {showRecurrence && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Repeat
                  </label>
                  <select
                    value={recurrenceType}
                    onChange={(e) => setRecurrenceType(e.target.value as RecurrenceType)}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <option value="none">Never</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {recurrenceType !== 'none' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Interval
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={recurrenceInterval}
                        onChange={(e) => setRecurrenceInterval(parseInt(e.target.value))}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        End Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={recurrenceEndDate}
                        onChange={(e) => setRecurrenceEndDate(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              {initialEvent ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
