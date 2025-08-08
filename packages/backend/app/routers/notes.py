from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from app.db.database import get_session
from app.models.models import Note
from app.schemas.note_schemas import NoteCreate, NotePublic, NoteUpdate

router = APIRouter()

@router.post("/", response_model=NotePublic, status_code=201)
def create_note(*, session: Session = Depends(get_session), note: NoteCreate):
    """
    Create a new note.
    """
    # For now, we'll hardcode the user_id. We will fix this when we add auth.
    db_note = Note.model_validate(note, update={"user_id": 1}) 
    session.add(db_note)
    session.commit()
    session.refresh(db_note)
    return db_note

@router.get("/{note_id}", response_model=NotePublic)
def read_notes(*, session: Session = Depends(get_session), note_id: int):
    """
    Get all notes.
    """
    db_note = session.get(Note, note_id)
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    return db_note

@router.patch("/{note_id}", response_model=NotePublic)
def update_note(*, session: Session = Depends(get_session), note_id: int, note_in: NoteUpdate):
    """
    Update a note.
    """
    db_note = session.get(Note, note_id)
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    # Get the update data, excluding any unset values
    update_data = note_in.model_dump(exclude_unset=True)
    
    # Update the model fields
    for key, value in update_data.items():
        setattr(db_note, key, value)
        
    session.add(db_note)
    session.commit()
    session.refresh(db_note)
    return db_note

@router.delete("/{note_id}", status_code=200)
def delete_note(*, session: Session = Depends(get_session), note_id: int):
    """
    Delete a note.
    """
    db_note = session.get(Note, note_id)
    if not db_note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    session.delete(db_note)
    session.commit()
    return {"message": "Note deleted successfully"}