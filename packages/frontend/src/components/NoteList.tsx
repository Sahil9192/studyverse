import { NotePublic } from '../types/note';

interface NoteListProps {
  notes: NotePublic[];
  onDelete: (id: number) => void;
  onEdit: (note: NotePublic) => void;
}

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
  if (notes.length === 0) {
    return <p>No notes yet. Add one!</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;