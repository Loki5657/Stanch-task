Task Management App

🚀 Project Overview

The Task Management App is a Kanban-style board where users can create, update, organize, and track tasks. It includes authentication, task CRUD operations, activity logs, drag-and-drop functionality, and filtering/sorting features. The app follows modern front-end best practices, including clean architecture, modular design, error handling, and unit testing.

🔑 Prerequisites

1. Add Firebase Configuration

Before running the app, create a Firebase project and add your Firebase config in firebaseConfig.js:

// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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