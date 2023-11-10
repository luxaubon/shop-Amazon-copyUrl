"use client";

import { createContext,useContext,Dispatch,SetStateAction,useState } from "react";

type DataTyoe = {
    uid: string,
    title: string,
    detail: string
}

interface ContextProps {
    uid: string,
    setUid: Dispatch<SetStateAction<string>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    detail: string,
    setDetail: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
    uid: '',
    setUid: (): string => '',
    title: '',
    setTitle: (): string => '',
    detail: '',
    setDetail: (): string => ''
});

export const GlobalContextProvider = ({ children } : any) => {
    const [uid, setUid] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');

    return (
        <GlobalContext.Provider value={{ uid,setUid, title,setTitle, detail,setDetail }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);