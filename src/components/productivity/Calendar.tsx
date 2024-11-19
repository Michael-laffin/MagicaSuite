import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Calendar: React.FC = () => {
  interface Event {
    id: number;
    date: string; // YYYY-MM-DD
    title: string;
    description?: string;
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('calendarEvents');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
  const totalDays = endOfMonth.getDate();

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const blanks = Array.from({ length: startDay }, () => null);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const addEvent = () => {
    if (eventTitle.trim() === '') return;
    const newEvent: Event = {
      id: Date.now(),
      date: selectedDate!,
      title: eventTitle.trim(),
      description: eventDescription.trim(),
    };
    setEvents([...events, newEvent]);
    setEventTitle('');
    setEventDescription('');
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const eventsForSelectedDate = selectedDate
    ? events.filter((event) => event.date === selectedDate)
    : [];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
          aria-label="Previous Month"
        >
          ←
        </button>
        <h3 className="text-lg font-semibold text-white">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded"
          aria-label="Next Month"
        >
          →
        </button>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-1 text-center text-gray-400">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          const isToday = dateStr === new Date().toISOString().split('T')[0];
          const dayEvents = events.filter((event) => event.date === dateStr);
          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`p-2 rounded-lg cursor-pointer relative hover:bg-emerald-500/10 ${
                isToday ? 'border border-emerald-400' : ''
              }`}
            >
              <span className="text-white">{day}</span>
              {dayEvents.length > 0 && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Events Modal */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => setSelectedDate(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-gray-900/95 p-6 rounded-xl w-[90vw] max-w-lg max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Events on {selectedDate}
              </h4>

              {/* Existing Events */}
              <div className="space-y-2 mb-4">
                {eventsForSelectedDate.length === 0 ? (
                  <p className="text-gray-400">No events for this date.</p>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10 flex justify-between items-start"
                    >
                      <div>
                        <h5 className="text-white font-medium">{event.title}</h5>
                        {event.description && (
                          <p className="text-emerald-100/70">{event.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="ml-2 text-red-400 hover:text-red-300"
                        aria-label="Delete Event"
                        title="Delete Event"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add New Event */}
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Event title..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
                />
                <textarea
                  placeholder="Event description (optional)..."
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="w-full h-20 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white resize-none"
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
                  >
                    Close
                  </button>
                  <button
                    onClick={addEvent}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
