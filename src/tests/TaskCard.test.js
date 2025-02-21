import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useDrag } from "react-dnd";

jest.mock("../components/TaskForm", () => () => <div data-testid="task-form">Task Form</div>);

jest.mock("react-dnd", () => ({
    useDrag: jest.fn(),
}));

describe("TaskCard Component", () => {
    const mockTask = {
        id: "1",
        title: "Authentication (Firebase Authentication)",
        description: "Implement Firebase Authentication with Google Sign-In and Email/Password Authentication",
        priority: "High",
    };

    const mockTask2 = {
        id: "1",
        title: "Task Management (CRUD Operations)",
        description: "Implement Create, Read, Update, and Delete (CRUD) operations for tasks.",
        priority: "low",
    };
    const mockDeleteTask = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useDrag.mockReturnValue([
            { isDragging: false },
            jest.fn(),
        ]);
    });

    test("renders task details correctly", () => {
        render(<TaskCard task={mockTask} onDelete={mockDeleteTask} />);

        expect(screen.getByText("Authentication (Firebase Authentication)")).toBeInTheDocument();
        expect(screen.getByText("Implement Firebase Authentication with Google Sign-In and Email/Password Authentication")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
    });

    test("calls onDelete when delete button is clicked", () => {
        render(<TaskCard task={mockTask} onDelete={mockDeleteTask} />);

        fireEvent.click(screen.getByText("Delete"));

        expect(mockDeleteTask).toHaveBeenCalledWith("1");
    });

    test("opens TaskForm modal when Edit button is clicked", async () => {
        render(<TaskCard task={mockTask2} onDelete={mockDeleteTask} />);

        fireEvent.click(screen.getByText("Edit"));

        await waitFor(() => {
            expect(screen.getByTestId("task-form")).toBeInTheDocument();
        });
    });

    test("applies opacity change when dragging", () => {
        useDrag.mockReturnValue([
            { isDragging: true },
            jest.fn(),
        ]);

        render(<TaskCard task={mockTask2} onDelete={mockDeleteTask} />);

        const taskCard = screen.getByText("Test Task").closest("div");
        expect(taskCard).toHaveClass("opacity-50");
    });

    test("opens TaskForm modal when Edit button is clicked", async () => {
        render(<TaskCard task={mockTask} onDelete={mockDeleteTask} />);

        fireEvent.click(screen.getByText("Edit"));

        await waitFor(() => {
            expect(screen.getByTestId("task-form")).toBeInTheDocument();
        });
        fireEvent.click(screen.getByTestId("task-form"));
        await waitFor(() => {
            expect(screen.queryByTestId("task-form")).not.toBeInTheDocument();
        });
    });

});
