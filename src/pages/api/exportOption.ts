import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import process from 'process';
import path from 'path';

const exportHandler = (req: NextApiRequest, res: NextApiResponse) => 
{
    if (req.method === 'GET') 
    {
        const root = process.cwd();
        const exportFilePath = path.join(root, '/src/export/ExportFile.tsx');
        const file = fs.readFileSync(exportFilePath, 'utf8');

        console.log(file);

        res.status(200).json({ data: '코드 파일 추출 R&D중' });
    }
    else 
    {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default exportHandler;