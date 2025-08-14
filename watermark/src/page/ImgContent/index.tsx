import Watermark from '@/lib/Watermark';
import { useActions, useStore } from '@/store';
import {
    useDeepCompareEffect,
    useEventListener,
    useMount,
    useUpdateEffect,
} from 'ahooks';
import { useRef, useState } from 'react';
import { pick } from 'lodash-es';
import { ImageUp } from 'lucide-react';
import { loadImg } from './utils';
import clx from 'classnames';

const ImgContent = () => {
    const [imgFile, setImgFile] = useState<File | null>();

    const watermark = useRef<InstanceType<typeof Watermark> | null>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const actions = useActions();
    const store = useStore();

    const watermarkForm = pick(store, [
        'text',
        'fontFamily',
        'fontSize',
        'rotate',
        'color',
        'rowSpacing',
        'colSpacing',
        'opacity',
    ]);

    useDeepCompareEffect(() => {
        watermark.current?.draw(watermarkForm);
    }, [watermarkForm]);

    useUpdateEffect(() => {
        loadImg(imgFile).then(img => {
            actions({
                type: 'initCanvas',
                payload: {
                    watermark: watermark.current!,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                },
            });
            watermark.current?.setImg(img);
            watermark.current?.draw(watermarkForm);
        });
    }, [imgFile]);

    useMount(() => {
        watermark.current = new Watermark(canvas.current!);
    });

    useEventListener('paste', event => {
        const items = (event.clipboardData && event.clipboardData.items) || [];
        let file = null;
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
                setImgFile(file);
                break;
            }
        }
    });

    return (
        <div>
            <label>
                <ImageUp
                    className={clx([
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-30 h-30 text-gray-600 cursor-pointer',
                        { hidden: imgFile },
                    ])}
                />
                <input
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={e => {
                        const file = e.target?.files?.[0];
                        setImgFile(file);
                    }}
                />
                <canvas
                    ref={canvas}
                    className={clx([
                        'max-w-full max-h-full relative z-1',
                        { hidden: !imgFile },
                    ])}
                ></canvas>
            </label>
        </div>
    );
};

export default ImgContent;
