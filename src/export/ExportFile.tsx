import React from 'react';
import  { styled } from '@mui/material/styles';
import { IPartComponentsProps } from '@/components/dynamicLayout/factoryElements/PartMapping';
import { findOption } from '@/components/dynamicLayout/utils/commonUtils';
/* code start */
const ExportFile : React.FC<IPartComponentsProps> = (props) => 
{
    const {
        currentLayoutData,
        // currentBridgeKey,
        bindComponentLayoutUpdate,
        // focusParent,
        focusIndex,
    } = props;
    //
    const contents = currentLayoutData.state.contents;
    const option = findOption(currentLayoutData.state.options);
    //option value입니다
    const templateKey = option.get('dataTemplateBind')?.value;
    const gap = option.get('gap')?.value;
    
    React.useEffect(() => 
    {
        bindComponentLayoutUpdate(templateKey);
    }, [templateKey]);

    return (
        <ItemFlexUl
            style={{
                gap: typeof gap === 'number' ? gap + 'px' : '20px',
            }}
        >
            안녕하세요
            {
                contents?.map((d,i) =>
                {
                    const itemOption = findOption(d.options);

                    const title = itemOption.get('title')?.value;
                    const description = itemOption.get('desc')?.value;

                    return (
                        <ItemList
                            key={i}
                            style={{
                                width: `calc(100% / ${contents?.length || 2})`,
                            }}
                            onClick={() => 
                            {
                                focusIndex.setState(prev => 
                                {
                                    return {...prev, item: prev.item === i ? null : i};
                                });
                            }}
                        >
                            <ImgBox className='imgBox' />
                            <TextContain className='textBox'>
                                <h4>
                                    {title || '이건 없습니다.'}
                                </h4>
                                <p>
                                    {`${description}` || '설명 없음'}
                                </p>
                            </TextContain>
                        </ItemList>
                    );
                })
            }
        </ItemFlexUl>
    );
};

const ItemFlexUl = styled('ul')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
`;

const ItemList = styled('li')`
    list-style: none;
`;

const ImgBox = styled('div')`
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: green;
`;

const TextContain = styled('div')`
    padding: 10px 15px 0;
    h4{
        font-size: 16px;
        font-weight: bold;
        padding: 0 0 10px;
        margin: 0;
    }
    p{
        font-size: 12px;
        font-weight: normal;
        white-space: pre-line;
    }
`;



export default ExportFile;