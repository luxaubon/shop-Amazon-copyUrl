"use client";

import { createContext,useContext,Dispatch,SetStateAction,useState } from "react";

interface ContextProps {
    uid: string,
    setUid: Dispatch<SetStateAction<string>>,
    title: string,
    setTitle: Dispatch<SetStateAction<string>>,
    detail: string,
    setDetail: Dispatch<SetStateAction<string>>,
    search: string,
    setSearch: Dispatch<SetStateAction<string>>,
}

const GlobalContext = createContext<ContextProps>({
    uid: '',
    setUid: (): string => '',
    title: '',
    setTitle: (): string => '',
    detail: '',
    setDetail: (): string => '',
    search: '',
    setSearch: (): string => '',
});

export const GlobalContextProvider = ({ children } : any) => {
    const [uid, setUid] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    return (
        <GlobalContext.Provider value={{ uid,setUid, title,setTitle, detail,setDetail,search,setSearch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);