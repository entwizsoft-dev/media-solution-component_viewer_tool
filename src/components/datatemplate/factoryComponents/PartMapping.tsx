import React from 'react';
//hook-form
import {
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
//type
import {
    ITemplateDataProps,
    ITemplateDBRowDataProps,
    ITotalElementProps,
} from '../interface/element.interface';
//components
import {
    Text,
    Number,
    TextArea,
    Checkbox,
    Radio,
    SelectList,
    Range,
    Switch,
    DatePicker,
    ImageUpload,
    VideoDataBind,
    UserDataBind,
    TemplateDataBind,
    IconSelect,
} from './part';


//파트에서 쓰이는 고정 props
export interface IPartComponentsProps {
    data: ITemplateDataProps;
    formRegister: UseFormRegister<any>;
    formSetValue: UseFormSetValue<any>;
    collectionData?: ITemplateDBRowDataProps & Record<string, unknown>;
}

//매핑 타입
type IMappingProps = Record<ITotalElementProps, React.FC<IPartComponentsProps>>;

//mapping render func
const componentMapping: Partial<IMappingProps> = {
    input: Text,
    number: Number,
    textarea: TextArea,
    checkbox: Checkbox,
    radio: Radio,
    switch: Switch,
    range: Range,
    select: SelectList,
    datepicker: DatePicker,
    imageUpload: ImageUpload,
    videoDataBind: VideoDataBind,
    userDataBind: UserDataBind,
    templateDataBind: TemplateDataBind,
    iconSelect : IconSelect,
};

interface IPartMappingProps extends IPartComponentsProps {
    type: ITotalElementProps;
}

const PartMapping: React.FC<IPartMappingProps> = (props) => 
{
    const {
        type,
        ...restProps
    } = props;

    const Component = componentMapping[type];
    
    if(!Component)
    {
        return <div>null</div>;
    }

    return (
        <Component
            {...restProps}
        />
    );
};

export default PartMapping;