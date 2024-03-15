export interface IWecandeoThumbnailListProps {
    originalUrl: string;
    playtime: number;
    selected: boolean;
    seq: number;
    variantUrl: {size: number, url: string}
}

//위켄디오 데이터 테이블 타입
export interface IWecandeoTableDataProps {
    uid: number;
    distributor: number;
    distributorName: string;
    duration: string;
    fileName: string;
    thumbnailList: IWecandeoThumbnailListProps[];
    videoKey: string;
    encodeStatus : null | boolean;
}

//위켄디오 동영상 상세 정보 조회
export interface IWecandeoDetailProps {
    videoDetail: {
        errorInfo: {
            errorCode: 'None',
            errorMessage: string;
        };
        thumbnails: object[];
        videoInfo: {
            id: number,
            cid: null,
            access_key: string,
            org_access_key: string,
            title: string,
            series: null,
            author: null,
            content: null,
            tag: string,
            copyright: null,
            rate: null,
            cdate: string,
            duration: number,
            etc: null,
            thumbnail_url: string,
            thumbnail_sheet_url: string,
            encoding_success: 'N',
            v_width: number,
            v_height: number,
            v_framerate: number,
            filesize: number,
            drm_cid: string,
            opt: 'NONE',
            preloading: string,
        };
        videoUrl: string;
        viralClickUrl: null;
    };
}