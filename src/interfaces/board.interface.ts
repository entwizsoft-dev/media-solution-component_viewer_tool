import { IUserListDataProps } from './user.interface';

//게시판 상세 페이지 데이터 타입
export interface IBoardDataProps {
    uid: number;
    boardName: string;
    adminList: IUserListDataProps[];
}