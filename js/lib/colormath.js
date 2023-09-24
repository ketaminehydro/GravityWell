/****************************************************************
 CLASS: ColorMath
 ****************************************************************/
 class ColorMath{
    static rgbToHex(red, green, blue){
        // Ensure the input values are within the valid range (0-255)
        red = Math.min(255, Math.max(0, red));
        green = Math.min(255, Math.max(0, green));
        blue = Math.min(255, Math.max(0, blue));

        // Convert decimal values to hexadecimal, add leading 0s if necessary
        const redHex = red.toString(16).padStart(2, '0');
        const greenHex = green.toString(16).padStart(2, '0');
        const blueHex = blue.toString(16).padStart(2, '0');

        // Concatenate the hex values to form the final hex code
        const hexCode = `#${redHex}${greenHex}${blueHex}`;

        return hexCode;
        }

    static hexToRgb(color){
        // Remove the "#" symbol if it is included using a regular expression
        hex = hex.replace(/^#/, '');

        // If the hex code is a 3-digit shorthand: expand it to 6 digits
        if (hex.length === 3) {
        hex = hex
            .split('')
            .map(char => char + char)
            .join('');
        }

        // Parse the hex values for red, green, and blue
        const red = parseInt(hex.slice(0, 2), 16);
        const green = parseInt(hex.slice(2, 4), 16);
        const blue = parseInt(hex.slice(4, 6), 16);

        return {
            red,
            green,
            blue
        };
    }
 }