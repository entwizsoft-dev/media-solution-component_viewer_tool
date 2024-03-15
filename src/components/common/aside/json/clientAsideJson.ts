//type
import {
    IAsideDataRowsProps,
} from '@/interfaces/aside.interface';

/*
    ACL = 접근 권한 레벨
    0 = devleoper
    1 = owner
    2 = admin
    3 = maintain
*/
const clientAsideJson: IAsideDataRowsProps[] = [
    {
        label: 'Default',
        rewrite: true,
        remove: false,
        setting: false,
        list: [
            {
                label: '데이터 템플릿',
                icon: 'PostAddIcon',
                link: '/datatemplate/control/list',
                focus: '/datatemplate/control/list',
                ACL: 0,
                rewrite: false,
                remove: false,
                setting: false,
            },
            {
                label: '화면 구성',
                icon: 'WebIcon',
                link: '/layout/custom',
                focus: '/layout/custom',
                ACL: 1,
                rewrite: false,
                remove: false,
                setting: false,
            },
            {
                label: '영상 관리',
                icon: 'VideoLibraryIcon',
                link: '/management/videoUpload/list',
                focus: '/videoUpload',
                ACL: 2,
                rewrite: true,
                remove: false,
                setting: false,
            },
            {
                label: '유통사 관리',
                icon: 'AccountCircleIcon',
                link: '/management/distributor/list',
                focus: '/distributor',
                ACL: 1,
                rewrite: true,
                remove: false,
                setting: false,
            },
            {
                label: '회원 관리',
                icon: 'AccountBoxIcon',
                link: '/management/user/list',
                focus: '/user',
                ACL: 1,
                rewrite: true,
                remove: false,
                setting: false,
            },
            {
                label: '매출 관리',
                icon: 'CreditCardIcon',
                link: '/management/order/list',
                focus: '/order',
                ACL: 1,
                rewrite: true,
                remove: false,
                setting: false,
            },
            {
                label: '정산 관리',
                icon: 'ReceiptLongIcon',
                link: '/management/receipt/list',
                focus: '/receipt',
                ACL: 1,
                rewrite: true,
                remove: false,
                setting: false,
            },
        ],
    },
];

export default clientAsideJson;