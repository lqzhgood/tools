import Watermark from '@/lib/Watermark';
import type { Store } from './state';

export type Action =
    | {
          type: 'initCanvas';
          payload: {
              watermark: InstanceType<typeof Watermark>;
              width: number;
              height: number;
          };
      }
    | { type: 'toggleAspectLock' }
    | {
          type: 'setWidthHeight';
          payload: { width?: number; height?: number };
      }
    | {
          type: 'setWater';
          payload: {
              text?: string;
              rotate?: number;
              fontSize?: number;
              fontFamily?: string;
              color?: string;
              rowSpacing?: number;
              colSpacing?: number;
              opacity?: number;
          };
      };

export function reducer(draft: Store, action: Action) {
    const { type } = action;
    switch (type) {
        case 'initCanvas': {
            const { width, height, watermark } = action.payload;
            draft.watermark = watermark;
            draft.width = width;
            draft.height = height;
            draft.aspectRatio = width / height;
            return;
        }
        case 'toggleAspectLock': {
            draft.isAspectLocked = !draft.isAspectLocked;
            return;
        }
        case 'setWidthHeight': {
            const { isAspectLocked } = draft;
            const { width, height } = action.payload;
            if (width) {
                draft.width = width;
                if (isAspectLocked) {
                    draft.height = Math.round(width / draft.aspectRatio);
                }
            }
            if (height) {
                draft.height = height;
                if (isAspectLocked) {
                    draft.width = Math.round(height * draft.aspectRatio);
                }
            }
            return;
        }
        case 'setWater': {
            Object.assign(draft, action.payload);
            return;
        }
    }
}
