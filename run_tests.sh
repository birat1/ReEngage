#!/bin/bash

echo "Running Django tests..."
docker compose exec django python manage.py test

echo -e "\nRunning React tests..."
docker compose exec react npm test -- --watchAll=false 