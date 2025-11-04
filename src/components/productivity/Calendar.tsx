import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalIcon, Clock, Users, MapPin } from 'lucide-react';
import { AIToolLayout } from '../ai/AIToolLayout';
import { useAIChat, getQuickActionsForTool } from '../ai';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees?: string[];
  location?: string;
  aiGenerated?: boolean;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 I'm your AI Schedule Optimizer! I can help you schedule meetings, find available times, and manage your calendar. Try: 'Schedule a team meeting tomorrow at 2pm'"
  );

  const handleMessage = async (message: string) => {
    await sendMessage(message, { events });

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting') || lowerMessage.includes('appointment')) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: extractEventTitle(message),
        date: extractDate(message),
        time: extractTime(message),
        attendees: extractAttendees(message),
        location: extractLocation(message),
        aiGenerated: true,
      };
      setEvents(prev => [...prev, newEvent].sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()));
    }
  };

  const extractEventTitle = (message: string): string => {
    const patterns = [
      /schedule (?:a )?(?:meeting|appointment) (?:for |about |regarding )?(.+?)(?:\s+tomorrow|\s+today|\s+on|\s+at|\s*$)/i,
      /(?:meeting|appointment) (?:for |about |regarding )?(.+?)(?:\s+tomorrow|\s+today|\s+on|\s+at|\s*$)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) return match[1].trim();
    }
    return 'New Event';
  };

  const extractDate = (message: string): string => {
    const today = new Date();
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('today')) {
      return today.toISOString().split('T')[0];
    }
    if (lowerMessage.includes('tomorrow')) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }

    // Default to today
    return today.toISOString().split('T')[0];
  };

  const extractTime = (message: string): string => {
    const timeMatch = message.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] || '00';
      const period = timeMatch[3]?.toLowerCase();

      if (period === 'pm' && hours < 12) hours += 12;
      if (period === 'am' && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
    return '09:00';
  };

  const extractAttendees = (message: string): string[] | undefined => {
    const withMatch = message.match(/with (.+?)(?:\s+at|\s+on|\s+tomorrow|\s+today|\s*$)/i);
    if (withMatch) {
      return withMatch[1].split(/,| and /).map(name => name.trim());
    }
    return undefined;
  };

  const extractLocation = (message: string): string | undefined => {
    const atMatch = message.match(/at (.+?)(?:\s+on|\s+tomorrow|\s+today|\s*$)/i);
    if (atMatch) return atMatch[1].trim();
    return undefined;
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const quickActions = [
    { label: '📅 Schedule meeting', prompt: 'Schedule a team meeting tomorrow at 2pm' },
    { label: '🔍 Find time', prompt: 'Find me available time slots this week' },
    { label: '📊 Today\'s schedule', prompt: 'What\'s on my calendar today?' },
    { label: '⏰ Reschedule', prompt: 'Help me reschedule a meeting' },
  ];

  return (
    <AIToolLayout
      messages={messages}
      isTyping={isTyping}
      onSendMessage={handleMessage}
      quickActions={quickActions}
      placeholder="E.g., 'Schedule a client call Friday at 10am'"
      categoryColor="#10b981"
      toolName="AI Schedule Optimizer"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
            <CalIcon className="w-5 h-5" />
            Upcoming Events
          </h3>
          <span className="text-sm text-gray-400">{events.length} events</span>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No events scheduled</p>
            <p className="text-sm mt-2">Use AI to schedule meetings!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-sm font-medium text-gray-200">{event.title}</h4>
                      {event.aiGenerated && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          AI
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <CalIcon className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{event.time}</span>
                      </div>

                      {event.attendees && (
                        <div className="flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AIToolLayout>
  );
};

export default Calendar;
