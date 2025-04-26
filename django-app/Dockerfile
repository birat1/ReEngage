FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install Pillow
COPY . .
EXPOSE 8000
CMD ["sh", "-c", "python manage.py makemigrations && \
                 python manage.py migrate && \
                 python manage.py seed && \
                 daphne -b 0.0.0.0 -p 8000 backend.asgi:application"]
