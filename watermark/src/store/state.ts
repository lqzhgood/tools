import { fontFamilyOptions } from '@/lib/const';
import type { TextForm } from '@/lib/Watermark';

export type Store = {
    watermark: any | undefined;

    width: number | undefined;
    height: number | undefined;
    aspectRatio: number;
    isAspectLocked: boolean;
} & TextForm;

export const initialState: Store = {
    watermark: undefined,

    width: undefined,
    height: undefined,
    /** 原始宽高比 */
    aspectRatio: 16 / 9,
    /** 按比例缩放 */
    isAspectLocked: true,

    // 水印
    text: '仅限XX使用,有效期' + new Date().toLocaleDateString(),
    /** 字体 */
    fontFamily: fontFamilyOptions[0].value,
    /** 旋转角度 */
    rotate: 45,
    /** 字体大小 */
    fontSize: 24,
    /**文字颜色 */
    color: '#ffffff',
    /** 透明度 */
    opacity: 0.3,
    /** 间距 */
    rowSpacing: 1.5,
    colSpacing: 1.1,
};
