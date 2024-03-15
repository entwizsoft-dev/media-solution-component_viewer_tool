export interface ITemplateCallbackProps<S,M> {
    callbackSelect?: (data: S | M[] | null) => void;
}

export interface ISelectGlobalTemplateProps<S,M> extends ITemplateCallbackProps<S,M> {
    /**
     * 단일, 다중 선택에 필요한 boolean 타입
     */
    singleSelect?: boolean;
    customRoute?: boolean;
}

export interface ISelectTemplateProps<T,S,M> extends ISelectGlobalTemplateProps<S,M> {
    defaultListData?: T | null;
    defaultSelectData?: S | null;
    defaultMultiData?: M[] | null;
}