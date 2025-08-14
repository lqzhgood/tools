export function loadImg(
    file: File | null | undefined
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
