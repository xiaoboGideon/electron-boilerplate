import { type ipcMain } from "electron";
import { fetchUsers } from "./fetch-users";
import { saveName } from "./save-name";

export const ipcMainListeners = {
  fetchUsers,
  saveName,
};

export type IpcMainListener = Parameters<typeof ipcMain.handle>[1];
