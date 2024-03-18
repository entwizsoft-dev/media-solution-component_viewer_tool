import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import process from 'process';
import path from 'path';

const exportHandler = (req: NextApiRequest, res: NextApiResponse) => 
{
    if (req.method === 'GET') 
    {
        const root = process.cwd();
        const exportFilePath = path.join(root, '/src/export/index.tsx');
        const file = fs.readFileSync(exportFilePath, 'utf8');

        const fileStream = fs.createReadStream(exportFilePath);
        const fileSize = fs.statSync(exportFilePath).size;
        const matchName = file.match(/export default (\w+);/);

        const fileName = matchName ? matchName[1] : 'ExportFile';
        
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}.tsx`);
        res.setHeader('Content-Length', fileSize);

        fileStream.pipe(res);
    }
    else 
    {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default exportHandler;