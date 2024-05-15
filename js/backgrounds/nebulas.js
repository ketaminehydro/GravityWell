/****************************************************************
 CLASS: Nebulas
 ****************************************************************/
class Nebulas {
    constructor() {
        this._ctx = backgroundCtx;
        this._numberOfNebulas = this.#getRandomInt(1, 3);
    }

    #getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    #getDarkerColor(color) {
        // You can adjust the darkening factor here
        const darkeningFactor = 0.6;
        // Convert hex color to RGB
        const hex = color.substring(1);
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        // Darken the color by reducing each component by a factor
        const darkerR = Math.round(r * darkeningFactor);
        const darkerG = Math.round(g * darkeningFactor);
        const darkerB = Math.round(b * darkeningFactor);

        // Convert back to hex
        const darkerHex = '#' + ((1 << 24) + (darkerR << 16) + (darkerG << 8) + darkerB).toString(16).slice(1);

        return darkerHex;
    }

    #getRandomPoint(minX, maxX, minY, maxY) {
        return {
            x: this.#getRandomInt(minX, maxX),
            y: this.#getRandomInt(minY, maxY)
        };
    }

    #getLine(start, end, points) {
        const numPoints = 8;
        const deltaX = (end.x - start.x) / numPoints;
        const deltaY = (end.y - start.y) / numPoints;
        for (let i = 1; i < numPoints; i++) {
            const x = start.x + deltaX * i;
            const y = start.y + deltaY * i;
            points.push({ x, y });
        }
    }

    #drawCircle(x, y, radius, color) {
        this._ctx.beginPath();
        this._ctx.arc(x, y, radius, 0, Math.PI * 2);
        this._ctx.fillStyle = color;
        this._ctx.fill();
    }


    #drawCheckerboardInCircle(centerX, centerY, radius, squareSize, color1, color2) {
        
        // Draw the checkerboard pattern
        let numSquares = Math.ceil(radius * 2 / squareSize);
        let squareSpacing = radius * 2 / numSquares;

        for (let i = 0; i < numSquares; i++) {
            for (let j = 0; j < numSquares; j++) {
                let x = centerX - radius + i * squareSpacing;
                let y = centerY - radius + j * squareSpacing;

                if ((i + j) % 2 === 0) {
                    this._ctx.fillStyle = color1;
                } else {
                    this._ctx.fillStyle = color2;
                }

                // Check if the square is within the circle
                if (Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2) <= Math.pow(radius, 2)) {
                    this._ctx.fillRect(x, y, squareSize, squareSize);
                }
            }
        }
    }


    draw() {

        for (let i = 0; i < this._numberOfNebulas; i++) {
            const lightColor = this.#getRandomColor();
            const darkColor = this.#getDarkerColor(lightColor);
            const transparentColor = this.#getDarkerColor(darkColor);
            const A = this.#getRandomPoint( 0, canvas.width, 
                                            0, canvas.height);
            const B = this.#getRandomPoint( Math.max(0, A.x - 500), Math.min(canvas.width, A.x),
                                            Math.max(0, A.y - 500), Math.min(canvas.width, A.y));
            const C = this.#getRandomPoint(       Math.max(0, A.x - 500), Math.min(canvas.width, A.x),
                                            Math.max(0, A.y - 500), Math.min(canvas.width, A.y));

            const points = [A];
            this.#getLine(A, B, points);
            this.#getLine(B, C, points);
            points.push(C);

            const lengthABC = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2) + Math.pow(C.x - B.x, 2) + Math.pow(C.y - B.y, 2));

            const r1 = 80;  // inner nebula region
            const r2 = 100;  // border nebula region
            const scale = 0.3;

            // outer nebula region (r2)
            for (const point of points) {
                let a = 0;  // Angle in radians
                for (let j = 0; j < 5; j++) {
                    let rx = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    let ry = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    let x = point.x + rx * Math.cos(a);
                    let y = point.y + ry * Math.sin(a);
                    let radius = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    this.#drawCircle(x, y, radius, darkColor);
                    a = a + Math.PI * 2 / 5;
                }
            }

            // dithering (r2)
            for (const point of points) {
                let a = 0;  // Angle in radians
                for (let j = 0; j < 3; j++) {
                    let rx = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    let ry = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    let x = point.x + rx * Math.cos(a);
                    let y = point.y + ry * Math.sin(a);
                    let radius = this.#getRandomInt(r2 * (1 - scale), r2 * (1 + scale));
                    this.#drawCheckerboardInCircle(x, y, radius, 5, "#000033", darkColor);
                    a = a + Math.PI * 2 / 5;
                }
            }

            // inner nebula region (r1)
            for (const point of points) {
                let a = 0;  // Angle in radians
                for (let j = 0; j < 5; j++) {
                    let rx = this.#getRandomInt(r1 * (1 - scale), r1 * (1 + scale));
                    let ry = this.#getRandomInt(r1 * (1 - scale), r1 * (1 + scale));
                    let x = point.x + rx * Math.cos(a);
                    let y = point.y + ry * Math.sin(a);
                    let radius = this.#getRandomInt(r1 * (1 - scale), r1 * (1 + scale));
                    this.#drawCircle(x, y, radius, lightColor);
                    a = a + Math.PI * 2 / 5;
                }
            }

            // debug Draw points A, B, C for debugging reasons
            this.#drawCircle(A.x, A.y, 5, 'red');
            this.#drawCircle(B.x, B.y, 5, 'red');
            this.#drawCircle(C.x, C.y, 5, 'red');
        }
    }
}