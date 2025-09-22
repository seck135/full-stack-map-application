import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IObjectCreate } from "../../types/types";
import { objectsApi } from "../objectsApi";

// GET all objectMarkers
export const useObjects = () => {
    return useQuery({
        queryKey: ["objects"],
        queryFn: objectsApi.getAll,
    });
};

// GET single objectMarker
export const useObject = (id: string) => {
    return useQuery({
        queryKey: ["objects", id],
        queryFn: () => objectsApi.getById(id),
        enabled: !!id, // only fetch if id exists
    });
};

// CREATE objectMarker
export const useCreateObject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: objectsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["objects"] });
        },
    });
};

// UPDATE objectMarker
export const useUpdateObject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, objectMarker }: { id: string; objectMarker: IObjectCreate }) =>
            objectsApi.update(id, objectMarker),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["objects"] });
            queryClient.invalidateQueries({ queryKey: ["objects", data.id] });
        },
    });
};

// DELETE objectMarker
export const useDeleteObject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: objectsApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["objects"] });
        },
    });
};
