import React, { createContext, useContext } from 'react';
//type
import { IDTLayoutContextProps } from './interface/context.interface';


// Context 생성
const DTLayoutContext = createContext<IDTLayoutContextProps>({} as IDTLayoutContextProps);

// Custom Hook
export const useDTLayoutContext = () => 
{
    return useContext(DTLayoutContext) as IDTLayoutContextProps;
};

interface IDTLayoutProviderProps {
    value: IDTLayoutContextProps;
    children?: React.ReactNode;
}

// Provider 컴포넌트
export const DTLayoutProvider = ({ children, value }: IDTLayoutProviderProps) =>
{
    return (
        <DTLayoutContext.Provider
            value={value}
        >
            {children}
        </DTLayoutContext.Provider>
    );
};