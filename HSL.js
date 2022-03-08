let hue = 0, saturation = 0, lightness = 0;
let cMax = null, cMin = null, delta = null;

export const generateHSLColor = (RGB) => {
    let colorCodeFractions = extractRGBColorCodes(RGB).map(color => color / 255)
    findGreatestAndSmallestChannels(colorCodeFractions)
    calculateDelta(cMax, cMin)
    calculateHue(colorCodeFractions)
    calculateLightness(cMax, cMin)
    calculateSaturation(delta, lightness)
    return `hsl(${hue}°, ${saturation}%, ${lightness}%)`
}

const extractRGBColorCodes = (RGBColor) => {
    return RGBColor.replace(/[rgb()]/g, '').split(',')
}
const findGreatestAndSmallestChannels = (colorCodeFractions) => {
    cMax = Math.max(...colorCodeFractions)
    cMin = Math.min(...colorCodeFractions)
}
const calculateDelta = (cMax, cMin) => {
    delta = cMax - cMin
}
const calculateHue = ([red, green, blue]) => {
    if (cMax === red) hue = ((green - blue) / delta) % 6
    else if (cMax === green) hue = (blue - red) / delta + 2
    else hue = (red - green) / delta + 4
    hue = Math.round(hue * 60)
    if (hue < 0) hue += 360
}
const calculateLightness = (cMax, cMin) => {
    lightness = (((cMax + cMin) / 2) * 100).toFixed(0)
}
const calculateSaturation = (delta, lightness) => {
    saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * (lightness / 100) - 1))
    saturation = (saturation * 100).toFixed(0)
}