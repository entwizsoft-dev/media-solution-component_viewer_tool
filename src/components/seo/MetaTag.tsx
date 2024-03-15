import React from 'react';
import Head from 'next/head';

interface IMetaTagProps {
    title?: string;
}

const MetaTag: React.FC<IMetaTagProps> = (props) => 
{
    const {
        title = 'admin',
    } = props;

    return (
        <Head>
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" sizes="32x32" />
            <title>{title}</title>
        </Head>
    );
};

export default MetaTag;