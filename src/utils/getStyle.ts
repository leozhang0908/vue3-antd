export const getStyle = (dom, attr) => {
    return dom.currentStyle
        ? dom.currentStyle[attr]
        : getComputedStyle(dom, null)[attr]
}