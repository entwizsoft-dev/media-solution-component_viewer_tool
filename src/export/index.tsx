
import React, { useEffect } from 'react';
import  { styled } from '@mui/material/styles';
import { IPartComponentsProps } from '@/components/dynamicLayout/factoryElements/PartMapping';
import { findOption, findProperty } from '@/components/dynamicLayout/utils/commonUtils';
/* code start */
const TestDev : React.FC<IPartComponentsProps> = (props) => 
{
    const {
        currentLayoutData,
        currentBridgeKey,
        bindComponentLayoutUpdate,
        // focusParent,
        focusIndex,
    } = props;

    //
    const contents = currentLayoutData.state.contents;
    const option = findOption(currentLayoutData.state.options);      
    //option value입니다
    const templateKey = option.get('dataTemplateBind')?.value;    
    const boldText = option.get('boldText')?.value;
    const thumbnail = currentBridgeKey?.thumbnail?.value;
    
    useEffect(() => 
    {
        bindComponentLayoutUpdate(templateKey);
    }, [templateKey]);
    
    return (
        <>
            <Section>
                <TopArea>
                    <h4>
                        메이크웨이는&nbsp;
                        <b>
                            {
                                boldText || 'boldText'
                            }
                        </b>
                        를 합니다
                    </h4>
                    <p>
                        성공적인 비즈니스를 위한 전략<br />
                        경쟁력 있는 홈페이지를 만듭니다.
                    </p>
                </TopArea>
                <ItemList>
                    {
                        contents?.map((d,i)=>
                        {
                            const itemOption = findOption(d.options);
                            const title = itemOption.get('title')?.value;
                            const subTitle = itemOption.get('subTitle')?.value;
                            return(
                                <li
                                    key={i}
                                    onClick={() => 
                                    {
                                        focusIndex.setState(prev => 
                                        {
                                            return {...prev, item: prev.item === i ? null : i};
                                        });
                                    }}
                                >
                                    <div className='textBox'>
                                        <p>{title || '타이틀 입력'}</p>
                                        <span>{subTitle || '부제 입력'}</span>
                                    </div>
                                    <div className='imgBox'>
                                        <img src={findProperty(thumbnail, d.value)} alt={`img${i}`} />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ItemList>
            </Section>

            <Section2>
                <h1>기획부터 개발, 유지보수까지 철저하게 관리하는</h1>
                <div className='flexBox'>
                    <div className='leftBox'>
                        <div className='dot'>
                            <span></span>
                            <span></span>
                        </div>
                        <h4>
                            브랜드의 가치를<br />
                            성장시키는 웹사이트를<br />
                            제작합니다.
                        </h4>
                        <p>
                            엔트웹스는 단순히 고퀄리티 디자인만 하는 것이 아닌, 브랜드 아이덴티티에 적합한 웹사이트를
                            기획하고 사용자 중심의 <span>UX/UI 디자인</span>을 설계하여 브랜드의 가치를 성장시키는 
                            웹사이트 제작합니다.
                        </p>
                        <button>MORE PORTFOLIO</button>
                    </div>
                    <div className='redBall' />
                    <ul className='rightBox'>
                        {
                            Array.from([1,2,3,4]).map((d,i)=>
                            {
                                return(
                                    <li key={i}>
                                        <img src="images/document.svg" alt="" />
                                    </li>
                                );
                            })
                        }
                    </ul>

                </div> 
            </Section2>
        </>
    );
};

//test section2 styled
const Section2 = styled('section')`
    background-color: #435ffd;
    color: #fff;
    display: none;

    h1 {
        font-size: 32px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        margin: 0;
        padding: 10px 0;
    }
    .flexBox{
        display: flex;

        padding: 40px 20px;
        gap: 20px;
        .leftBox{
            width: 100%;
            max-width: 400px;
            .dot{
                display: flex;
                margin: 0;
                padding: 0;
                gap: 10px;
                span{
                    display: block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #fff;
                }
            }
            h4{
                font-size: 18px;
                font-weight: 600;
                padding: 10px 0;
                margin: 0;
            }
            p{
                margin: 0;
                padding: 0;
                word-break: keep-all;
                font-size: 13px;
                font-weight: 200;
            }
            button{
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                background: unset;
                border-radius: 30px;
                padding: 15px 20px;
                margin-top: 20px;
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                &::after{
                    content: '→';
                    display: inline-block;
                    padding: 0 0 0 10px;
                }
            }
        }
        .redBall{
            width: 100%;
            max-width: 30px;
            height: 30px;
            background-color: red;
            border-radius: 50%;
            margin: 50px 0 0;
        }
        .rightBox{
            width: 100%;
            display: flex;
            gap: 20px;
            li{
                width: calc(100% / 4);
                height: 100%;
                background-color: #fff;
                list-style: none;
                border-radius: 10px;
                rotate: 2deg;
            }
        }
    }
`;

//scction styled
const Section = styled('section')`
    padding: 15px;
    margin: 0 0 20px;

`;
const TopArea = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 30px;
    h4{
        font-size: 20px;
        font-weight: normal;
        margin: 0;
        b{
            font-weight: bold;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                width: 100%;
                bottom: -1px;
                border: 1px solid #000;
            }
        }
    }
    p{
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
    }
`;
const ItemList = styled('ul')`
    display: flex;
    gap: 10px;
    padding: 0;
    margin: 0;
    li{
        width: calc(100% / 4);
        list-style: none;
        .textBox{
            padding: 0 0 10px;
            font-size: 14px;
            font-weight: bold;
            p{
                margin: 0;
            }
            span{
                font-weight: normal;
                font-size: 12px;
                padding: 10px 0;
            }
        }
        .imgBox{
            width: 100%;
            aspect-ratio: 1/1;
            background-color: #b1b1b1;
            img{
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
`;



export default TestDev;
