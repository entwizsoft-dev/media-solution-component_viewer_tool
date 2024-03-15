import { ITableBaseDataProps } from './table.interface';

export interface IReportListProps {
    uid: number
    userUid : number;
    createdAt : string
    nickname : string
    profileImage : string
    reportReason : number;
    reportReasonDetail : string
    reportedTypeUid: number;
}

export interface IReportListDataProps extends Omit<ITableBaseDataProps, 'data'> {
    data: IReportListProps[];
}

export interface IUserProfileProps {
    admin : boolean
    nickname : string
    profileImage? : string
    userUid : number;
    isBlocked : boolean;
}

export interface IReportContentProps {
    boardName : string
    boardUid : number
    comment : string
    isDeleted : 0 | 1
    isBlocked : 0 | 1
    title : string
    userUid : number
    body : string
}
export interface IReportsResultProps {
    reportList : IReportListDataProps
    userProfile : IUserProfileProps
    reportedContent : IReportContentProps
}
