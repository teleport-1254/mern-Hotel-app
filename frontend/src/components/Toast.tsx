import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            // call onClose func after 5sec, to auto close
            onClose();
        }, 5000)

        // auto clears the timer
        return () => {
            clearTimeout(timer)
        }
    }, [onClose]);

    const style = type === "SUCCESS"
        ? "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 rounded-t-lg bg-green-600 text-white w-full"
        : "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 rounded-t-lg bg-red-600 text-white w-full"

    return (
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">
                    {message}
                </span>
            </div>
        </div>
    )
}

export default Toast;