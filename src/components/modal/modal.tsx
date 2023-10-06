import { useEffect } from "react";
import { Input } from "./input";
import { useEventMutate } from "../../hooks/useEventDataMutate";
import { EventData } from "../../interface/eventData";
import { format } from "date-fns";
import "./modal.css";
import { EventSchemaData, eventSchema } from "../../interface/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ModalProps {
  closeModal(): void;
}

export function Modal({ closeModal }: ModalProps) {
    const { mutate, isSuccess, isLoading } = useEventMutate();
    const {
      handleSubmit,
      register,
      setValue, // Obtenha a função setValue do React Hook Form
      formState: { errors },
    } = useForm<EventSchemaData>({ resolver: zodResolver(eventSchema) });
  
    const onSubmit = (data: EventData) => {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
  
      if (data.date < currentDate) {
        alert('A data do evento não pode ser anterior à data atual.');
        return;
      }
  
      try {
        eventSchema.parse(data);
        // Se passou na validação, prossegue para o envio dos dados
        const eventData: EventData = {
          title: data.title,
          date: data.date,
          image: data.image,
          local: data.local,
          price: data.price,
        };
        mutate(eventData);
      } catch (error: any) {
        alert('Erro de validação:' + error.message);
      }
    };
  
    useEffect(() => {
      if (!isSuccess) {
        return;
      } else {
        closeModal();
      }
    }, [isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre um novo evento</h2>
        <form className="input-container" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome do Evento"
            setValue={setValue}
            type="text"
            {...register('title')}
            errors={errors.title}
          />
          <Input
            label="Local do Evento"
            setValue={setValue}
            type="text"
            {...register('local')}
            errors={errors.local}
          />
          <Input
            label="Data do Evento"
            setValue={setValue}
            type="date"
            {...register('date')}
            errors={errors.date}
          />
          <Input
            label="Preço do Ingresso"
            setValue={setValue}
            type="number"
            {...register('price', { valueAsNumber: true })}
            errors={errors.price}
          />
          <Input
            label="imagem"
            setValue={setValue}
            type="url"
            {...register('image')}
            errors={errors.image}
          />
        <button type="submit" className="btn-secondary">
          {isLoading ? "Criando..." : "Criar"}
        </button>
        </form>
      </div>
    </div>
  );
}
