import { z } from "zod";

//controla os inputs mostrando os tipos e mensagens de erro
export const eventSchema = z.object({
  title: z.string({required_error: 'O nome do evento é obrigatório.'}),
  local: z.string({required_error: 'O local do evento é obrigatório.'}),
  date: z.string({required_error: 'A data do evento é obrigatória'}),
  price: z.number({
    errorMap: () => {
      return {message: 'Informe um número válido.'}
    }
  }).refine((value) => value >= 0, {
    message: 'O preço do ingresso não pode ser negativo.',
  }),
  image: z.string({required_error: 'Informe uma URL válida.'}).url(),
});

  export type EventSchemaData = z.infer<typeof eventSchema> //define o tipo do schema
