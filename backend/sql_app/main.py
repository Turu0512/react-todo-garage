from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import crud, models, schemas
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.params import Depends
from typing import List



models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000"
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/todo', response_model=List[schemas.Todo])
async def read_todo(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@app.post('/todo', response_model= schemas.CreateTodo)
async def create_todo(todo: schemas.CreateTodo, db: Session = Depends(get_db)):
	return crud.create_todo(todo=todo, db=db)

@app.delete("/todo/{todo_id}")
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    # crud.delete_todo(todo_id, db)
    todo = db.query(models.Todo).filter(models.Todo.todo_id == todo_id).first()
    db.delete(todo)
    db.commit()
