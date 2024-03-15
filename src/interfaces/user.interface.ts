//유저 리스트 데이터 타입
export interface IUserListDataProps {
    uid?: number;
    name?: string;
    nickname?: string;
    email?: string;
    createdAt?: string;
    blocked?: number;
}

//유저 상세 데이터 타입
export interface IUserDetailDataProps {
    uid: number,
    name: string,
    gender: 'M' | 'F' | null,
    birth: string | null,
    adultCert: number,
    email: string,
    phone: string,
    nickname: string,
    profileImage?: string | null,
    hasPass: number | null,
    emailAuth: number | null,
    blocked: number,
    createdAt: Date,
    point: string,
}