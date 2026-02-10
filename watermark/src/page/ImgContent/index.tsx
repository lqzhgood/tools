import Watermark from '@/lib/Watermark';
import { useActions, useStore } from '@/store';
import {
    useDeepCompareEffect,
    useDrop,
    useEventListener,
    useMount,
    useUpdateEffect,
} from 'ahooks';
import { useMemo, useRef, useState } from 'react';
import { pick } from 'lodash-es';
import { ImageUp } from 'lucide-react';
import { getImgByDrop, getImgByPaste, loadImg } from './utils';
import clx from 'classnames';

const ImgContent = () => {
    const [imgFile, setImgFile] = useState<File | null>();

    const watermark = useRef<InstanceType<typeof Watermark> | null>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const actions = useActions();
    const store = useStore();

    const watermarkForm = useMemo(
        () =>
            pick(store, [
                'width',
                'height',
                'text',
                'fontFamily',
                'fontSize',
                'rotate',
                'color',
                'rowSpacing',
                'colSpacing',
                'opacity',
            ]),
        [store],
    );

    useDeepCompareEffect(() => {
        watermark.current?.setOptions(watermarkForm);
    }, [watermarkForm]);

    useUpdateEffect(() => {
        loadImg(imgFile)
            .then(img => {
                actions({
                    type: 'initCanvas',
                    payload: {
                        watermark: watermark.current!,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    },
                });
                watermark.current?.setImg(img);
            })
            .catch((error: any) => {
                alert(`加载图片失败: ${error?.message}`);
            });
    }, [imgFile]);

    useMount(() => {
        watermark.current = new Watermark(canvas.current!);
    });

    useEventListener('paste', event => {
        const items = (event.clipboardData && event.clipboardData.items) || [];
        const img = getImgByPaste(items);
        setImgFile(img);
    });

    const [isHovering, setIsHovering] = useState(false);

    const dropRef = useRef(null);

    useDrop(dropRef, {
        onFiles: files => {
            const img = getImgByDrop(files);
            setImgFile(img);
            setIsHovering(false);
        },
        onDragEnter: () => setIsHovering(true),
        onDragLeave: () => setIsHovering(false),
    });

    return (
        <div
            className='bg-muted mx-auto h-[100%] w-full rounded-xl flex items-center justify-center'
            style={
                isHovering
                    ? {
                          outline: '4px dashed #999',
                      }
                    : undefined
            }
            ref={dropRef}
        >
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
                        e.target.value = ''; // 清空以允许重复选择
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
