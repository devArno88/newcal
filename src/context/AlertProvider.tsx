import { getErrorMessage, getSuccessMessage } from "@/utils";
import { Context, createContext, useContext, useState } from "react";

export enum E_AlertTypes {
    error = "error",
    info = "info",
    success = "success",
    warning = "warning",
}

export interface AlertState {
    open: boolean;
    title: string | null;
    subtitle: string | null;
    type: E_AlertTypes | null;
}

const standby: AlertState = {
    open: false,
    title: null,
    subtitle: null,
    type: null,
};

const AlertContext: Context<any> = createContext(undefined);
export const useAlert = () => useContext(AlertContext);

const AlertProvider = ({ children }: any) => {
    const [alertState, setAlertState] = useState<AlertState>(standby);
    const closeAlert = () => setAlertState(standby);

    const setAlert = ({ type, title, subtitle }: { type?: E_AlertTypes; title?: string; subtitle: string }) => {
        const defaultType = type || E_AlertTypes.info;
        const defaultTitle =
            type === E_AlertTypes.success
                ? getSuccessMessage()
                : type === E_AlertTypes.error
                ? getErrorMessage()
                : title;
        setAlertState({ type: defaultType, title: defaultTitle, subtitle, open: true });
        const timeout = setTimeout(() => {
            closeAlert();
        }, 3000);
        return () => clearTimeout(timeout);
    };

    return <AlertContext.Provider value={{ alertState, setAlert, closeAlert }}>{children}</AlertContext.Provider>;
};

export default AlertProvider;
