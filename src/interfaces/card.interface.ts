import React from 'react';

export interface IBottomMenuOption {
    title: string;
    event?: (json: {idx?: number, data: any}) => void;
    color?:  
	'inherit' | 
	'primary' | 
	'secondary' | 
	'success' | 
	'error' | 
	'info' | 
	'warning'
}

interface IDataItem {
	[key: string]: any;
}

export interface ICardListItem {
	fadeEffect?: 'up' | 'down';
	itemBottomMenuOption?: IBottomMenuOption[];
	idx?: number;
    data: IDataItem;
}

//카드리스트 타입
export interface ICardList {
    data: IDataItem[];
    viewLength?: number;
    itemBottomMenuOption?: IBottomMenuOption[];
	render?: (e: {data: any, index: number}) => React.ReactNode;
}
