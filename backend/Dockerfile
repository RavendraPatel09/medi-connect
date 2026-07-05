FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y gcc postgresql-client libpq-dev \
    && apt-get clean

# We'll install via pip
COPY pyproject.toml .
RUN pip install --upgrade pip
RUN pip install .

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
