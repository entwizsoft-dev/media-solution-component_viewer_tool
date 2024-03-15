export interface IProfileImageSet {
    logoImage: string | null; //영상 타이틀 로고 이미지
    brandLogoImage: string | null; //부가 이미지
}

//유통사 계정 데이터
export interface IDistributorAccountProps {
    uid: number;
    name: string;
    authority: 0 | 1 | 2;
    roundLogoImageUrl: string | null;
    imageSet: IProfileImageSet | null;
    distributorId: string;
}

export interface IDistributorDataProps {
    uid:number;
    name:string;
    distributorId:string;
    roundLogoImageUrl:string | null;
}