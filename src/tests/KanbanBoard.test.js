import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import KanbanBoard from "../components/KanbanBoard";
import { useTasks } from "../context/TaskContext";

jest.mock("../context/TaskContext", () => ({
    useTasks: jest.fn(),
  }));
  

describe("KanbanBoard Component", () => {
  const mockUpdateTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockSetPriorityFilter = jest.fn();

  const mockTasks = [
    { id: "1", title: "Authentication (Firebase Authentication)", status: "To Do", priority: "High" },
    { id: "2", title: "Task Filtering, Sorting & Search", status: "In Progress", priority: "Medium" },
    { id: "3", title: "Unit & Integration Testing", status: "Done", priority: "Low" },
  ];

  beforeEach(() => {
    useTasks.mockReturnValue({
      tasks: mockTasks,
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      priorityFilter: "All",
      setPriorityFilter: mockSetPriorityFilter,
    });
  });

  test("calls update Task when a task is moved (dragged)", () => {
    render(<KanbanBoard />);

    fireEvent.drop(screen.getByText("Authentication (Firebase Authentication)"), { dataTransfer: { getData: () => "1" } });

    expect(mockUpdateTask).toHaveBeenCalledWith("1", { status: "In Progress" });
  });

  test("calls delete Task when a task delete button is clicked", () => {
    render(<KanbanBoard />);

    fireEvent.click(screen.getByText("Authentication (Firebase Authentication)").closest("div").querySelector("button"));

    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });

  test("calls setPriorityFilter when priority dropdown is changed", () => {
    render(<KanbanBoard />);

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "High" } });

    expect(mockSetPriorityFilter).toHaveBeenCalledWith("High");
  });
});
