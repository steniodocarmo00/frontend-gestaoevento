import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

const deleteEvent = async (eventId: number) => {
  const response = await axios.delete(`${API_URL}/event/${eventId}`);
  return response.data;
};

export function useEventDelete() {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('event-data');
    },
  });

  const deleteEventById = async (eventId: number) => {
    await mutation.mutateAsync(eventId);
  };

  return {
    deleteEventById
  };
}
