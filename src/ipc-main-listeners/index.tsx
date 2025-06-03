import type { ipcMain } from "electron";
import { fetchUsers } from "./fetch-users";
import { registerUser } from "./register-user";
import { deleteUsers } from "./delete-users";

export const ipcMainListeners = {
  fetchUsers,
  registerUser,
  deleteUsers,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
