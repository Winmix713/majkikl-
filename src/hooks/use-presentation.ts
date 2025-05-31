import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Presentation, Slide, InsertPresentation, InsertSlide } from "@shared/schema";

export function usePresentation(id?: number) {
  return useQuery<Presentation | null>({
    queryKey: ["/api/presentations", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await fetch(`/api/presentations/${id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error("Failed to fetch presentation");
      }
      return response.json();
    },
    enabled: !!id,
  });
}

export function usePresentations() {
  return useQuery<Presentation[]>({
    queryKey: ["/api/presentations"],
  });
}

export function useSlides(presentationId?: number) {
  return useQuery<Slide[]>({
    queryKey: ["/api/presentations", presentationId, "slides"],
    queryFn: async () => {
      if (!presentationId) return [];
      const response = await fetch(`/api/presentations/${presentationId}/slides`);
      if (!response.ok) throw new Error("Failed to fetch slides");
      return response.json();
    },
    enabled: !!presentationId,
  });
}

export function useCreatePresentation() {
  const queryClient = useQueryClient();
  
  return useMutation<Presentation, Error, InsertPresentation>({
    mutationFn: async (data) => {
      const response = await apiRequest("POST", "/api/presentations", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations"] });
    },
  });
}

export function useUpdatePresentation() {
  const queryClient = useQueryClient();
  
  return useMutation<Presentation, Error, { id: number; data: Partial<InsertPresentation> }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiRequest("PUT", `/api/presentations/${id}`, data);
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/presentations", id] });
    },
  });
}

export function useCreateSlide() {
  const queryClient = useQueryClient();
  
  return useMutation<Slide, Error, { presentationId: number; data: Omit<InsertSlide, 'presentationId'> }>({
    mutationFn: async ({ presentationId, data }) => {
      const response = await apiRequest("POST", `/api/presentations/${presentationId}/slides`, data);
      return response.json();
    },
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations", presentationId, "slides"] });
    },
  });
}

export function useUpdateSlide() {
  const queryClient = useQueryClient();
  
  return useMutation<Slide, Error, { id: number; data: Partial<InsertSlide>; presentationId: number }>({
    mutationFn: async ({ id, data }) => {
      const response = await apiRequest("PUT", `/api/slides/${id}`, data);
      return response.json();
    },
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations", presentationId, "slides"] });
    },
  });
}

export function useDeleteSlide() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, { id: number; presentationId: number }>({
    mutationFn: async ({ id }) => {
      await apiRequest("DELETE", `/api/slides/${id}`);
    },
    onSuccess: (_, { presentationId }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations", presentationId, "slides"] });
    },
  });
}
