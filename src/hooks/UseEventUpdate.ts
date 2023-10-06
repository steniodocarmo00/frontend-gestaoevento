import axios, { AxiosPromise } from "axios";
import { EventData } from "../interface/eventData";
import { useMutation, useQueryClient } from "react-query";

const API_URL = 'http://localhost:8080';

const updateData = async ({ id, data }: { id: string; data: EventData }): AxiosPromise<any> => {
    const response = axios.put(`${API_URL}/event/${id}`, data);
    return response;
}

export function useEventUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation(updateData, {
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['event-data'])
        }
    });

    return mutate;
}
