import moment from 'moment';
//type
import {
    ITotalElementListProps,
    ITemplateDataProps,
} from '../interface/element.interface';

export type IElDataCovProps = (el: ITotalElementListProps) => ITemplateDataProps;

export const elDataConversion: IElDataCovProps = (el) => 
{
    const {
        type,
        label,
        dataType,
        dataTypeList,
        option,
    } = el;

    const json = {
        type,
        name: label, //template에서 쓰이는 이름과 겹치므로 name으로 key name 변경
        key: 'item' + '_' + moment().valueOf(),
        dataType,
        dataTypeList,
        option,
        unique: false,
        // unique: false, //이거 왜 있는지 잘 몰라서 주석 침 (백엔드와 소통 필요)
        // option: d.defaultValue ? d.defaultValue : {},
    };

    return json;
};