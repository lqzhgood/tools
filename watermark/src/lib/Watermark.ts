import { pickBy } from 'lodash-es';

export type TextForm = {
    width: number;
    height: number;
    text: string;
    fontFamily: string;
    fontSize: number;
    rotate: number;
    color: string;
    rowSpacing: number;
    colSpacing: number;
    opacity: number;
};

class Watermark {
    // 外部 canvas
    outCanvas: HTMLCanvasElement;

    // 外部传入的 img
    img: HTMLImageElement | null = null;
    // 图片图层
    imgCanvas: HTMLCanvasElement = document.createElement('canvas');
    textCanvas: HTMLCanvasElement = document.createElement('canvas');

    // 输出的宽高， 原始宽高使用 imgCanvas.width
    width: number = 0;
    height: number = 0;

    text: string = `仅限XX使用,有效期${new Date().toLocaleDateString()}`;
    fontFamily: string = 'Microsoft YaHei';
    fontSize: number = 24;
    rotate: number = 45;
    color: string = '#ffffff';
    opacity: number = 0.3;
    rowSpacing: number = 1.5;
    colSpacing: number = 1.1;

    constructor(elm: HTMLCanvasElement) {
        this.outCanvas = elm;
    }

    setImg(img: HTMLImageElement) {
        const { imgCanvas } = this;
        this.img = img;

        const width = img.naturalWidth;
        const height = img.naturalHeight;

        imgCanvas.width = width;
        imgCanvas.height = height;
        const clx = imgCanvas.getContext('2d')!;
        clx.drawImage(img, 0, 0, width, height);

        this.width = width;
        this.height = height;

        this.draw();
    }

    setOptions(o: Partial<TextForm>) {
        const n = pickBy(o, v => v !== undefined);
        Object.assign(this, n);

        const {
            text,
            fontFamily,
            fontSize,
            rotate,
            color,
            rowSpacing,
            colSpacing,
            opacity,
        } = this;

        // 使用原始分辨率
        const width = this.imgCanvas.width;
        const height = this.imgCanvas.height;

        const canvas = this.textCanvas;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;

        const diameter = Math.ceil(
            Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2))
        );
        const offscreen = document.createElement('canvas');
        offscreen.width = diameter;
        offscreen.height = diameter;
        const offCtx = offscreen.getContext('2d')!;

        // 设置离屏Canvas的字体和颜色
        offCtx.font = `${fontSize}px '${fontFamily}'`;
        offCtx.fillStyle = color;
        offCtx.globalAlpha = opacity;
        offCtx.textBaseline = 'middle';
        offCtx.textAlign = 'center';

        // 测量文字尺寸
        const textMetrics = offCtx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;

        // 计算水平和垂直间距
        const colSpace = textWidth * colSpacing;
        const rowSpace = textHeight * rowSpacing;

        // 计算起始位置（确保覆盖整个离屏Canvas）
        const startX = -colSpace;
        const startY = -rowSpace;

        // 计算需要的行列数
        const cols = Math.ceil((diameter + colSpace * 2) / colSpace);
        const rows = Math.ceil((diameter + rowSpace * 2) / rowSpace);

        // 在离屏Canvas上绘制文字（未旋转状态）
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * colSpace;
                const y = startY + row * rowSpace;
                offCtx.fillText(text, x, y);
            }
        }

        // 将离屏Canvas内容绘制到主Canvas，并旋转45度
        ctx.save();
        // 移动到画布中心
        ctx.translate(canvas.width / 2, canvas.height / 2);
        // 旋转45度（转换为弧度）
        ctx.rotate(-(rotate * Math.PI) / 180);
        // 绘制离屏Canvas（居中显示）
        ctx.drawImage(offscreen, -diameter / 2, -diameter / 2);
        ctx.restore();

        this.draw();
    }

    draw() {
        const { outCanvas, width, height } = this;
        outCanvas.width = width;
        outCanvas.height = height;
        const outCtx = outCanvas.getContext('2d')!;
        outCtx.clearRect(0, 0, width, height);

        outCtx.drawImage(this.imgCanvas, 0, 0, width, height);
        outCtx.drawImage(this.textCanvas, 0, 0, width, height);
    }

    down() {
        if (!this.outCanvas) {
            return;
        }
        const url = this.outCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = Date.now() + '.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    asyncDown() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.down();
                    resolve(void 0);
                } catch (error) {
                    reject(error);
                }
            }, 0);
        });
    }
}

export default Watermark;
