import {useRef, useCallback} from 'react';

interface IOberverOptionProps extends IntersectionObserverInit {
    onIntersect: (entry: IntersectionObserverEntryInit, observer: IntersectionObserver) => void;
}

const useIntersectionObserver = (options: IOberverOptionProps) => 
{
    const observer = useRef<IntersectionObserver | null>(null);
    const element = useRef<Element | null>(null);
    
    const setRef = useCallback((node: Element) => 
    {
        if (observer.current) 
        {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(([entry]) => 
        {
            if (entry.isIntersecting) 
            {
                if(observer.current)
                {
                    options.onIntersect(entry, observer.current);
                }
            }
        }, options);

        element.current = node;

        if (element.current) 
        {
            observer.current.observe(element.current);
        }
    }, [options]);
    
    return setRef;
};

export default useIntersectionObserver;
