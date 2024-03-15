import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface ISelectBoxListProps {
    itemList : any
    limitTags? : number
    label? : string
    multiple? : boolean
    placeholder? : string
    labelCallback : (option: any) => string
    disabledCallback? : (option: any) => boolean
    callbackData? : (data : any) => void
}
const SelectBoxList:React.FC<ISelectBoxListProps> = (props) =>
{
    const {
        itemList, 
        limitTags = 5, // 박스에서 보여줄 아이템 개수
        label = '셀렉트 박스', // 박스 레이블 네임
        multiple = true, // 다중 선택 유무
        placeholder = '아이템을 선택 하세요',
        labelCallback, // 렌더할 아이템 지정
        disabledCallback, // 비활성화 할 아이템 지정
        callbackData,
    } = props;

    const optionChangeHandler = (event: React.SyntheticEvent<Element, Event>, value: any) => 
    {
        if(typeof callbackData === 'function')
        {
            callbackData(value);
        }
    };

    return (
        <Autocomplete
            multiple={multiple}
            limitTags={limitTags}
            options={itemList}
            getOptionDisabled={disabledCallback}
            getOptionLabel={labelCallback}
            onChange={optionChangeHandler}
            renderInput={(params) => 
            {
                return (
                    <TextField {...params} label={label} placeholder={placeholder} />
                );
            }}
        />
    );
};


export default SelectBoxList;