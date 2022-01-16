from sqlalchemy.orm import Session
from . import models, schemas


def get_todo(db: Session, todo_id):
    return db.query(models.Todo).filter(models.Todo.todo_id == todo_id).first()

# TODO一覧を取得する
def get_todos(db:Session, skip: int = 0, limit: int =100):
    return db.query(models.Todo).offset(skip).limit(limit).all()

def get_compleat_todos(db:Session, skip: int = 0, limit: int =100):
    return db.query(models.CompleatTodo).offset(skip).limit(limit).all()


# TODO登録
def create_todo(db: Session, todo: schemas.CreateTodo):
    db_todo = models.Todo(todo_title= todo.todo_title)
    db.add(db_todo)
    db.commit()
    db.refresh(db,todo)
    return db_todo

# compleat_todoの移動
def compleat_todo(db: Session, todo: schemas.CreateTodo):
    db_compleat_todo = models.CompleatTodo(todo_title= todo.todo_title)
    db.add(db_compleat_todo)
    db.commit()
    db.refresh(db,todo)
    return db_compleat_todo

# TODOの削除
# def delete_todo(db: Session, todo_id: str):
#     # delete_todo = get_todo(db, todo_id)
#     todo = db.query(models.Todo).filter(models.Todo.todo_id == todo_id).first()
#     db.delete(todo)
#     db.commit()
