import type { IObjectCreate, ObjectMarker } from "../types/types";
import apiClient from "./client";

export const objectsApi = {
  getAll: async (): Promise<ObjectMarker[]> => {
    const { data } = await apiClient.get("/objects");
    return data;
  },

  getById: async (id: string): Promise<ObjectMarker> => {
    const { data } = await apiClient.get(`/objects/${id}`);
    return data;
  },

  create: async (objectMarker: IObjectCreate): Promise<ObjectMarker> => {
    const { data } = await apiClient.post("/objects", objectMarker);
    return data;
  },

  update: async (id: string, objectMarker: IObjectCreate): Promise<ObjectMarker> => {
    const { data } = await apiClient.put(`/objects/${id}`, objectMarker);
    return data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete(`/objects/${id}`);
    return data;
  },
};
