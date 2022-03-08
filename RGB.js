export const generateRGBColor = (hexColor) => {
    hexColor = hexColor.slice(1)
    let [red, green, blue] = [
        parseInt(hexColor.slice(0, 2), 16),
        parseInt(hexColor.slice(2, 4), 16),
        parseInt(hexColor.slice(4), 16)
    ]
    return `rgb(${red}, ${green}, ${blue})`
}