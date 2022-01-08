from sqlalchemy import Column, Integer, String
from .database import Base

class Todo(Base):
    __tablename__ = "todo"
    todo_id = Column(Integer, primary_key=True, index=True)
    todo_title = Column(String, index=True)

class CompleatTodo(Base):
    __tablename__ = "compleat_todo"
    todo_id = Column(Integer, primary_key=True, index=True)
    todo_title = Column(String, index=True)