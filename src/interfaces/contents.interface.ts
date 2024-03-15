//심의 등급 타입
type IContentDescriptors = 'T' | 'S' | 'V' | 'D' | 'H' | 'DU' | 'ID'

//콘텐츠 데이터 타입
export interface IContentsDataProps {
    uid: number;
    content: IContentsChildDataProps;
    isExposed?: boolean;
}

//콘텐츠 실 데이터 타입
export interface IContentsChildDataProps {
    contentName?: string;
    type: 'video' | 'series' | 'brand' | 'board';
    title?: string;
    subtitle?: string;
    description?: string;
    price?: number;
    category?: string[];
    rating?: 'all' | '12' | '15' | '18';
    cast?: string[];
    distributor?: { name: string, roundLogoImageUrl: string | null, uid: number };
    tag?: string[];
    bannerImage?: string;
    bannerImageMob?: string;
    backgroundImage?: string;
    backgroundImageMob?: string;
    verticalImage?: string;
    horizonalImage?: string;
    logoImage?: string;
    brandLogoImage?: string;
    contentDescriptors?: IContentDescriptors[];
    classificationNumber?: string;
    duration?: string;
    videoKey?: string;
    childContents?: IContentsDataProps[];
    expiration?: number;
    maxViews?: number;
    board?: { uid: number, boardName: string };
    releaseDate?: string;
    reservExposure?: string;
    reservHide?: string;
    adminReviewApprove?: boolean;
    distributorImageSetBind?: boolean;
    superAdminComment?: string;
}