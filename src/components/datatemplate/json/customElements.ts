//type
import {
    ICustomElementListProps,
} from '../interface/element.interface';

const customElements: ICustomElementListProps[] = [
    {
        type: 'datepicker',
        label: 'Date Picker',
        icon: 'CalendarMonthIcon',
        dataType: 'object',
        dataTypeList: [
            'object',
        ],
        option: [
            {
                components: 'text',
                key: 'dateformat',
                label: '날짜 포맷',
                value: 'yyyy-MM-DD',
            },
            {
                components: 'datepicker',
                key: 'startdate',
                label: '시작 날짜',
            },
            {
                components: 'switch',
                key: 'range',
                label: '종료일',
            },
            // {
            //     components: 'switch',
            //     key: 'showtieminput',
            //     label: '시간 포함',
            // },
            {
                components: 'switch',
                key: 'allowBeforeDay',
                label: '과거 날짜 선택 불가',
            },
        ],
    },
    {
        type: 'imageUpload',
        label: 'Image Upload',
        icon: 'UploadFileIcon',
        dataType: 'array',
        dataTypeList: [
            'array',
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
                key: 'fullWidth',
                label: '전체 너비',
            },
            [
                {
                    components: 'number',
                    key: 'width',
                    label: '넓이',
                    value: 400,
                },
                {
                    components: 'number',
                    key: 'hiehgt',
                    label: '높이',
                    value: 225,
                },
            ],
            {
                components: 'rangeslider',
                key: 'maxUploadSize',
                label: '최대 업로드 용량',
                value: 5,
                defaultProps: {
                    min: 1,
                    max: 10,
                    step: 1,
                    marks: true,
                    valueLabelFormat: 'MB',
                },
            },
            {
                components: 'radio',
                key: 'objectFit',
                label: '이미지 비율',
                value: [
                    {
                        label: '비율 유지',
                        value: 'contain',
                        checked: true,
                    },
                    {
                        label: '꽉 채움',
                        value: 'cover',
                    },
                    {
                        label: '전체 채움',
                        value: 'fill',
                    },
                ],
            },
            {
                components: 'switch',
                key: 'preview',
                label: '이미지 미리보기',
                value: true,
            },
            {
                components: 'switch',
                key: 'dragdrop',
                label: '드래그 앤 드롭 업로드 여부',
                value: true,
            },
            {
                components: 'switch',
                key: 'multiple',
                label: '다중 업로드',
            },
        ],
    },
    //개발 중
    // {
    //     type: 'fileUpload',
    //     label: 'File Upload',
    //     icon: 'UploadFileIcon',
    //     dataType: 'string',
    //     dataTypeList: [
    //         'string',
    //     ],
    // },
    {
        type: 'iconSelect',
        label: 'icon select',
        icon: 'CheckBoxIcon',
        dataType: 'string',
        dataTypeList: [
            'string',
        ],
    },
];

export default customElements;