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

const masterAsideJson: IAsideDataRowsProps[] = [
    {
        label: 'SYSTEM',
        list: [
            {
                label: 'General',
                link: '/setting/general',
                focus: '/setting/general',
                ACL: 1,
            },
            {
                label: 'Aside Setting',
                link: '/setting/aside',
                focus: '/setting/aside',
                ACL: 1,
            },
        ],
    },
];

export default masterAsideJson;