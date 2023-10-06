import axios, { AxiosPromise } from "axios";
import { EventData } from "../interface/eventData";
import { useQuery } from "react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<EventData[]> => { //função assincrona que retorna requisição get
    const response = axios.get(API_URL + '/event');
    return response;
}

export function useEventData() { //consulta os dados definindo a função, key e tentativa
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['event-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data //retorna um objeto com as props do resultado da consuta
    }
}
