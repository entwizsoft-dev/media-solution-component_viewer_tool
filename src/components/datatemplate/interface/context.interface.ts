import React from 'react';
//type
import {
    ITemplatePageDataProps,
    ITemplateDataProps,
    ITemplateMainDataProps,
    ITemplateRootOptionProps,
} from './element.interface';

export interface IFocusItemProps {
    index: number;
}

interface IStateProrps<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

//데이터 뎀플릿 디테일 useContext type
export interface IDTLayoutContextProps {
    templateID: string;
    optionAsideWidth: number;
    isChanged: boolean;
    loading: IStateProrps<boolean>;
    optionAside: IStateProrps<boolean>;
    templatePage: IStateProrps<ITemplatePageDataProps>;
    tmeplateRootOption: IStateProrps<ITemplateRootOptionProps>;
    template: IStateProrps<ITemplateDataProps[]>;
    focusItem: IStateProrps<IFocusItemProps | null>;
    beforeTemplateData: IStateProrps<ITemplateMainDataProps>;
}