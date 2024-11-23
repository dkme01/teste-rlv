import * as z from "zod"

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const documentForm = z.object({
  origin: z.string().min(1, "Origem do documento é obrigatória"),
  type: z.string().min(1, "Tipo do documento é obrigatório"),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "O arquivo deve ter no máximo 10MB")
    .optional(),
})

export type DocumentFormTypes = z.infer<typeof documentForm>
