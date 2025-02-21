import { render, act } from "@testing-library/react";
import { TaskProvider, useTasks } from "../context/TaskContext";
import { db } from "../services/firebase";
import { collection, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

jest.mock("../services/firebase", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

describe("TaskContext", () => {
  test("adds a task", async () => {
    const testTask = { title: "Test Task", priority: "High" };
    addDoc.mockResolvedValueOnce({ id: "123" });

    const { result } = render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      await result.current.addTask(testTask);
    });

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining(testTask));
  });

  test("updates a task", async () => {
    const updatedTask = { title: "Updated Task", priority: "Low" };
    updateDoc.mockResolvedValueOnce();

    const { result } = render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      await result.current.updateTask("123", updatedTask);
    });

    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), updatedTask);
  });

  test("deletes a task", async () => {
    deleteDoc.mockResolvedValueOnce();

    const { result } = render(
      <TaskProvider>
        <TestComponent />
      </TaskProvider>
    );

    await act(async () => {
      await result.current.deleteTask("123");
    });

    expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
  });
});
