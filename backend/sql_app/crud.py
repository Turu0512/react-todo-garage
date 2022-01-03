from sqlalchemy.orm import Session
from . import models, schemas


# TODO一覧を取得する
def get_todos(db:Session, skip: int = 0, limit: int =100):
    return db.query(models.Todo).offset(skip).limit(limit).all()


# TODO登録
def create_todo(db: Session, todo: schemas.CreateTodo):
    db_todo = models.Todo(todo_title= todo.todo_title)
    db.add(db_todo)
    db.commit()
    db.refresh()
    return db_todo