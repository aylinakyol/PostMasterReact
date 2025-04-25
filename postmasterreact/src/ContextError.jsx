import { createContext, useState } from 'react';

export const ContextError = createContext();

export function ContextError_Provider({ children }) {

    const [isErrorExist, setIsErrorExist] = useState(false);
    const [error, setError] = useState("");

    return (
        <ContextError.Provider value={{ isErrorExist, setIsErrorExist, error, setError }}>
            {children}
        </ContextError.Provider>
    );
};