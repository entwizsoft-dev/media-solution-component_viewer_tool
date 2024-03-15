import React, { useState, useRef, forwardRef, useEffect } from 'react';
import { SxProps } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import DatePicker, { ReactDatePicker, registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
//icon
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DateRange from '@mui/icons-material/DateRange';
//components
import {
    Box,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
} from '@mui/material';

//date ko
registerLocale('ko', ko);


export type IStartDate = Date | null;
export type IEndDate = Date | null;
export type IDates = { start: IStartDate, end: IEndDate };
export type ICallbackDate = (dates: IDates | IStartDate) => void;

export interface IDateRangeProps {
    title?: string;
    range?: boolean;
    dateFormat?: string;
    allowBeforeDay?: boolean;
    defaultDate?: IStartDate;
    defaultEndDate?: IEndDate;
    callbackDate?: ICallbackDate;
    showTimeInput?: boolean;
    sx?: SxProps
}

const DateRangePicker: React.FC<IDateRangeProps> = (props) => 
{
    const {
        title = 'Date Picker', //제목
        range = true,
        dateFormat = 'yyyy-MM-dd',
        allowBeforeDay = false, //현재날 보다 이전 날짜 선택 불가 옵션
        defaultDate,
        defaultEndDate,
        callbackDate, //datepicker select 시 dates값 callback
        showTimeInput = false,
        sx, //mui style
    } = props;
    //ref
    const calendar = useRef<ReactDatePicker | null>(null);
    //date
    const date = new Date();
    //state
    const [startDate, setStartDate] = useState<IStartDate>(defaultDate ? new Date(defaultDate) : date);
    const [endDate, setEndDate] = useState<IEndDate>(defaultEndDate ? new Date(defaultEndDate) : null);

    //데이터 선택 이벤트
    const onDateChange = (dateValue: Date | [IStartDate, IEndDate]) => 
    {
        if(range)
        {
            const [start, end] = dateValue as [IStartDate, IEndDate];
    
            setStartDate(start);
            setEndDate(end);
    
            // const json = {
            //     start: start,
            //     end: end,
            // };
            //callback
            // if(typeof callbackDate === 'function')
            // {
            //     callbackDate(json);
            // }
        }
        else
        {
            const singleDate = dateValue as Date;

            setStartDate(singleDate);
            // if(typeof callbackDate === 'function')
            // {
            //     callbackDate(singleDate);
            // }
        }
    };

    useEffect(() => 
    {
        if(range)
        {
            const json = {
                start: startDate,
                end: endDate,
            };

            if(typeof callbackDate === 'function')
            {
                callbackDate(json);
            }
        }
        else
        {
            if(typeof callbackDate === 'function')
            {
                callbackDate(startDate);
            }
        }
    }, [range, startDate, endDate]);

    const CustomInput = forwardRef(({ value, onClick }: any, ref) => 
    {
        return (
            <FormControl>
                <InputLabel htmlFor="datePickerInput">{title}</InputLabel>
                <DateOutlinedInput
                    ref={ref}
                    id="datePickerInput"
                    label={title}
                    value={value}
                    autoComplete='off'
                    onClick={onClick}
                    endAdornment={
                        <InputAdornment position="end">
                            <DateRange />
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    });
    CustomInput.displayName = 'CustomInput';
    

    return (
        <Box
            sx={sx}
        >
            <DatePickerBox
                ref={calendar}
                locale={ko}
                dateFormat={dateFormat}
                monthsShown={range ? 2 : 1}
                shouldCloseOnSelect={false}
                disabledKeyboardNavigation={true}
                minDate={allowBeforeDay ? date : null}
                selected={startDate}
                autoComplete='off'
                timeInputLabel="시간 선택"
                showTimeInput={showTimeInput}
                onChange={onDateChange}
                {
                    ...(range && 
                        {
                            startDate: startDate,
                            endDate: endDate,
                            selectsRange: true,
                        }
                    )
                }
                customInput={<CustomInput/>}
                renderCustomHeader={({
                    monthDate,
                    customHeaderCount,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                    decreaseMonth,
                    increaseMonth,
                }) => 
                {
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                style={(() => 
                                {
                                    if(range)
                                    {
                                        return customHeaderCount === 1 ? { visibility: 'hidden' } : undefined;
                                    }
                                    else
                                    {
                                        return undefined;
                                    }
                                })()}
                            >
                                <NavigateBeforeIcon
                                    fontSize='small'
                                    sx={{
                                        color: '#000',
                                    }}
                                />
                            </IconButton>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }} color={'#000000'}>
                                {monthDate.toLocaleString('ko', {
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </Typography>
                            <IconButton
                                onClick={increaseMonth}
                                style={(() => 
                                {
                                    if(range)
                                    {
                                        return customHeaderCount === 0 ? { visibility: 'hidden' } : undefined;
                                    }
                                    else
                                    {
                                        return undefined;
                                    }
                                })()}
                                disabled={nextMonthButtonDisabled}
                            >
                                <NavigateNextIcon
                                    fontSize='small'
                                    sx={{
                                        color: '#000',
                                    }}
                                />
                            </IconButton>
                        </Box>
                    );
                }}
            >
            </DatePickerBox>
        </Box>
    );
};

const DatePickerBox = styled(DatePicker)`
    width: 300px;
    border: none;
    border-radius: 10px;
    text-align: center;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;

const DateOutlinedInput = styled(OutlinedInput)`
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;

export default DateRangePicker;