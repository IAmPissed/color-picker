import { generateHexColor } from "./Hex.js"
import { generageHSLColor } from "./HSL.js"
import { generateRGBColor } from "./RGB.js"

const newColorButton = document.getElementById('btn')
const hexColorElement = document.getElementById('color-value-hex')
const rgbColorElement = document.getElementById('color-value-rgb')
const hslColorElement = document.getElementById('color-value-hsl')
const colorLables = document.querySelectorAll('[data-label]')
const notificationElement = document.getElementById('notification')

let Hex, RGB;

newColorButton.addEventListener('click', () => {
    hexColorElement.innerText = generateHexColor()
    Hex = hexColorElement.innerText
    rgbColorElement.innerText = generateRGBColor(Hex)
    RGB = rgbColorElement.innerText
    hslColorElement.innerText = generageHSLColor(RGB)
    updatePageBackgroundColorWithHex()
})
const updatePageBackgroundColorWithHex = () => {
    document.body.style.backgroundColor = hexColorElement.innerText
}
const runClipboardAnimation = () => {
    let tl = gsap.timeline()
        .from(notificationElement, { top: '-100%', duration: 0.1, delay: 0 })
        .to(notificationElement, { top: '2%' })
        .to(notificationElement, { top: '-100%', delay: 1, duration: 1.75 })
}
const saveToClipboard = (e) => {
    const { label } = e.target.dataset
    if (label === 'hex') navigator.clipboard.writeText(hexColorElement.innerText)
    if (label === 'rgb') navigator.clipboard.writeText(rgbColorElement.innerText)
    if (label === 'hsl') navigator.clipboard.writeText(hslColorElement.innerText)
    runClipboardAnimation()
}
colorLables.forEach(label => {
    label.addEventListener('click', (e) => saveToClipboard(e))
})