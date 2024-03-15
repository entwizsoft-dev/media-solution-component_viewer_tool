import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
//type
import {
    IFocuseIndexPoprs,
    ILayoutCoreDataObjectProps,
} from './interface/layout.interface';
//context
import { DYLayoutProvider } from './DYLayoutContext';
//components
import {
    Box,
    Drawer,
} from '@mui/material';
import DYHeader from './header/DYHeader';
import DYAside from './aside/DYAside';
import DYBoard from '@/components/dynamicLayout/body/DYBoard';

const DYLayout: React.FC = () => 
{
    //state
    const [asideWidth] = useState<number>(360); // aside 상태창 width (*useState 필요시에만 선언)
    const [asideState, setAsideState] = useState<boolean>(true); // aside 상태창 state
    const [focusIndex, setFocusIndex] = useState<IFocuseIndexPoprs>({
        type: null,
        element: 0,
        item: null,
        itemBridgeKey: null,
    });
    //layout state
    const [currentLayoutData, setCurrentLayoutData] = useState<ILayoutCoreDataObjectProps>({
        type: 'testComponent',
    }); //컴포넌트 데이터 배열

    return (
        <DYLayoutProvider
            value={{
                asideWidth,
                asideState: {
                    state: asideState,
                    setState: setAsideState,
                },
                focusIndex: {
                    state: focusIndex,
                    setState: setFocusIndex,
                },
                currentLayoutData: {
                    state: currentLayoutData,
                    setState: setCurrentLayoutData,
                },
            }}
        >
            <DndProvider
                backend={HTML5Backend}
            >
                <Area>
                    <DYHeader/>
                    <Base
                        id='caps'
                    >
                        <Board>
                            <ContentsArea>
                                <DYBoard/>
                            </ContentsArea>
                        </Board>
                        <AsideArea>
                            <Drawer
                                variant='persistent'
                                hideBackdrop
                                anchor='right'
                                open={asideState}
                                PaperProps={{
                                    style: {
                                        position: 'absolute',
                                        zIndex: 2,
                                    },
                                }}
                            >
                                <DYAside/>
                            </Drawer>
                        </AsideArea>
                    </Base>
                </Area>
            </DndProvider>
        </DYLayoutProvider>
    );
};

const Area =styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

const Base = styled(Box)`
    position: relative;
    display: flex;
    flex: 1;;
    height: 100%;
    padding-top: 36px;
    overflow: hidden;
`;

const Board = styled(Box)`
    position: relative;
    display: flex;
    flex: 1;
    height: 100%;
    overflow: hidden;
`;

const ContentsArea = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
`;

const AsideArea = styled(Box)`
    position: relative;
    height: 100%;
`;

export default DYLayout;