import React, { createContext, useContext } from 'react';
//type
import { IDYLayoutContextProps } from './interface/context.interface';


// Context 생성
const DYLayoutContext = createContext<IDYLayoutContextProps>({} as IDYLayoutContextProps);

// Custom Hook
export const useDYLayoutContext = () => 
{
    return useContext(DYLayoutContext) as IDYLayoutContextProps;
};

interface IDYLayoutProviderProps {
    value: IDYLayoutContextProps;
    children?: React.ReactNode;
}

// Provider 컴포넌트
export const DYLayoutProvider = ({ children, value }: IDYLayoutProviderProps) =>
{
    return (
        <DYLayoutContext.Provider
            value={value}
        >
            {children}
        </DYLayoutContext.Provider>
    );
};