import React from "react";
import { render, screen } from "@testing-library/react";
import { useTasks } from "../context/TaskContext";
import ActivityLog from "../components/ActivityLog";
jest.mock("react-dnd");
jest.mock("react-dnd-html5-backend");

jest.mock("../context/TaskContext", () => ({
  useTasks: jest.fn(),
}));

describe("ActivityLog Component", () => {
  test("renders 'No activity recorded yet' when there are no logs", () => {
    useTasks.mockReturnValue({ logs: [] });

    render(<ActivityLog />);

    expect(screen.getByText("No activity recorded yet.")).toBeInTheDocument();
  });

  test("renders activity logs correctly", () => {
    const mockLogs = [
      {
        id: "1",
        user: "Rajesh",
        action: "created",
        taskTitle: "Test Task",
        timestamp: 321323234,
      },
      {
        id: "2",
        user: "Rakesh",
        action: "updated",
        taskTitle: "Another Task",
        timestamp: 3324434244,
      },
      {
        id: "3",
        user: "Priya",
        action: "Changed Status",
        details: "Status changed from To Do to In Progress",
        timestamp: 42343234234,
      },
      {
        id: "4",
        user: "Amit",
        action: "Changed Priority",
        details: "Priority changed from Low to High",
        timestamp: 53423423423,
      },
    ];

    useTasks.mockReturnValue({ logs: mockLogs });

    render(<ActivityLog />);

    expect(screen.getByText("Rajesh created")).toBeInTheDocument();
    expect(screen.getByText("Rakesh updated Another Task")).toBeInTheDocument();
    expect(screen.getByText("Priya Changed Status")).toBeInTheDocument();
    expect(screen.getByText("Status changed from To Do to In Progress")).toBeInTheDocument();
    expect(screen.getByText("Amit Changed Priority")).toBeInTheDocument();
    expect(screen.getByText("Priority changed from Low to High")).toBeInTheDocument();
  });
});
