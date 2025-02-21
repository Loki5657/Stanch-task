import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useTasks } from "../context/TaskContext";
import SearchFilter from "../components/SearchFilter";

jest.mock("../context/TaskContext", () => ({
    useTasks: jest.fn(),
}));

describe("SearchFilter Component", () => {
    const mockTasks = [
        { id: "1", title: "Authentication (Firebase Authentication) " },
        { id: "2", title: "Task Management" },
        { id: "3", title: "Kanban Board (Drag & Drop)" },
    ];

    beforeEach(() => {
        useTasks.mockReturnValue({ tasks: mockTasks });
    });

    test("renders search input field", () => {
        render(<SearchFilter />);
        expect(screen.getByPlaceholderText("Search tasks...")).toBeInTheDocument();
    });

    test("displays filtered tasks based on user input", () => {
        render(<SearchFilter />);

        const input = screen.getByPlaceholderText("Search tasks...");

        fireEvent.change(input, { target: { value: "Authentication" } });

        expect(screen.getByText("Authentication (Firebase Authentication) ")).toBeInTheDocument();
        expect(screen.getByText("Task Management")).toBeInTheDocument();
        expect(screen.getByText("Kanban Board (Drag & Drop)")).toBeInTheDocument();
    });

    test("updates displayed tasks as user types", () => {
        render(<SearchFilter />);

        const input = screen.getByPlaceholderText("Search tasks...");

        fireEvent.change(input, { target: { value: "Kanban Board " } });

        expect(screen.getByText("Kanban Board (Drag & Drop)")).toBeInTheDocument();
        expect(screen.queryByText("Task Management")).not.toBeInTheDocument();
        expect(screen.queryByText("Authentication (Firebase Authentication) ")).not.toBeInTheDocument();
    });

    test("hides tasks when search query does not match any task", () => {
        render(<SearchFilter />);

        const input = screen.getByPlaceholderText("Search tasks...");

        fireEvent.change(input, { target: { value: "Not Found" } });

        expect(screen.queryByText("Authentication (Firebase Authentication)")).not.toBeInTheDocument();
        expect(screen.queryByText("Task Management")).not.toBeInTheDocument();
        expect(screen.queryByText("Kanban Board (Drag & Drop)")).not.toBeInTheDocument();
    });
});
