import fs from 'fs';

const rgbColourValues = fs.readFileSync("./public/rgb.txt", "utf-8").split("\n").filter(x => x.length).map((line) => {
    const [rr, gr, br, ...name] = line.split(" ")
    const [r, g, b] = [parseInt(rr), parseInt(gr), parseInt(br)];
    const hex = (r << 16) + (g << 8) + b;
    const hexString = hex.toString(16).toUpperCase();
    const paddedHexString = "0".repeat(6 - hexString.length) + hexString;
    return { name: name.join("").toLowerCase(), r, g, b, hex: paddedHexString };
});

const rgbDictionary: Record<string, {name: string, hex: string}> = rgbColourValues.reduce((acc, { name, hex }) => {
    acc[name] = { name, hex };
    return acc;
}, {} as Record<string, {name: string, hex: string}>);

export default rgbDictionary;
