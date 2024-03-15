//type
//dnd
import {
    DropResult,
    DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

//단일 선택 result
export interface ISingleResultProps<T> {
    selectData?: T | null;
    itemRender?: (data: T) => React.ReactNode;
}

//다중 선택 result
export interface IMultiResultProps<T> {
    selectData: T[];
    useDrag?: boolean;
    callbackDrag?: (drag: DropResult) => void;
    itemRender?: (prop: {data: T, idx: number}, drag?: DraggableProvidedDragHandleProps | null) => React.ReactNode;
}