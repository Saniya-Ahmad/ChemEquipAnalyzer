# Chemical Equipment Analyzer

A full-stack application designed to upload, analyze, and visualize chemical equipment data using CSV files. The system provides both web and desktop interfaces for flexible usage.

## Project Overview

The Chemical Equipment Analyzer allows users to:

- Upload CSV files containing chemical equipment data-
- Validate and process equipment parameters
- Generate analytical summaries
- View historical upload records
- Access system via Web Interface (React)
- Access system via Desktop Application (PyQt5)

## Tech Stack
- Backend: Django, Django REST Framework, SQLite Database, CORS Headers
- Frontend Web: React.js, Axios, Vite
- Frontend Desktop: PyQt5, Requests Library

## Project Structure
Chemical-Equipment-Analyzer/
│
├── backend/          → Django API
├── frontend-web/     → React Web Application
├── frontend-desktop/ → PyQt5 Desktop Application
└── README.md

## Installation & Setup
###  Backend Setup (Django API)
Prerequisites: Python 3.8+

## Steps
### Navigate to Backend Folder
```
cd backend
```
### Create Virtual Environment
```
python -m venv venv
```

### Activate Virtual Environment
Windows
```
venv\Scripts\activate
```
Mac/Linux
```
source venv/bin/activate
```
### Install Dependencies
```
pip install -r requirements.txt
```
### Run Database Migrations
```
python manage.py migrate
```
### (Optional) Create Admin User
```
python manage.py createsuperuser
```

### Start Backend Server
```
python manage.py runserver
```

### Backend runs at:

http://127.0.0.1:8000/
<img width="1916" height="966" alt="image" src="https://github.com/user-attachments/assets/ca0e8853-0616-4b0e-8cfd-5f8443aeb312" />

## Frontend Web Setup (React)
Prerequisites: Node.js, npm or yarn

## Steps
### Navigate to Web Frontend Folder
```
cd frontend-web
```
### Install Dependencies
```
npm install
```
### Start Development Server
```
npm run dev
```

### Web Application runs at:

http://localhost:5173/
<img width="1917" height="983" alt="image" src="https://github.com/user-attachments/assets/7ab1bfa6-110f-439a-a3d1-d5de5aba0811" />
<img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/b0bda8dd-255a-4dfa-8f16-3841f8263850" />

## Frontend Desktop Setup (PyQt5)
Prerequisites: Python 3.8+, Backend Server Running

## Steps
### Navigate to Desktop Folder
```
cd frontend-desktop
```

### Install Dependencies
```
pip install pyqt5 requests
```
### Run Desktop Application
```
python main.py
```

<img width="1916" height="1010" alt="image" src="https://github.com/user-attachments/assets/7861dd20-f574-4787-ac46-6ecd3955f87a" />

## CSV File Format

Uploaded CSV must contain the following columns:

- Type
- FlowRate
- Pressure
- Temperature

## Authentication

The system uses Basic Authentication through Django backend.
- Users must provide:
Username
Password

## Features

- CSV Upload & Validation
- Equipment Performance Analysis
- Historical Data Tracking
- REST API Integration
- Web & Desktop Support
- Authentication System
  
### API Endpoints
- Endpoint	Method	Description
- /api/upload/	POST	Upload CSV
- /api/summary/latest/	GET	Get latest summary
- /api/history/	GET	Get upload history

