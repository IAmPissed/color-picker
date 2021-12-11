const btn = document.getElementById('btn')
const hexColorElem = document.getElementById('color-value-hex')
const rgbColorElem = document.getElementById('color-value-rgb')
const hslColorElem = document.getElementById('color-value-hsl')
const labels = document.querySelectorAll('[data-label]')
const notifElem = document.getElementById('notification')


btn.addEventListener('click', () => {
    hexColorElem.innerText = generateColor()
    rgbColorElem.innerText = toRGB(hexColorElem.innerText)
    document.body.style.backgroundColor = hexColorElem.innerText
})


const toRGB = (hexValue) => {
    hexValue = hexValue.slice(1)
    let [red, green, blue] = [hexValue.slice(0, 2), hexValue.slice(2, 4), hexValue.slice(4)]

    red = parseInt(red, 16)
    green = parseInt(green, 16)
    blue = parseInt(blue, 16)

    toHSL(red, green, blue)

    let rgb = `rgb(${red}, ${green}, ${blue})`

    return rgb
}

const toHSL = (r, g, b) => {
    // Mek r, g, b fractions of 1
    r /= 255
    g /= 255
    b /= 255
    console.log('red: ' + r, 'green: ' + g, 'blue: ' + b);
    // Find greatest and smallest channel values
    let cMax = Math.max(r, g, b)
    let cMin = Math.min(r, g, b)
    let delta = cMax - cMin
    let h = 0, s = 0, l = 0;
    console.log('hue: ' + h, 'saturation: ' + s, 'lightness: ' + l);
    // Calculate hue

    // No Difference
    if (delta == 0)
        h = 0
    // Red is max
    else if (cMax == r)
        h = ((g - b) / delta) % 6
    // Green is max
    else if (cMax == g)
        h = (b - r) / delta + 2
    // Blue is max
    else
        h = (r - g) / delta + 4

    h = Math.round(h * 60)

    // Make negative hues postive behind 360°
    if (h < 0)
        h += 360

    // Calculate lightness
    l = (cMax + cMin) / 2

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

    // Multiply l and s by 100 (percent)
    s = +(s * 100).toFixed(0)
    l = +(l * 100).toFixed(0)


    hslColorElem.innerText = `hsl(${h}°, ${s}%, ${l}%)`
}
const generateColor = () => {
    let hex = '#'
    let hexValues = 'abcdef1234567890'
    for (let i = 0; i < 6; i++) {
        hex += hexValues[Math.floor(Math.random() * hexValues.length)]
    }
    return hex.toUpperCase()
}
const clipboardAnimation = () => {
    let tl = gsap.timeline()
        .from(notifElem, { top: '-100%', duration: 0.1, delay: 0 })
        .to(notifElem, { top: '2%' })
        .to(notifElem, { top: '-100%', delay: 1, duration: 1.75 })
}
const saveToClipboard = (e) => {
    if (e.target.dataset.label === 'hex') {
        navigator.clipboard.writeText(hexColorElem.innerText)
        clipboardAnimation()
    }
    if (e.target.dataset.label === 'rgb') {
        navigator.clipboard.writeText(rgbColorElem.innerText)
        clipboardAnimation()
    }
    if (e.target.dataset.label === 'hsl') {
        navigator.clipboard.writeText(hslColorElem.innerText)
        clipboardAnimation()
    }
}



labels.forEach(label => {
    label.addEventListener('click', (e) => saveToClipboard(e))
})


