import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
import {
    IContentBridgeKeyProps,
    ILayoutElementOptionProps,
} from '@/components/dynamicLayout/interface/element.interface';
//components
import DashboardLayout from '@/layouts/DashboardLayout';
import DYLayout from '@/components/dynamicLayout/DYLayout';

interface IHomeProps {
    ssrExportOption: {
        options?: ILayoutElementOptionProps[]
        itemOptions?: ILayoutElementOptionProps[]
        contentBridgeKey?: IContentBridgeKeyProps
    };
}

const Home: NextPage<IHomeProps> = (props) => 
{
    const {
        ssrExportOption,
    } = props;

    console.log('해당값이 추출되었습니다.', ssrExportOption);

    return (
        <DashboardLayout
            type='wide'
            title='Component Viewer'
            breadcrumbsData={[
                {
                    name: '컴포넌트 아이템을 확인하는 페이지입니다.',
                },
            ]}
        >
            <div
                style={{
                    height: '100%',
                    backgroundColor: 'white',
                    border: '1px solid #d2d2d7',
                }}
            >
                <DYLayout
                    defaultOption={ssrExportOption?.options}
                    defaultItemOption={ssrExportOption?.itemOptions}
                    defaultBridgeKey={ssrExportOption?.contentBridgeKey}
                />
            </div>
        </DashboardLayout>
    );
};

export const getServerSideProps = async () => 
{
    try 
    {
        //code export
        const res = await axios.get('http://localhost:3005/api/exportOption');
        
        return { props: {
            ssrExportOption: res.data,
        } };
    }
    catch (error) 
    {
        return {
            notFound: true,
        };
    }
};

export default Home;
