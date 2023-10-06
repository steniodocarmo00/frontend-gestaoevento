import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

const deleteEvent = async (eventId: number) => { // função assincrona que retorna requisição delete
  const response = await axios.delete(`${API_URL}/event/${eventId}`);
  return response.data;
};

export function useEventDelete() { //cria mutação e apaga os dados definindo a função, key e tentativa
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries('event-data');
    },
  });

  const deleteEventById = async (eventId: number) => { //deleta por id
    await mutation.mutateAsync(eventId);
  };

  return {
    deleteEventById //retorna metodo
  };
}
