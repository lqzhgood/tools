export function loadImg(
    file: File | null | undefined,
): Promise<HTMLImageElement> {
    if (!file) {
        return Promise.reject(new Error('No file provided'));
    }
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                resolve(img);
            };
        };
        reader.readAsDataURL(file);
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
