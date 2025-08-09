import { useState, useEffect } from 'react';
import { NotePublic } from '../types/note';

interface NoteFormProps {
  onSubmit: (title: string, content: string) => void;
  onCancel?: () => void;
  editingNote: NotePublic | null;
}

const NoteForm = ({ onSubmit, onCancel, editingNote }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Check if we are in "edit mode"
  const isEditing = editingNote !== null;

  useEffect(() => {
    if (isEditing) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote, isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
        alert('Title is required');
        return;
    }
    onSubmit(title, content);
    if (!isEditing) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Note' : 'Create a New Note'}</h2>
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">{isEditing ? 'Update Note' : 'Add Note'}</button>
      {isEditing && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default NoteForm;