from pydantic import BaseModel, Field


class CreateTodo(BaseModel):
    todo_title: str = Field(max_length=12)
    class Config:
        orm_mode = True

class Todo(CreateTodo):
    todo_id: int

class DeleteTodo(BaseModel):
    todo_id: int