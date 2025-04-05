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
* **Database**: MySQL
* **Containerisation**: Docker

## Getting started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose installed

### Installation

1. **Clone the Repository**
```
git clone <repo-link>
cd Group5
```

### Executing program

2. **Run Docker Containers**
```
docker-compose up --build
```

### Access the App
* Frontend: http://localhost:3000
* Backend API: http://localhost:8000

**Note**: The app’s database has been populated with sample data for testing purposes. No real user information is used.

### Running Tests

1. **To run backend tests:**
```
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py test
```
2. **To run frontend tests:**
```
docker-compose exec frontend npm test
```

## Contributors
* Gianna Addae
* Birat Ale
* Isabelle Bill
* Nisaar Bista
* Jason Gurung
* Yuken Rai
* Shizu Rai


Old - Getting started
---------------

Before you get started, you should update your com2027.yml file with your team members and project details. This will appear at [your static site](https://csee.pages.surrey.ac.uk/com2027/2024-25/Group5).

You have two branches created for you, `trunk` and `release`. The final commit on `release` will be marked.

Commits must be merged into `release` using a merge request, which requires two approvals. Force-pushing is disabled for both branches, as this can destroy your work. Only `trunk` can be merged into `release`.

You may develop directly on `trunk`, although it is recommended that you branch from `trunk` and submit merge requests (or merge directly onto the branch). How you use `trunk` is up to your team.
