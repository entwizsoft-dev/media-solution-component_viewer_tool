import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import process from 'process';
import path from 'path';
import axios from 'axios';

const exportHandler = async (req: NextApiRequest, res: NextApiResponse) => 
{
    try 
    {
        if (req.method === 'GET') 
        {
            const root = process.cwd();
            const exportFilePath = path.join(root, '/src/export/ExportFile.tsx');
            const file = fs.readFileSync(exportFilePath, 'utf8');
    
            const exportfileCodeRes = await axios.post('http://localhost:3002/admin/componentPalette/optionList', {code: file});

            if(exportfileCodeRes.data.code === 1)
            {
                res.status(200).json(exportfileCodeRes.data.data);
            }
            else
            {
                throw 'api error';
            }
        }
        else 
        {
            throw 'method error';
        }
    }
    catch (error)
    {
        
        res.setHeader('Allow', ['GET']);
        res.status(405).end(error);
    }
};

export default exportHandler;