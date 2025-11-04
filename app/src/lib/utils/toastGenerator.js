import { toast } from "react-toastify"

export const generateToast = (toastId = '', message = '', toastType = 'info') => {
    const demoMessage = "Functionality not allowed for demo admin account"
    const finalType = (typeof message === 'string' && message.trim() === demoMessage) ? 'info' : toastType
    toast.update(toastId, {
        render : message,
        type : finalType,
        isLoading : false,
        autoClose : 5000
    })
}