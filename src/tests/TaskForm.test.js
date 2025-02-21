import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

// Mock useTasks and useNavigate
jest.mock("../context/TaskContext", () => ({
    useTasks: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("TaskForm Component", () => {
    const mockAddTask = jest.fn();
    const mockUpdateTask = jest.fn();
    const mockNavigate = jest.fn();
    const mockCloseModal = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useTasks.mockReturnValue({
            addTask: mockAddTask,
            updateTask: mockUpdateTask,
        });
        useNavigate.mockReturnValue(mockNavigate);
    });

    test("renders correctly with default values", () => {
        render(<TaskForm closeModal={mockCloseModal} />);

        expect(screen.getByPlaceholderText("Task Title")).toHaveValue("");
        expect(screen.getByPlaceholderText("Task Description")).toHaveValue("");
        expect(screen.getByDisplayValue("Medium")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /save task/i })).toBeInTheDocument();
    });

    test("renders with initial data for editing", () => {
        const initialData = {
            id: "1",
            title: "Authentication (Firebase Authentication)",
            description: "Implement Firebase Authentication with Google Sign-In and Email/Password Authentication",
            priority: "High",
            status: "In Progress",
        };

        render(<TaskForm initialData={initialData} closeModal={mockCloseModal} />);

        expect(screen.getByPlaceholderText("Task Title")).toHaveValue("Test Task");
        expect(screen.getByPlaceholderText("Task Description")).toHaveValue("Test Description");
        expect(screen.getByDisplayValue("High")).toBeInTheDocument();
    });

    test("updates state when user types in the inputs", async () => {
        render(<TaskForm closeModal={mockCloseModal} />);

        fireEvent.change(screen.getByPlaceholderText("Task Title"), {
            target: { value: "New Task" },
        });
        fireEvent.change(screen.getByPlaceholderText("Task Description"), {
            target: { value: "New Description" },
        });

        expect(screen.getByPlaceholderText("Task Title")).toHaveValue("New Task");
        expect(screen.getByPlaceholderText("Task Description")).toHaveValue("New Description");
    });

    test("calls addTask when submitting a new task", async () => {
        render(<TaskForm closeModal={mockCloseModal} />);

        fireEvent.change(screen.getByPlaceholderText("Task Title"), {
            target: { value: "New Task" },
        });

        fireEvent.click(screen.getByRole("button", { name: /save task/i }));

        await waitFor(() => {
            expect(mockAddTask).toHaveBeenCalledWith({
                id: "1",
                title: "Authentication (Firebase Authentication)",
                description: "Implement Firebase Authentication with Google Sign-In and Email/Password Authentication",
                priority: "High",
                status: "To Do",
            });
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });

    test("calls updateTask when editing an existing task", async () => {
        const initialData = {
            id: "1",
            title: "Authentication (Firebase Authentication)",
            description: "Implement Firebase Authentication with Google Sign-In and Email/Password Authentication",
            priority: "High",
            description: "Old Description",
            priority: "Low",
        };

        render(<TaskForm initialData={initialData} closeModal={mockCloseModal} />);

        fireEvent.change(screen.getByPlaceholderText("Task Title"), {
            target: { value: "Updated Task" },
        });

        fireEvent.click(screen.getByRole("button", { name: /save task/i }));

        await waitFor(() => {
            expect(mockUpdateTask).toHaveBeenCalledWith("123", {
                title: "Updated Task",
                description: "Old Description",
                priority: "Low",
                status: "To Do",
            });
            expect(mockCloseModal).toHaveBeenCalled();
        });
    });

    test("shows alert if title is empty on submit", async () => {
        window.alert = jest.fn();

        render(<TaskForm closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole("button", { name: /save task/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("Title is required!");
        });
    });

    test("calls closeModal when clicking cancel", () => {
        render(<TaskForm closeModal={mockCloseModal} />);

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

        expect(mockCloseModal).toHaveBeenCalled();
    });

    test("navigates to home if closeModal is not provided", () => {
        render(<TaskForm />);

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
