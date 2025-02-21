import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../context/TaskContext", () => ({
  useTasks: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    onSnapshot: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
  }));

jest.mock("../components/KanbanBoard", () => () => <div data-testid="kanban-board">Kanban Board</div>);
jest.mock("../components/SearchFilter", () => () => <div data-testid="search-filter">Search Filter</div>);
jest.mock("../components/TaskForm", () => ({ initialData, closeModal }) => (
  <div data-testid="task-form">
    Task Form {initialData ? "Edit Mode" : "Create Mode"}
    <button onClick={closeModal} data-testid="close-modal">Close</button>
  </div>
));
jest.mock("../components/ActivityLog", () => () => <div data-testid="activity-log">Activity Log</div>);

describe("Dashboard Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { displayName: "Test User" },
      logout: jest.fn(),
    });

    useTasks.mockReturnValue({
      tasks: [{ id: "1", title: "Task 1", description: "Test Task" }],
    });

    sessionStorage.setItem("guest", "false");
  });

  test("renders Dashboard with user welcome message", () => {
    render(<Dashboard />);
    expect(screen.getByText("Welcome, Test User")).toBeInTheDocument();
  });

  test("opens and closes TaskForm modal", async () => {
    render(<Dashboard />);

    // Open modal
    fireEvent.click(screen.getByText(/Create New Ticket/i));
    expect(screen.getByTestId("task-form")).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByTestId("close-modal"));
    await waitFor(() => {
      expect(screen.queryByTestId("task-form")).not.toBeInTheDocument();
    });
  });

  test("renders KanbanBoard and SearchFilter", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("kanban-board")).toBeInTheDocument();
    expect(screen.getByTestId("search-filter")).toBeInTheDocument();
  });

  test("renders ActivityLog", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("activity-log")).toBeInTheDocument();
  });

  test("calls logout function when Logout button is clicked", () => {
    const { logout } = useAuth();
    render(<Dashboard />);

    fireEvent.click(screen.getByText(/Logout/i));
    expect(logout).toHaveBeenCalled();
  });
});
