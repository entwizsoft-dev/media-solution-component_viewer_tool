import {
    Color,
} from '@mui/material';
import { Palette as MuiPalette, PaletteOptions as MuiPaletteOptions  } from '@mui/material/styles';

// 공통 타입 정의
export interface ICustomPaletteOptions {
    origin?: string;
    sub?: string;
    hover?: string;
}

type PaletteColorType = MuiPalette['primary'];
type PaletteColorOptionsType = MuiPaletteOptions['primary'];

/* 
    커스텀 컬러 추가 후 dark.ts , light.ts에 추가 하지 않으면
    theme.ts palette 옵션에서 타입에러 발생하니 추가 시킬 것
*/
type CustomPaletteKeys = 
    'backgroundTheme' |
    'typoColor' |
    'selectedTheme' |
    'dividerTheme' |
    'circularTheme' |
    'borderColor' |
    'svgColor' |
    'btnColor' |
    'tableColor' |
    'shadowColor' |
    'overlayColor' |
    'switchColor' |
    'switchBackgroundColor' |
    'loadingCircularColor' |
    'dragButtonColor' |
    'disableColor' |
    'layoutEmptyBoarder' |
    'scrollbarTrack' |
    'scrollbarThumb' |
    'layoutEmptyElementBg' |
    'layoutSettingHeadBg' |
    'dataTemplateFilterRowBg' |
    'dataTemplateFilterSelectBg'
    ;

export type CustomPaletteProps = {
    [K in CustomPaletteKeys]: PaletteColorType;
};

export type CustomPaletteOptionsProps = {
    [K in CustomPaletteKeys]: PaletteColorOptionsType;
};

// dark, light Palette Type
export type CustomPaletteType = CustomPaletteOptionsProps & MuiPaletteOptions;

//
export type ICustomColorTypes = Color | ICustomPaletteOptions;