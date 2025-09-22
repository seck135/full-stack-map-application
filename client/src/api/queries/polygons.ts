import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { polygonsApi } from "../polygonsApi";
import type { IPolygonCreate } from "../../types/types";

// GET all polygons
export const usePolygons = () => {
  return useQuery({
    queryKey: ["polygons"],
    queryFn: polygonsApi.getAll,
  });
};

// GET single polygon
export const usePolygon = (id: string) => {
  return useQuery({
    queryKey: ["polygons", id],
    queryFn: () => polygonsApi.getById(id),
    enabled: !!id, // only fetch if id exists
  });
};

// CREATE polygon
export const useCreatePolygon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: polygonsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polygons"] });
    },
  });
};

// UPDATE polygon
export const useUpdatePolygon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, polygon }: { id: string; polygon: IPolygonCreate }) =>
      polygonsApi.update(id, polygon),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["polygons"] });
      queryClient.invalidateQueries({ queryKey: ["polygons", data.id] });
    },
  });
};

// DELETE polygon
export const useDeletePolygon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: polygonsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polygons"] });
    },
  });
};
