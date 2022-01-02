from fastapi import FastAPI
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

class CreateTodo(BaseModel):
	todo_title: str = Field(max_length=12)

class Todo(CreateTodo):
	todo_id: int
	todo_title: str = Field(max_length=12)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get('/')
async def index():
				return {
								"id": "test_id",
								"title": "test"
				}	

@app.post('/todo')
async def todos(todos: CreateTodo):
	return {"todos": todos}