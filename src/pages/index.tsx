import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';
//components
import DashboardLayout from '@/layouts/DashboardLayout';
import DYLayout from '@/components/dynamicLayout/DYLayout';

const Home: NextPage = () => 
{
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
                <DYLayout/>
            </div>
        </DashboardLayout>
    );
};

export const getServerSideProps = async () => 
{
    try 
    {
        //code export
        await axios.get('http://localhost:3005/api/exportOption');
        
        return { props: {} };
    }
    catch (error) 
    {
        return {
            notFound: true,
        };
    }
};

export default Home;
