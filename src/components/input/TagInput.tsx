import React, { useState, useEffect } from 'react';
//components
import {
    TextField,
    Chip,
} from '@mui/material';

interface ITagInput {
    label?: string;
    placeholder?: string;
    defaultValue?: string[] | null;
    callbackTag?:(value: string[] | []) => void;
}

const TagInput : React.FC<ITagInput> = (props) => 
{
    const {
        label = 'tag',
        placeholder,
        defaultValue,
        callbackTag,
    } = props;
    //
    const [currentValue, setCurrentValue] = useState<string>('');
    const [tagValue, setTagValue] = useState<string[] | []>([]);

    //Enter key Trigger
    const keyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => 
    {
        if(e.key === 'Enter' && currentValue !== '')
        {
            e.preventDefault();

            setTagValue(prev => 
            {
                return [...prev, currentValue];
            });
            setCurrentValue('');
        }
    };

    //onChnage Event
    const updateValueEvent = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const value = e.currentTarget.value;

        setCurrentValue(value);
    };

    //delete Chip Eent
    const deleteChipEvent = (index: number) => 
    {
        setTagValue(prev => 
        {
            const newPrev = [...prev];
            newPrev.splice(index, 1);
            return newPrev;
        });
    };

    useEffect(() => 
    {
        if(Array.isArray(defaultValue))
        {
            setTagValue(defaultValue);
        }
    }, [defaultValue]);

    useEffect(() => 
    {
        if(typeof callbackTag === 'function')
        {
            callbackTag(tagValue);
        }
    }, [tagValue, callbackTag]);

    return (
        <TextField
            fullWidth
            label={label}
            placeholder={tagValue.length > 0 ? '' : placeholder}
            onKeyDown={keyDownEvent}
            onChange={updateValueEvent}
            value={currentValue}
            InputProps={{
                startAdornment: tagValue.map((d,i) => 
                {
                    return (
                        <Chip
                            key={i}
                            tabIndex={-1}
                            label={d}
                            sx={{
                                mr: 1,
                            }}
                            onDelete={() => 
                            {
                                deleteChipEvent(i);
                            }}
                        />
                    );
                }),
            }}
        />
    );
};


export default TagInput;