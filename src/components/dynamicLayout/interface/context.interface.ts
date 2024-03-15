import React from 'react';
//type
import {
    IFocuseIndexPoprs,
    ILayoutCoreDataObjectProps,
} from './layout.interface';

//
interface IStateProrps<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

//layout useContext type
export interface IDYLayoutContextProps {
    asideWidth: number;
    asideState: IStateProrps<boolean>;
    focusIndex: IStateProrps<IFocuseIndexPoprs>;
    currentLayoutData: IStateProrps<ILayoutCoreDataObjectProps>;
}