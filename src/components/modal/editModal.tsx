// EditModal.tsx
import { useEffect } from "react";   
import { EventData } from "../../interface/eventData";
import { useEventUpdate } from "../../hooks/UseEventUpdate";
import { Input } from "./input";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchemaData, eventSchema } from "../../interface/schema";

interface EditModalProps {
    eventId: number;
    closeModal(): void;
}

export function EditModal({
    eventId,
    closeModal
}: EditModalProps) {
    const { mutate, isLoading, isSuccess } = useEventUpdate();
    const {
      handleSubmit,
      register,
      setValue,
      formState: { errors }
    } = useForm<EventSchemaData>({
      resolver: zodResolver(eventSchema)
    });
    
    const submit = (data: EventData) => {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      
      if (data.date < currentDate) {
        alert('A data do evento não pode ser anterior à data atual.');
        return;
      }
      
      try{
        const updatedEventData: EventData = {
            title: data.title,
            date: data.date,
            image: data.image,
            local: data.local,
            price: data.price,
          };
    
        mutate({ id: eventId.toString(), data: updatedEventData });
      }
      catch (error:any){
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
          <h2>Editar evento</h2>
          <form className="input-container" onSubmit={handleSubmit(submit)}>
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
              label="Imagem"
              setValue={setValue}
              type="url"
              {...register('image')}
              errors={errors.image}
            />
            <button type="submit" className="btn-secondary">
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </div>
      </div>
    );
  }
  