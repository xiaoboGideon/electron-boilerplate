import { type ipcMain } from "electron";
import { fetchUsers } from "./fetch-users";
import { registerUser } from "./register-user";

export const ipcMainListeners = {
  fetchUsers,
  registerUser,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
