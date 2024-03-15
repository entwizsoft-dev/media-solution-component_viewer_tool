import { ReactElement, useEffect, useState } from 'react';
import { DraggableProvided, DraggingStyle } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';

export const useDraggableInPortal = () => 
{
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    useEffect(() => 
    {
        setElement(document.createElement('div'));
    }, []);

    useEffect(() => 
    {
        if (element) 
        {
            element.style.pointerEvents = 'none';
            element.style.position = 'absolute';
            element.style.height = '100%';
            element.style.width = '100%';
            element.style.top = '0';

            document.body.appendChild(element);

            return () => 
            {
                document.body.removeChild(element);
            };
        }
        else
        {
            return undefined;
        }
    }, [element]);

    return (render: (provided: DraggableProvided) => ReactElement) => 
    {
        return (provided: DraggableProvided) => 
        {
            const result = render(provided);
            const style = provided.draggableProps.style as DraggingStyle;
            if (style.position === 'fixed' && element) 
            {
                return createPortal(result, element);
            }
            return result;
        };
    };
};