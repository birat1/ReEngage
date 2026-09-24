# ReEngage - Group5

**ReEngage** - A gamified learning platform for Key Stage 2 students.

## Description

**ReEngage** is a full-stack educational web application designed with neurodivergent and anxious children in mind. It provides interactive learning, pressure-free games in English, Maths, and Science, while parent/teacher accounts monitor progress.

## Key Features

* Year-based curriculum selection (Years 3-6)
* Daily learning streaks
* Avatar customisation
* Leaderboards
* Responsive and accessible UI, suitable for children
* User-friendly games
* Games include text-to-speech functionality to support students with reading difficulties and aid understanding.

## Tech Stack

* **Frontend**: React
* **Backend**: Django
* **Database**: SQLite
* **Containerisation**: Docker

## Getting started

### Prerequisites

* [Docker](https://www.docker.com/) and Docker Compose installed

### Installation

1. **Clone the Repository**

```
git clone <repo-link>
cd Group5
```

### Executing program

1. **Run Docker Containers**

* Ensure Docker is running before executing this command.

```
docker compose up --build
```

### Access the App

* Frontend: <http://localhost:5001>
* Backend API: <http://localhost:8000>

### Running Tests

Ensure your Docker containers are running before attempting these tests.

1. **To run backend tests:**

```
docker compose exec django python manage.py migrate
docker compose exec django python manage.py test
```

1. **To run frontend tests:**

```
docker compose exec react npm test -- --watchAll=false 
```

### Logins

Use the following sample accounts to explore the system with pre-seeded data:

1. **Admin Login:**

```
Username: admin_Riley
Password: Rpw
```

1. **Student Login:**

```
Username: student_Ashley
Password: studentpw
```

## Contributors

* Gianna Addae
* Birat Ale
* Isabelle Bill
* Nisaar Bista
* Jason Gurung
* Yuken Rai
* Shizu Rai
