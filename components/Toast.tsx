import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';
import {View, Text} from "react-native";

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    message: string;
    type?: ToastType;
    btn?: ReactNode;

}

interface ToastContextProps {
    showToast: (message: string, type?: ToastType, children?: ReactNode) => void;
}

const ToastContext = createContext<ToastContextProps>({
    showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = useCallback((message: string, type: ToastType = 'info',btn?: ReactNode) => {
        setToast({ message, type, btn });
        setTimeout(() => setToast(null), 5000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast message={toast.message} type={toast.type} btn={toast.btn} />
            )}
        </ToastContext.Provider>
    );
};

// Inline Toast Component
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Toast = ({ message, type = 'info',btn }: Toast) => {
    const bgColor = {
        success: 'bg-[#EAFFE0]',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    }[type];

    return (
        <View className={`absolute  top-[80px] left-4 right-4 p-4 rounded-2xl ${bgColor} z-50`}

              style={{
                  boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)'
              }}

        >
            <Text className="text-gray-900 font-beVN text-center">{message}</Text>
            {btn && <View className="mt-2 w-auto">{btn}</View>}
        </View>
    );
};