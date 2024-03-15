import axios from 'axios';

const fileUploadHandler = async (file: File) => 
{
    try 
    {
        const formData = new FormData();
        formData.append('file', file);

        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/utility/fileUploadOne', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const { data }:{data : string} = res.data;

        return data;
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
};

export { fileUploadHandler };