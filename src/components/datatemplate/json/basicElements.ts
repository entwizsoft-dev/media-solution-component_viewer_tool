//type
import {
    IBasicElementListProps,
} from '../interface/element.interface';

const basicElements: IBasicElementListProps[] = [
    {
        type: 'input',
        label: 'Text',
        icon: 'TitleIcon',
        dataType: 'string',
        dataTypeList: [
            'string',
            'date',
        ],
        option: [
            {
                components: 'switch',
                key: 'fullWidth',
                label: '전체 너비',
            },
            {
                components: 'text',
                key: 'defaultValue',
                label: '기본 값',
            },
            {
                components: 'text',
                key: 'placeholder',
                label: 'Place Holder',
            },
            {
                components: 'text',
                key: 'helperText',
                label: '도움말',
            },
            {
                components: 'number',
                key: 'maxLength',
                label: '최대 글자 수',
            },
        ],
    },
    {
        type: 'number',
        label: 'Number',
        icon: 'LooksOneIcon',
        dataType: 'integer',
        dataTypeList: [
            'integer',
        ],
        option: [
            {
                components: 'switch',
                key: 'fullWidth',
                label: '전체 너비',
            },
            [
                {
                    components: 'text',
                    key: 'startAdornment',
                    label: '접두사',
                },
                {
                    components: 'text',
                    key: 'endAdornment',
                    label: '접미사',
                },
            ],
            {
                components: 'text',
                key: 'defaultValue',
                label: '기본 값',
            },
            [
                {
                    components: 'number',
                    key: 'min',
                    label: '최소값',
                },
                {
                    components: 'number',
                    key: 'max',
                    label: '최대값',
                },
            ],
            {
                components: 'text',
                key: 'helperText',
                label: '도움말',
            },
        ],
    },
    {
        type: 'textarea',
        label: 'TextArea',
        icon: 'TextFieldsIcon',
        dataType: 'string',
        dataTypeList: [
            'string',
            'integer',
        ],
        option: [
            {
                components: 'switch',
                key: 'fullWidth',
                label: '전체 너비',
            },
            {
                components: 'text',
                key: 'defaultValue',
                label: '기본 값',
            },
            {
                components: 'number',
                key: 'maxLength',
                label: '최대 글자 수',
            },
            [
                {
                    components: 'number',
                    key: 'minRows',
                    label: '최소 Rows',
                },
                {
                    components: 'number',
                    key: 'maxRows',
                    label: '최대 Rows',
                },
            ],
            {
                components: 'text',
                key: 'placeholder',
                label: 'Place Holder',
            },
            {
                components: 'text',
                key: 'helperText',
                label: '도움말',
            },
        ],
    },
    {
        type: 'checkbox',
        label: 'CheckBox',
        icon: 'CheckBoxIcon',
        dataType: 'array',
        dataTypeList: [
            'array',
            'object',
        ],
        option: [
            {
                components: 'switch',
                key: 'row',
                label: '한줄로 표시',
            },
            {
                components: 'selection',
                key: 'selection',
                label: '체크박스 옵션',
                value: [
                    {
                        label: 'item1',
                        checked: true,
                    },
                    {
                        label: 'item2',
                    },
                ],
                defaultProps: {
                    useCreate: true,
                    useRemove: true,
                    useValues: true,
                    multiple: true,
                },
            },
        ],
    },
    {
        type: 'radio',
        label: 'Radio',
        icon: 'RadioButtonCheckedIcon',
        dataType: 'string',
        dataTypeList: [
            'string',
            'integer',
            'date',
            'boolean',
            'object',
        ],
        option: [
            {
                components: 'switch',
                key: 'row',
                label: '한줄로 표시',
            },
            {
                components: 'selection',
                key: 'selection',
                label: '라디오 버튼 옵션',
                value: [
                    {
                        label: 'item1',
                        value: '0',
                        checked: true,
                    },
                    {
                        label: 'item2',
                        value: '1',
                    },
                ],
                defaultProps: {
                    useCreate: true,
                    useRemove: true,
                    useValues: true,
                },
            },
        ],
    },
    {
        type: 'switch',
        label: 'Switch',
        icon: 'ToggleOffIcon',
        dataType: 'boolean',
        dataTypeList: [
            'integer',
            'boolean',
        ],
        option: [
            {
                components: 'switch',
                key: 'defaultChecked',
                label: '기본 체크 여부',
            },
            {
                components: 'text',
                key: 'switchLabel',
                label: '부제목',
            },
            {
                components: 'text',
                key: 'helperText',
                label: '도움말',
            },
        ],
    },
    {
        type: 'range',
        label: 'Range Slider',
        icon: 'LinearScaleIcon',
        dataType: 'integer',
        dataTypeList: [
            'string',
            'integer',
        ],
        option: [
            {
                components: 'number',
                key: 'defaultValue',
                label: '기본 값',
            },
            [
                {
                    components: 'number',
                    key: 'min',
                    label: '최소값',
                },
                {
                    components: 'number',
                    key: 'max',
                    label: '최대값',
                },
            ],
            {
                components: 'number',
                key: 'step',
                label: '스텝 당 증가 값',
            },
        ],
    },
    {
        type: 'select',
        label: 'Select List',
        icon: 'ListAltIcon',
        dataType: 'string',
        dataTypeList: [
            'string',
        ],
        option: [
            {
                components: 'text',
                key: 'placeholder',
                label: 'Place Holder',
            },
            {
                components: 'text',
                key: 'helperText',
                label: '도움말',
            },
            {
                components: 'switch',
                key: 'multiple',
                label: '다중 선택',
                bind: {
                    key: 'selection',
                    action: 'selectionMultipleTrigger',
                },
            },
            {
                components: 'selection',
                key: 'selection',
                label: '리스트 옵션',
                value: [
                    {
                        label: 'item1',
                        value: '0',
                        checked: true,
                    },
                    {
                        label: 'item2',
                        value: '1',
                    },
                ],
                defaultProps: {
                    useCreate: true,
                    useRemove: true,
                    useValues: true,
                },
            },
        ],
    },
];

export default basicElements;
