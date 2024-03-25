import React from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { __bind, __option, __itemOption } from '@/utils/exportEvent';

/* code start */
const TestMain = () => 
{
    return (
        <Area
            style={{
                backgroundImage: `url(${__bind('배경 이미지', 'https://d21ageesh0dquz.cloudfront.net/images/1710843345023-6679__Monterey-1.jpg')})`,
            }}
        >
            <Content>
                <Title
                    style={{
                        color: __option('타이틀 글자 색', '#333'),
                    }}
                >
                    {
                        __bind('슬로건', '슬로건이 노출되는 영역입니다.')
                    }
                </Title>
                <DescBox>
                    <DescTitle>
                        {
                            __bind('서브 타이틀', '브랜드의 가치를 성장시키는 웹사이트를 제작합니다.')
                        }
                    </DescTitle>
                    <Desc>
                        {
                            __bind('설명', '엔트웹스는 단순히 고퀄리티 디자인만 하는 것이 아닌, 브랜드 아이덴티티에 적합한 웹사이트를 기획하고 사용자 중심의 UX/UI 디자인을 설계하여 브랜드의 가치를 성장시키는 웹사이트를 제작합니다.')
                        }
                    </Desc>
                </DescBox>
                <GridWrap>
                    <Btn
                        variant='contained'
                    >
                        {
                            __option('버튼 글자 1', 'MORE PORTFOLIO')
                        }
                    </Btn>
                    <Btn
                        variant='contained'
                    >
                        {
                            __option('버튼 글자 2', 'MORE CAFE24 쇼핑몰')
                        }
                    </Btn>
                </GridWrap>
            </Content>
        </Area>
    );
};

const Area = styled('div')`
    position: relative;
    min-height: 900px;
    background-color: #EFEFEF;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`;

const Content = styled('div')`
    margin-top: 160px;
    padding: 0 160px;
`;

const Title = styled('h2')`
    margin: 0;
    font-size: 70px;
    font-weight: bold;
`;

const DescBox = styled('div')`
    margin-top: 115px;
`;

const DescTitle = styled('h3')`
    margin: 0;
    font-size: 25px;
    font-weight: bold;
    color: #333;
`;

const Desc = styled('p')`
    width: 560px;
    line-height: 2;
`;

const GridWrap = styled('div')`
    display: grid;
    gap: 20px;
    margin-top: 42px;
`;

const Btn = styled(Button)`
    width: 272px;
    height: 50px;
    background-color: #333;
`;

export default TestMain;