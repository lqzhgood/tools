import heic2any from 'heic2any';

export function loadImg(
    file: File | null | undefined,
): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        const isHEIC =
            file?.type === 'image/heic' ||
            file?.type === 'image/heif' ||
            file?.name.toLowerCase().endsWith('.heic') ||
            file?.name.toLowerCase().endsWith('.heif');

        if (!isHEIC) {
            resolve(file);
        }

        resolve(
            heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 1,
            }),
        );
    }).then(file => {
        return new Promise(resolve => {
            const img = new Image();

            img.onload = () => {
                img.onload = null;
                img.onerror = null;
                resolve(img);
            };

            img.onerror = () => {
                alert('图片解码错误');
            };

            img.src = URL.createObjectURL(file as Blob);
        });
    });
}

export function getImgByPaste(items: DataTransferItemList | never[]) {
    let file = null;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile();
            break;
        }
    }
    return file;
}

export function getImgByDrop(files: File[]) {
    let file = null;
    for (let i = 0; i < files.length; i++) {
        if (files[i].type.indexOf('image') !== -1) {
            file = files[i];
            break;
        }
    }
    return file;
}
