import { useState } from 'react';

const useModal = () => 
{
    const [modalActive, setModalActive] = useState<boolean>(false);
    const open = () => 
    {
        setModalActive(true);
    };
    const close = () => 
    {
        setModalActive(false);
    };

    return [modalActive,open,close] as const;
};

export default useModal;