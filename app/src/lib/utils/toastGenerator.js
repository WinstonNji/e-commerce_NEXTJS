import { toast } from "react-toastify"

export const generateToast = (toastId = '', message = '', toastType = 'info') => {
    toast.update(toastId, {
        render : message,
        type : toastType,
        isLoading : false,
        autoClose : 5000
    })
}