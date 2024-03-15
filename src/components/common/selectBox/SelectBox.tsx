import React, { useState } from 'react';
//components
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

interface ISelectBox {
    data : any;
    title : string;
    defaultSelect?: string | number | null;
    callbackSelect? : (value? : any) => void
}
const SelectBox:React.FC<ISelectBox> = (props) => 
{
    const {
        data,
        title,
        defaultSelect,
        callbackSelect,
    } = props;

    const [value, setValue] = useState<string | number | null>(defaultSelect ? defaultSelect : '');
    
    const selectValueHandler = (e: any) => 
    {
        setValue(e.target.value);
        
        const selectedData = data.find((el : any) => 
        {
            return el.uid === e.target.value;
        });

        if(typeof callbackSelect === 'function')
        {
            callbackSelect(selectedData);
        }
    };

    return (
        <FormControl sx={{width:'300px'}}>
            <InputLabel id={title}>{title}</InputLabel>
            <Select
                labelId={title}
                label={title}
                value={value}
                onChange={selectValueHandler}
            >
                {
                    data?.map((el:any) => 
                    {
                        return (
                            <MenuItem 
                                key={el.uid}
                                value={el.uid}>
                                {el.name}
                            </MenuItem>
                        );
                    })
                }

            </Select>
        </FormControl>
    );
};

export default SelectBox;