import { apiClient } from "./apiClient";

export type Note = {
  id: string;          // uuid or string
  title: string;
  createdAt: string;   // ISO string
  updatedAt?: string;
};

export type NoteDetail = Note & {
  content: string;
};

export const noteService = {
  list: () => apiClient.get<Note[]>("/api/notes"),
  get: (id: string) => apiClient.get<NoteDetail>(`/api/notes/${id}`),
  create: (payload: { title: string; content: string }) =>
    apiClient.post<Note>("/api/notes", payload),
  update: (id: string, payload: { title: string; content: string }) =>
    apiClient.put<Note>(`/api/notes/${id}`, payload),
  remove: (id: string) => apiClient.del<{ ok: true }>(`/api/notes/${id}`),
};
