import { toast } from 'react-nextjs-toast'

export const toastAlert = {
  error: () =>
    toast.notify('Erro ao processar solicitação', {
      duration: 5,
      type: 'error'
    }),

  success: (msg: string) =>
    toast.notify(msg, {
      duration: 5,
      type: 'success'
    })
}
