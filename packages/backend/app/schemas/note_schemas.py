from sqlmodel import SQLModel
from typing import Optional

class NoteBase(SQLModel):
    title: str
    content: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(SQLModel):
    title: Optional[str] = None
    content: Optional[str] = None

class NotePublic(NoteBase):
    id: int