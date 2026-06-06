import { CLINIC } from "./site-config";
import { ReviewItem } from "@/components/clinic/reviews-wall";

export function useClinicSettings() {
  return {
    data: null as typeof CLINIC | null,
    isLoading: false,
    error: null,
  };
}

export function useTestimonials() {
  return {
    data: null as ReviewItem[] | null,
    isLoading: false,
    error: null,
  };
}
