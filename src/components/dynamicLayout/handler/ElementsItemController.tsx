import React from 'react';
import { styled } from '@mui/material/styles';
//icon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//components
import {
    IconButton,
    Stack,
} from '@mui/material';

interface ILayerControllerProps {
    layerIndex: number;
}

const ElementsItemController: React.FC<ILayerControllerProps> = (props) => 
{
    const {
        layerIndex,
    } = props;
    //context

    //레이어 위치 이동
    const moveEvent = (direction: 'prev' | 'next') => 
    {
        console.log(direction);
        // const xpos = direction === 'next' ? 1 : -1;
        
        // setLayoutData(prev => 
        // {
        //     if(prev)
        //     {
        //         const idx = layerIndex + xpos;
        //         const newCompArr = prev[componentIndex];
        //         const newComp = newCompArr.componentData;

        //         //위치 변경 유효성 검사
        //         if(idx < 0 || idx >= newComp.length)
        //         {
        //             return prev;
        //         }

        //         const [removed] = newComp.splice(layerIndex, 1);

        //         newComp.splice(idx, 0, removed);
        //     }

        //     return prev;
        // });
    };

    //레이어 데이터 수정
    const modifyEvent = async () => 
    {
        // await contentModalOpen({
        //     action: 'modify',
        //     componentType: componentType,
        //     componentIndex: componentIndex,
        //     layerData: componentData[layerIndex],
        //     layerIndex: layerIndex,
        // });
    };

    //레이어 삭제
    const deleteEvent = () => 
    {
        // const filterResult = componentData.filter((_,i) => 
        // {
        //     return i !== layerIndex;
        // });

        // setLayoutData(prev => 
        // {
        //     if(prev)
        //     {
        //         const newArr = [...prev];
        //         newArr[componentIndex] = {...newArr[componentIndex], componentData: filterResult};
        //         return newArr;
        //     }
            
        //     return prev;
        // });
    };
    
    return (
        <ControllerWrapper
            direction={'row'}
        >
            <IconButtonBox
                area-aria-label='left-move'
                size='small'
                disabled={layerIndex <= 0}
                onClick={() => 
                {
                    moveEvent('prev');
                }}
            >
                <NavigateBeforeIcon/>
            </IconButtonBox>
            <IconButtonBox
                area-aria-label='right-move'
                size='small'
                // disabled={layerIndex + 1 >= componentData.length}
                onClick={() => 
                {
                    moveEvent('next');
                }}
            >
                <NavigateNextIcon/>
            </IconButtonBox>
            <IconButtonBox
                area-aria-label='edit'
                size='small'
                onClick={modifyEvent}
            >
                <EditIcon/>
            </IconButtonBox>
            <IconButtonBox
                area-aria-label='delete'
                size='small'
                onClick={deleteEvent}
            >
                <DeleteIcon/>
            </IconButtonBox>
        </ControllerWrapper>
    );
};

const ControllerWrapper = styled(Stack)`
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 998;
    background-color : ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
    border-top: 1px solid ${({theme}) => 
    {
        return theme.palette.dividerTheme.light;
    }};
    border-left: 1px solid ${({theme}) => 
    {
        return theme.palette.dividerTheme.light;
    }};
    border-radius: 6px 0 6px 0;
    box-shadow: -3px 3px 8px 0 ${({theme}) => 
    {
        return theme.palette.shadowColor.main;
    }};
`;

const IconButtonBox = styled(IconButton)`
    color: ${({theme}) => 
    {
        return theme.palette.svgColor.main;
    }};
`;

export default ElementsItemController;