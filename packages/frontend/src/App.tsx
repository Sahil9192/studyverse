import { useState, useEffect } from 'react';
import './App.css';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import * as api from './services/api';
import { NotePublic } from './types/note';

function App() {
  const [notes, setNotes] = useState<NotePublic[]>([]);
  const [editingNote, setEditingNote] = useState<NotePublic | null>(null);

  useEffect(() => {
    api.getNotes().then(setNotes);
  }, []);

  const handleFormSubmit = async (title: string, content: string) => {
    if (editingNote) {
      // We are in edit mode
      const updatedNote = await api.updateNote(editingNote.id, { title, content });
      setNotes(notes.map(n => n.id === editingNote.id ? updatedNote : n));
      setEditingNote(null); // Exit edit mode
    } else {
      // We are in create mode
      const newNote = await api.createNote({ title, content });
      setNotes([...notes, newNote]);
    }
  };

  const handleDeleteNote = async (id: number) => {
    await api.deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleSetEditingNote = (note: NotePublic) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>StudyVerse Notes</h1>
      </header>
      <main>
        <NoteForm 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancelEdit}
          editingNote={editingNote} 
        />
        <NoteList 
          notes={notes} 
          onDelete={handleDeleteNote}
          onEdit={handleSetEditingNote} 
        />
      </main>
    </div>
  );
}

export default App;