import store from '@/store';
import { useEffect, useState } from 'react';

// _app.tsx에서 redux 값 변경데이터를 갱신하기 위한 hooks
const useReduxDarkMode = () => 
{
    const [isDarkMode, setIsDarkMode] = useState(null);
    
    useEffect(() => 
    {
        const handleStoreChange = () => 
        {
            const currentIsDarkMode = store.getState().colorMode.isDarkMode;
            setIsDarkMode(currentIsDarkMode);
        };
    
        const unsubscribe = store.subscribe(handleStoreChange);
    
        return () => 
        {
            unsubscribe();
        };
        
    },[]);
    return isDarkMode;
};

export default useReduxDarkMode;