import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import process from 'process';
import path from 'path';

const exportRegex = (code: string, regex: RegExp) => 
{
    const matchArr = [...code.matchAll(regex)];
    const result = matchArr.map(([_, name]) => 
    {
        return name;
    });

    console.log(result);
};

const exportHandler = (req: NextApiRequest, res: NextApiResponse) => 
{
    if (req.method === 'GET') 
    {
        const root = process.cwd();
        const exportFilePath = path.join(root, '/src/export/ExportFile.tsx');
        const file = fs.readFileSync(exportFilePath, 'utf8');

        const optionRegex = /option\.get\('([^']+)'\)/g;
        const itemOptionRegex = /itemOption\.get\('([^']+)'\)/g;
        const bridgeKeyRegex = /currentBridgeKey(?:\?.|.)(\w+)[?.;]?/g; 

        exportRegex(file, optionRegex);

        res.status(200).json({ data: 1 });
    }
    else 
    {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default exportHandler;