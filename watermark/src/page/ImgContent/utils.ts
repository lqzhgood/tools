import heic2any from 'heic2any';

export async function loadImg(
    file: File | null | undefined,
): Promise<HTMLImageElement> {
    if (!file) {
        throw new Error('No file provided');
    }

    const isHEIC =
        file.type === 'image/heic' ||
        file.type === 'image/heif' ||
        file.name.toLowerCase().endsWith('.heic') ||
        file.name.toLowerCase().endsWith('.heif');

    // 转换 HEIC 格式
    let blob: Blob = file;
    if (isHEIC) {
        try {
            const result = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 1,
            });
            // heic2any 可能返回 Blob 或 Blob[]
            blob = Array.isArray(result) ? result[0] : result;
        } catch (error) {
            throw new Error('HEIC 图片转换失败');
        }
    }

    // 加载图片
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            URL.revokeObjectURL(url); // 释放内存
            img.onload = null;
            img.onerror = null;
            resolve(img);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url); // 释放内存
            img.onload = null;
            img.onerror = null;
            reject(new Error('图片解码错误'));
        };

        img.src = url;
    });
}

function findImageFile<T>(items: ArrayLike<T>, getFile: (item: T) => File | null): File | null {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const file = getFile(item);
        if (file && file.type.indexOf('image') !== -1) {
            return file;
        }
    }
    return null;
}

export function getImgByPaste(items: DataTransferItemList | never[]) {
    return findImageFile(items, item => (item as DataTransferItem).getAsFile());
}

export function getImgByDrop(files: File[]) {
    return findImageFile(files, item => item);
}
