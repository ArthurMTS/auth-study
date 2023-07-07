import { toast } from "react-toastify";

export const useToast = () => {
  const handleToastSucess = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: {
        background: "blue"
      },
      theme: "dark",
      icon: false,
    });
  };

  const handleToastError = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progressStyle: {
        background: "red"
      },
      theme: "dark",
      icon: false,
    });
  };

  return {
    handleToastSucess,
    handleToastError
  };
};