export type TextForm = {
    text: string;
    fontFamily: string;
    rotate: number;
    fontSize: number;
    color: string;
    opacity: number;
    rowSpacing: number;
    colSpacing: number;
};

class Watermark {
    canvas: HTMLCanvasElement;
    get ctx() {
        return this.canvas.getContext('2d')!;
    }

    img: HTMLImageElement | null = null;

    text: string = `仅限XX使用,有效期${new Date().toLocaleDateString()}`;
    fontFamily: string = 'Microsoft YaHei';
    fontSize: number = 16;
    rotate: number = 45;

    constructor(elm: HTMLCanvasElement) {
        this.canvas = elm;
    }

    setImg(img: HTMLImageElement) {
        this.img = img;
        this.canvas.width = img.naturalWidth;
        this.canvas.height = img.naturalHeight;
    }

    drawImage() {
        if (!this.img) {
            return;
        }
        this.ctx.drawImage(
            this.img,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    drawText(o: TextForm) {
        const {
            text,
            fontFamily,
            fontSize,
            rotate,
            color,
            rowSpacing,
            colSpacing,
            opacity,
        } = o;

        const ctx = this.ctx;
        const canvas = this.canvas;

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
    }

    draw(o: TextForm) {
        if (!this.canvas) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.img) {
            return;
        }
        this.drawImage();
        this.drawText(o);
    }

    down(width?: number, height?: number) {
        if (!this.canvas) {
            return;
        }

        let url;

        if (!width || !height) {
            url = this.canvas.toDataURL('image/png');
        } else {
            const downCanvas = document.createElement('canvas');
            downCanvas.width = width;
            downCanvas.height = height;
            const smallCtx = downCanvas.getContext('2d')!;
            smallCtx.drawImage(
                this.canvas,
                // 源画布区域
                0,
                0,
                this.canvas.width,
                this.canvas.height,
                // 目标画布区域
                0,
                0,
                width,
                height
            );
            url = downCanvas.toDataURL('image/png');
        }

        const link = document.createElement('a');
        link.download = Date.now() + '.png';
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

export default Watermark;
