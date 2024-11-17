import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Trash2, RefreshCw, Check, X, Settings } from 'lucide-react';
import { CalendarEventForm } from './CalendarEventForm';

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  calendar: string;
  color: string;
}

interface ConnectedCalendar {
  id: string;
  name: string;
  type: 'Google' | 'Outlook' | 'Apple' | 'Custom';
  color: string;
  connected: boolean;
}

export function CalendarSync() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'connections'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Sample data - in a real app, this would come from an API
  const [calendars, setCalendars] = useState<ConnectedCalendar[]>([
    { id: '1', name: 'Work Calendar', type: 'Google', color: '#4285F4', connected: true },
    { id: '2', name: 'Personal', type: 'Outlook', color: '#00A4EF', connected: true },
    { id: '3', name: 'Family Events', type: 'Apple', color: '#A2B1C6', connected: false },
  ]);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: '2024-02-20T10:00',
      end: '2024-02-20T11:00',
      calendar: 'Work Calendar',
      color: '#4285F4'
    },
    {
      id: '2',
      title: 'Dentist Appointment',
      start: '2024-02-20T14:00',
      end: '2024-02-20T15:00',
      calendar: 'Personal',
      color: '#00A4EF'
    }
  ]);

  const connectCalendar = (type: ConnectedCalendar['type']) => {
    // In a real app, this would open OAuth flow
    console.log(`Connecting to ${type} calendar`);
  };

  const disconnectCalendar = (id: string) => {
    setCalendars(calendars.map(cal => 
      cal.id === id ? { ...cal, connected: false } : cal
    ));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startPadding = firstDay.getDay();
    
    // Add padding days
    for (let i = 0; i < startPadding; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const handleAddEvent = (eventData: {
    title: string;
    start: string;
    end: string;
    calendar: string;
  }) => {
    const calendarInfo = calendars.find(cal => cal.id === eventData.calendar);
    if (!calendarInfo) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
      calendar: calendarInfo.name,
      color: calendarInfo.color
    };

    setEvents([...events, newEvent]);
  };

  return (
    <div className="text-white">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'calendar' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <CalendarIcon className="h-5 w-5" />
          Calendar View
        </button>
        <button
          onClick={() => setActiveTab('connections')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'connections' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Settings className="h-5 w-5" />
          Calendar Connections
        </button>
      </div>

      {activeTab === 'calendar' ? (
        <div className="space-y-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
            >
              ←
            </button>
            <h3 className="text-lg font-medium">{formatDate(selectedDate)}</h3>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-400 text-sm py-2">
                {day}
              </div>
            ))}
            {getDaysInMonth(selectedDate).map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square p-2 border border-gray-700 rounded-lg
                  ${day ? 'hover:bg-gray-700 cursor-pointer' : ''}
                  ${day?.getDate() === new Date().getDate() && 
                    day?.getMonth() === new Date().getMonth() ? 
                    'bg-purple-500/20 border-purple-500' : 'bg-gray-800'}
                `}
              >
                {day && (
                  <>
                    <div className="text-sm">{day.getDate()}</div>
                    <div className="space-y-1 mt-1">
                      {events
                        .filter(event => new Date(event.start).getDate() === day.getDate())
                        .map(event => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded truncate"
                            style={{ backgroundColor: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => setShowAddEvent(true)}
            className="fixed bottom-6 right-6 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Connected Calendars */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connected Calendars</h3>
            {calendars.filter(cal => cal.connected).map(calendar => (
              <div
                key={calendar.id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: calendar.color }}
                  />
                  <span>{calendar.name}</span>
                  <span className="text-sm text-gray-400">({calendar.type})</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => console.log('Syncing...')}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => disconnectCalendar(calendar.id)}
                    className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Available Calendars */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Add Calendar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Google', 'Outlook', 'Apple', 'Custom'].map(type => (
                <button
                  key={type}
                  onClick={() => connectCalendar(type as ConnectedCalendar['type'])}
                  className="flex items-center justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <span>{type} Calendar</span>
                  <Plus className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {showAddEvent && (
        <CalendarEventForm
          onClose={() => setShowAddEvent(false)}
          onSubmit={handleAddEvent}
          calendars={calendars.filter(cal => cal.connected)}
        />
      )}
    </div>
  );
}
