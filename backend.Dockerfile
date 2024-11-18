FROM python:3.11
WORKDIR /backend
COPY . .
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt
CMD alembic upgrade head && fastapi dev app/main.py --host 0.0.0.0
