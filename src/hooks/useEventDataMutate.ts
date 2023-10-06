import axios, { AxiosPromise } from "axios";
import { EventData } from "../interface/eventData";
import { useMutation, useQueryClient } from "react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: EventData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/event', data);
    return response;
}

export function useEventMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['event-data'])
        },
        onError: (error) => {
            alert('Ocorreu um erro ao criar o evento. Por favor, tente novamente.');
            console.error('Erro ao criar evento:', error)
        }
    })

    return mutate;
}