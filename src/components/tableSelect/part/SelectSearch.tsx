
import React from 'react';
//types
import {
    ISearchOptionsProps,
    ICallbackEventParamaterProps,
} from '@/interfaces/table.interface';
//icons
import SearchIcon from '@mui/icons-material/Search';
//hook-form
import { useForm, Controller } from 'react-hook-form';
//components
import {
    Box,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    TextField,
    IconButton,
    InputAdornment,
    Select,
    RadioGroup,
    FormGroup,
    FormLabel,
    FormControlLabel,
    Radio,
    Checkbox,
} from '@mui/material';
import DateRangePicker from '@/components/input/DateRangePicker';
import moment from 'moment';

export interface ISearchFormProps {
    searchvalue: string;
    [key: string]: any;
}

interface ISelectSearchProps {
    perPage?: number;
    searchPlaceHolder?: string;
    searchOptions?: ISearchOptionsProps;
    callbackSearch?: (data: ICallbackEventParamaterProps) => void;
}

const SelectSearch: React.FC<ISelectSearchProps> = (props) => 
{
    const {
        perPage = 10,
        searchPlaceHolder,
        searchOptions,
        callbackSearch,
    } = props;
    //hook-form
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
    } = useForm<ISearchFormProps>();
    const fieldWatch = watch();

    //검색 submit event
    const searchEvent = (form: ISearchFormProps) => 
    {
        if(typeof callbackSearch === 'function')
        {
            const json = {
                page: 1,
                perPage: perPage,
                ...form,
            };

            callbackSearch(json);
        }
    };

    const handleKeydownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => 
    {
        //엔터키 트리거
        if (e.key === 'Enter') 
        {
            searchEvent(fieldWatch);
        }
    };

    return (
        <Box
            sx={{
                py: 3,
                px: 2.5,
            }}
        >
            <Grid
                container
            >
                {
                    searchOptions?.searchFilterOptions &&
                        searchOptions.searchFilterOptions.map((d,i) => 
                        {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    pb={2}
                                    key={i}
                                >
                                    {
                                        (() => 
                                        {
                                            switch (d.type) 
                                            {
                                            case 'radio':
                                                const radioData = d.option;
                                                return (
                                                    <FormControl>
                                                        <FormLabel>{radioData.label}</FormLabel>
                                                        <Controller
                                                            name={radioData.name}
                                                            defaultValue={
                                                                radioData.defaultValue ?
                                                                    radioData.defaultValue
                                                                    :
                                                                    Array.isArray(radioData.data) && radioData.data[0].value ?
                                                                        radioData.data[0].value
                                                                        :
                                                                        ''
                                                            }
                                                            control={control}
                                                            render={({field}) => 
                                                            {
                                                                return (
                                                                    <RadioGroup
                                                                        row
                                                                        {...field}
                                                                    >
                                                                        {
                                                                            Array.isArray(radioData.data) &&
                                                                            radioData.data.map((dd,ii) => 
                                                                            {
                                                                                return (
                                                                                    <FormControlLabel
                                                                                        key={ii}
                                                                                        value={dd.value}
                                                                                        label={dd.label}
                                                                                        control={<Radio />}
                                                                                    />
                                                                                );
                                                                            })
                                                                        }
                                                                    </RadioGroup>
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                );
                                            case 'checkbox':
                                                const checkboxData = d.option;
                                                return (
                                                    <FormControl>
                                                        <FormLabel>{checkboxData.label}</FormLabel>
                                                        <FormGroup
                                                            row
                                                        >
                                                            {
                                                                Array.isArray(checkboxData.data) &&
                                                                checkboxData.data.map((dd,ii) =>
                                                                {
                                                                    const checkItemData = dd;
                                                                    return (
                                                                        <Controller
                                                                            key={ii}
                                                                            name={`${checkboxData.name}[${ii}]` + '.' + checkItemData.value}
                                                                            control={control}
                                                                            defaultValue={
                                                                                checkItemData.defaultValue ? 
                                                                                    checkItemData.defaultValue
                                                                                    :
                                                                                    false
                                                                            }
                                                                            render={({ field }) => 
                                                                            {
                                                                                return (
                                                                                    <FormControlLabel
                                                                                        control={
                                                                                            <Checkbox
                                                                                                {...field}
                                                                                                defaultChecked={
                                                                                                    checkItemData.defaultValue ? 
                                                                                                        checkItemData.defaultValue
                                                                                                        :
                                                                                                        false
                                                                                                }
                                                                                            />
                                                                                        }
                                                                                        label={checkItemData.label}
                                                                                    />
                                                                                );
                                                                            }}
                                                                        />
                                                                    );
                                                                })
                                                            }
                                                        </FormGroup>
                                                    </FormControl>
                                                );
                                            case 'select':
                                                const selectData = d.option;
                                                return (
                                                    <FormControl
                                                        sx={{minWidth: 180}}
                                                    >
                                                        <InputLabel>{selectData.label}</InputLabel>
                                                        <Controller
                                                            name={selectData.name}
                                                            control={control}
                                                            defaultValue={
                                                                selectData.defaultValue ?
                                                                    selectData.defaultValue
                                                                    : 
                                                                    ''
                                                            }
                                                            render={({ field }) => 
                                                            {
                                                                return (
                                                                    <Select
                                                                        {...field}
                                                                        label="Gender"
                                                                        autoWidth
                                                                    >
                                                                        {
                                                                            Array.isArray(selectData.data) &&
                                                                            selectData.data.map((dd,ii) => 
                                                                            {
                                                                                return (
                                                                                    <MenuItem
                                                                                        key={ii}
                                                                                        value={dd.value}
                                                                                    >
                                                                                        {dd.label}
                                                                                    </MenuItem>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Select>
                                                                );
                                                            }}
                                                        />
                                                    </FormControl>
                                                );
                                            case 'datepicker':
                                                return (
                                                    <DateRangePicker
                                                        title={d.option.label}
                                                        callbackDate={(date:any) => 
                                                        {
                                                            const convDate: {
                                                                start?: string,
                                                                end?: string
                                                            } = {};
                                                            
                                                            const startDate = moment(date.start).format('YYYY-MM-DD 00:00:00');
                                                            const endDate = moment(date.end).format('YYYY-MM-DD 23:59:59');
                                                            
                                                            convDate.start = startDate;
                                                            if(endDate !== 'Invalid date')
                                                            {
                                                                convDate.end = endDate;
                                                            }

                                                            setValue(d.option.name, convDate);
                                                        }}
                                                    />
                                                );
                                            default: null;
                                                break;
                                            }
                                        })()
                                    }
                                </Grid>
                            );
                        })
                }
                {
                    (searchOptions?.searchSelectOptions) &&
                        <Grid
                            item
                            xs={2}
                            pr={1}
                        >
                            <FormControl
                                fullWidth
                            >
                                <InputLabel
                                    id="searchKeySelect"
                                >
                                    검색 타입
                                </InputLabel>
                                <Controller
                                    name='searchKey'
                                    control={control}
                                    defaultValue={searchOptions.searchSelectOptions[0].value}
                                    render={({field}) => 
                                    {
                                        return (
                                            <Select
                                                labelId="searchKeySelect"
                                                label="검색 타입"
                                                {...field}
                                            >
                                                {
                                                    searchOptions.searchSelectOptions &&
                                                        searchOptions.searchSelectOptions.map((d,i) => 
                                                        {
                                                            return (
                                                                <MenuItem
                                                                    key={i}
                                                                    value={d.value}
                                                                >
                                                                    {d.label}
                                                                </MenuItem>
                                                            );
                                                        })
                                                }
                                            </Select>
                                        );
                                    }}
                                />
                            </FormControl>
                        </Grid>
                }
                <Grid
                    item
                    xs={((searchOptions?.searchSelectOptions) ? 10 : 12)}
                >
                    <TextField
                        type="text"
                        id="outlined-search"
                        placeholder={typeof searchPlaceHolder === 'string' ? searchPlaceHolder : '검색어를 입력해주세요.'}
                        fullWidth
                        {...register('searchvalue')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                >
                                    <IconButton
                                        type='button'
                                        onClick={handleSubmit(searchEvent)}
                                    >
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onKeyDown={handleKeydownEvent}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};


export default SelectSearch;