import React, { createContext, useContext, useState, useCallback } from 'react';
import {View, Text} from "react-native";

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    message: string;
    type?: ToastType;
}

interface ToastContextProps {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps>({
    showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Toast message={toast.message} type={toast.type} />
            )}
        </ToastContext.Provider>
    );
};

// Inline Toast Component
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Toast = ({ message, type = 'info' }: Toast) => {
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
    }[type];

    return (
        <View className={`absolute  top-10 left-4 right-4 px-4 py-2 rounded-md ${bgColor} z-50`}

        >
            <Text className="text-white text-center">{message}</Text>
        </View>
    );
};