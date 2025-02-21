import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("ProtectedRoute Component", () => {
  test("renders children when user is authenticated", () => {
    useAuth.mockReturnValue({ user:true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Protected Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("redirects to /login when user is not authenticated", () => {
    useAuth.mockReturnValue({ user: false });

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <ProtectedRoute>
          <h1>Protected Content</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
