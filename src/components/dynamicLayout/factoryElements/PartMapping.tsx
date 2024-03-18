
/* code start */
import React from 'react';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//type
import {
    IContentBridgeKeyProps,
    ILayoutElementListValueProps,
    ILayoutTotalElementListProps,
} from '../interface/element.interface';
import {
    IFocuseIndexPoprs,
    ILayoutCoreDataObjectProps,
} from '../interface/layout.interface';
//components
import ExportFile from '@/export/ExportFile';

interface IStateProrps<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

//element partMapping에서 쓰이는 state 값
interface IPartComponentsStateProps<T> {
    state: T;
    setState: (callback: (prev: T, index: number) => T) => void;
}

//파트에서 쓰이는 고정 props
export interface IPartComponentsProps {
    currentLayoutData: IPartComponentsStateProps<ILayoutCoreDataObjectProps>;
    currentBridgeKey?: IContentBridgeKeyProps;
    bindComponentLayoutUpdate: (templateKey?: string) => void;
    focusIndex: IStateProrps<IFocuseIndexPoprs>;
    focusParent: boolean;
}

//헤더,푸터 요소 파트에서 쓰이는 고정 props
export interface ICommonPartComponentsProps {
    focusIndex: IStateProrps<IFocuseIndexPoprs>;
    currentLayoutData: IPartComponentsStateProps<ILayoutTotalElementListProps | undefined>;
    bindComponentLayoutUpdate: (templateKey?: string, callback?: (prev: Record<string, any>) => ILayoutElementListValueProps) => void;
    currentBridgeKey?: IContentBridgeKeyProps;
    focusParent?: boolean;
}

// //레이아웃 요소 매핑 타입
// type IMappingProps = Record<any, React.FC<IPartComponentsProps>>;
// //공통 레이아웃 요소 매핑 타입
// type ICommonMappingProps = Record<any, React.FC<ICommonPartComponentsProps>>;

interface IPartMappingProps {
    itemIndex?: number;
}

const PartMapping: React.FC<IPartMappingProps> = (props) => 
{
    const {
        itemIndex = 0,
    } = props;
    //context
    const {
        focusIndex,
        currentLayoutData,
    } = useDYLayoutContext();

    //current setState
    const currentLayoutUpdate = (result: ILayoutCoreDataObjectProps) => 
    {
        currentLayoutData.setState(result);
    };

    //연동형 컴포넌트용 데이터 업데이트 이벤트
    const bindComponentLayoutUpdate = (templateKey?: string) => 
    {
        if(templateKey)
        {
            const callback = (prev: ILayoutCoreDataObjectProps) => 
            {
                const testRes = [
                    {
                        _id: '65cf1472ade16310a0de204a',
                        testImage: [
                            'https://d21ageesh0dquz.cloudfront.net/images/1708070000758-5575__1699525286073-3036.ddo.png',
                        ],
                        testText: '테스트 글자',
                        testNumber: 9999,
                        _templateName: 'test',
                        createdAt: '2024-02-16 16:53:22',
                        updatedAt: '2024-02-16 16:53:22',
                    },
                ];

                const convres = testRes.reduce((a,c) => 
                {
                    const json = {
                        options: currentLayoutData.state?.itemOptions,
                        value: c,
                    };
                    a.push(json);

                    return a;
                }, [] as ILayoutElementListValueProps[]);
                return {...prev, contents: convres};
            };

            currentLayoutUpdate(callback(currentLayoutData.state));
        }
    };
    
    return (
        <ExportFile
            focusParent
            focusIndex={focusIndex}
            currentLayoutData={{
                state: currentLayoutData.state,
                setState: (callback: any) => 
                {
                    if(typeof callback === 'function')
                    {
                        currentLayoutUpdate(callback(currentLayoutData.state, itemIndex));
                    }
                },
            }}
            bindComponentLayoutUpdate={bindComponentLayoutUpdate}
            currentBridgeKey={currentLayoutData.state?.contentBridgeKey}
        />
    );
};

export default PartMapping;