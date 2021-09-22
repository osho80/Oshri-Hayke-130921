import { toast } from "react-toastify";

export const displayErrMsg = (txt: string) => {
  return toast.error(
    `Server Error: can not load ${txt}. Please try again later`,
    {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
