const HEX_VALUES = 'abcdef1234567890'

export const generateHexColor = () => {
    let hex = ''
    for (let i = 0; i < 6; i++) {
        hex += HEX_VALUES[Math.floor(Math.random() * HEX_VALUES.length)]
    }
    return `#${hex}`.toUpperCase()
}