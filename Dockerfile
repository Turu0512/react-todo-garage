FROM python:3.10.1

RUN pip install fastapi uvicorn sqlalchemy

EXPOSE 8000

