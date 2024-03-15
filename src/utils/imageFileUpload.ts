import axios from 'axios';

const imageFileUploadHandler = async (file: File) => 
{
    try 
    {
        const formData = new FormData();
        formData.append('image', file);

        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/utility/imageUploadOne', formData, {
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

export { imageFileUploadHandler };