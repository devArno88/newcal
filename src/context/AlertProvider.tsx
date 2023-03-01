import { Context, createContext, useContext, useState } from "react";

export enum E_AlertTypes {
    info = "info",
    error = "error",
    success = "success",
    warning = "warning",
}

interface AlertState {
    open: boolean;
    text: string;
    type: E_AlertTypes | null;
}

const standby: AlertState = {
    open: false,
    text: "",
    type: E_AlertTypes.success,
};

const AlertContext: Context<any> = createContext(undefined);
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }: any) => {
    const [alertState, setAlertState] = useState<AlertState>(standby);
    const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertState((previousState: AlertState) => ({ ...previousState, open: false }));
    };
    const setAlert = ({ type, text }: { type: E_AlertTypes; text: string }) => {
        setAlertState({ type, text, open: true });
        const timeout = setTimeout(() => closeAlert(), 3000);
        return () => clearTimeout(timeout);
    };

    return <AlertContext.Provider value={{ alertState, setAlert, closeAlert }}>{children}</AlertContext.Provider>;
};
