import type { IPolygonCreate, Polygon } from "../types/types";
import apiClient from "./client";

export const polygonsApi = {
  getAll: async (): Promise<Polygon[]> => {
    const { data } = await apiClient.get("/polygons");
    return data;
  },

  getById: async (id: string): Promise<Polygon> => {
    const { data } = await apiClient.get(`/polygons/${id}`);
    return data;
  },

  create: async (polygon: IPolygonCreate): Promise<Polygon> => {
    const { data } = await apiClient.post("/polygons", polygon);
    return data;
  },

  update: async (id: string, polygon: IPolygonCreate): Promise<Polygon> => {
    const { data } = await apiClient.put(`/polygons/${id}`, polygon);
    return data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await apiClient.delete(`/polygons/${id}`);
    return data;
  },
};
