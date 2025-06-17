import { Bounce, ToastOptions, toast } from 'react-toastify';

type ToastType = 'error' | 'info' | 'success';

const useToast = () => {
  const showToast = (type: ToastType, msg: string) => {
    const props: ToastOptions = {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    };

    switch (type) {
      case 'error':
        return toast.error(msg, props);
      case 'success':
        return toast.success(msg, props);
      case 'info':
        return toast.info(msg, props);
      default:
        return toast.info("Default Message", props); 
    }
  };

  return showToast;
};

export default useToast;
