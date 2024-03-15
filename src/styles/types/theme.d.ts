import { CustomPaletteOptionsProps, CustomPaletteProps, ICustomPaletteOptions } from './theme.interface';

declare module '@mui/material/styles' {
    interface Palette extends CustomPaletteProps {}
    interface PaletteOptions extends CustomPaletteOptionsProps {}
    interface PaletteColor extends ICustomPaletteOptions {}
    interface SimplePaletteColorOptions extends ICustomPaletteOptions {}
}
