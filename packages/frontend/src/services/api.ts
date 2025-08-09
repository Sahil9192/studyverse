import { NoteCreate, NotePublic, NoteUpdate } from '../types/note';

const API_BASE_URL = 'http://localhost:8000';

// Fetch all notes
export const getNotes = async (): Promise<NotePublic[]> => {
  const response = await fetch(`${API_BASE_URL}/notes/`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

// Create a new note
export const createNote = async (note: NoteCreate): Promise<NotePublic> => {
  const response = await fetch(`${API_BASE_URL}/notes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json();
};

// Update a note
export const updateNote = async (id: number, note: NoteUpdate): Promise<NotePublic> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to update note');
  }
  return response.json();
};

// Delete a note
export const deleteNote = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};