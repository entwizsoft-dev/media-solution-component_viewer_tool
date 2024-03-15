//type
import {
    IDataBindingElementListProps,
} from '../interface/element.interface';

const dataBindingElements: IDataBindingElementListProps[] = [
    {
        type: 'videoDataBind',
        label: 'Video',
        icon: 'PlayCircleIcon',
        dataType: 'SQL',
        dataTypeList: [
            'SQL',
        ],
        option: [
            {
                components: 'switch',
                key: 'multiple',
                label: '다중 선택',
            },
            {
                components: 'selection',
                key: 'views',
                label: '테이블 컬럼 표시 옵션',
                value: [
                    {
                        label: 'uid',
                        value: 'uid',
                    },
                    {
                        label: 'distributor',
                        value: 'distributor',
                    },
                    {
                        label: 'distributorName',
                        value: 'distributorName',
                    },
                    {
                        label: 'duration',
                        value: 'duration',
                    },
                    {
                        label: 'fileName',
                        value: 'fileName',
                        checked: true,
                    },
                    {
                        label: 'videoKey',
                        value: 'videoKey',
                    },
                ],
                defaultProps: {
                    multiple: true,
                    disabled: true,
                },
            },
        ],
    },
    {
        type: 'userDataBind',
        label: 'User',
        icon: 'PersonIcon',
        dataType: 'SQL',
        dataTypeList: [
            'SQL',
        ],
        option: [
            {
                components: 'switch',
                key: 'multiple',
                label: '다중 선택',
            },
            {
                components: 'selection',
                key: 'views',
                label: '테이블 컬럼 표시 옵션',
                value: [
                    {
                        label: 'uid',
                        value: 'uid',
                    },
                    {
                        label: 'nickname',
                        value: 'nickname',
                        checked: true,
                    },
                    {
                        label: 'email',
                        value: 'email',
                    },
                    {
                        label: 'createdAt',
                        value: 'createdAt',
                    },
                    {
                        label: 'blocked',
                        value: 'blocked',
                    },
                ],
                defaultProps: {
                    multiple: true,
                    disabled: true,
                },
            },
        ],
    },
    {
        type: 'templateDataBind',
        label: 'Data Template',
        icon: 'ExtensionIcon',
        dataType: 'noSQL',
        dataTypeList: [
            'noSQL',
        ],
        option: [
            {
                components: 'switch',
                key: 'multiple',
                label: '다중 선택',
            },
            {
                components: 'templateselectbox',
                key: 'selectbox',
                label: '데이터 템플릿 리스트',
                bind: {
                    key: 'views',
                    action: 'datatemplateUpdate',
                },
            },
            {
                components: 'selection',
                key: 'views',
                label: '테이블 컬럼 표시 옵션',
                defaultProps: {
                    multiple: true,
                    disabled: true,
                },
            },
        ],
    },
];

export default dataBindingElements;