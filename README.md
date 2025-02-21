Task Management App

🚀 Project Overview

The Task Management App is a Kanban-style board where users can create, update, organize, and track tasks. It includes authentication, task CRUD operations, activity logs, drag-and-drop functionality, and filtering/sorting features. The app follows modern front-end best practices, including clean architecture, modular design, error handling, and unit testing.

🔑 Prerequisites

1. Add Firebase Configuration

Before running the app, create a Firebase project and add your Firebase config in firebaseConfig.js:

// firebaseConfig in .env
<br/>
<img width="585" alt="Screenshot 2025-02-22 at 12 04 54 AM" src="https://github.com/user-attachments/assets/9b50a035-5ec5-4e9f-ac4d-656899b87800" />


📌 Features & Functionality

✅ 1. Authentication (Firebase Authentication) (15%)

Google Sign-In & Email/Password Authentication

Session persistence & protected routes

Displays user profile details (name, email, profile picture)

✅ 2. Task Management (CRUD Operations) (25%)

Create, Read, Update, and Delete tasks using Firestore

Task Attributes:

Title (Required)

Description (Optional)

Due Date (Optional)

Priority (Low, Medium, High)

Status (To Do, In Progress, Done)

Created By (User's ID)

Form validation using Zod & React Hook Form

✅ 3. Kanban Board (Drag & Drop) (15%)

Drag and drop tasks between columns

Uses React DnD for smooth interactions

Firestore updates in real-time

✅ 4. Task Filtering, Sorting & Search (10%)

Search bar for filtering tasks by title

Priority-based filtering (Low, Medium, High)

Sorting by due date (Ascending/Descending)

✅ 5. Activity Logs (Task History) (15%)

Tracks:

Task creation

Status updates

Edits and deletions

Displays logs in an Activity Logs section

Includes timestamp, user details, and action performed

✅ 6. Unit & Integration Testing (15%)

Tests written using Jest & React Testing Library

Minimum 80% test coverage

Covers:

Authentication workflows

Task CRUD operations

Drag & Drop interactions

Filtering, Sorting & Form validation

✅ 7. Code Quality & Performance Optimization (15%)

Clean architecture & modular coding

Optimized Firestore reads/writes

Lazy loading & debounced searches

Error handling with React Error Boundaries

 Install Dependencies

 npm install

Set Up Firebase :Add your Firebase config in firebaseConfig.js

Run the App : npm start
<h1>Starting page </h1>

![WhatsApp Image 2025-02-21 at 00 12 53](https://github.com/user-attachments/assets/0825c198-3097-4b14-9849-52e057a344d8)

<h1>Add task </h1>

![WhatsApp Image 2025-02-21 at 00 15 43](https://github.com/user-attachments/assets/6b31834c-b08e-4932-a3bc-f1965a2d124f)

<h1>Edit task </h1>

![WhatsApp Image 2025-02-21 at 00 13 41](https://github.com/user-attachments/assets/04176979-89d3-4a55-bcf2-00d09c299f63)

<h1>UI for KanbanBoard</h1>

![WhatsApp Image 2025-02-21 at 00 13 16](https://github.com/user-attachments/assets/1d93b3d2-13bc-4623-96d4-a19b6a0b59aa)

<h1>Filter by priority</h1>
<img width="1440" alt="Screenshot 2025-02-22 at 12 02 39 AM" src="https://github.com/user-attachments/assets/283d5356-18a5-4279-bd3e-c5a850dd8a68" />

<h1>Active Logs </h1>
<img width="1434" alt="Screenshot 2025-02-22 at 12 03 35 AM" src="https://github.com/user-attachments/assets/606df559-fad9-4a5f-99fb-e28cf9e6aa68" />


