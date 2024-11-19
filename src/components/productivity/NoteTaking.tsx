import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NoteTaking: React.FC = () => {
  interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[];
  }

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const saveNote = () => {
    if (title.trim() === '' && content.trim() === '') return;

    const tagList = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    if (currentNote) {
      // Update existing note
      setNotes((prev) =>
        prev.map((note) =>
          note.id === currentNote.id
            ? { ...note, title: title.trim(), content: content.trim(), tags: tagList }
            : note
        )
      );
      setCurrentNote(null);
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        tags: tagList,
      };
      setNotes([newNote, ...notes]);
    }
    setTitle('');
    setContent('');
    setTags('');
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setTitle('');
      setContent('');
      setTags('');
    }
  };

  const editNote = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.join(', '));
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
      />

      {/* Note Form */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <textarea
          placeholder="Start typing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[150px] px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white resize-none"
        ></textarea>
        <input
          type="text"
          placeholder="Tags (comma separated)..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <div className="flex justify-end space-x-2">
          {currentNote && (
            <button
              onClick={() => {
                setCurrentNote(null);
                setTitle('');
                setContent('');
                setTags('');
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
            >
              Cancel
            </button>
          )}
          <button
            onClick={saveNote}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
          >
            {currentNote ? 'Update' : 'Save'}
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-400">No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10 flex justify-between items-start"
            >
              <div onClick={() => editNote(note)} className="flex-1 cursor-pointer">
                <h4 className="text-white font-semibold">{note.title || 'Untitled'}</h4>
                <p className="text-emerald-100/70 mt-1">
                  {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
                </p>
                {note.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="mr-1 mb-1 px-2 py-1 bg-emerald-600 text-white text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteNote(note.id)}
                className="ml-4 text-red-400 hover:text-red-300"
                aria-label="Delete Note"
                title="Delete Note"
              >
                ✕
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteTaking;
