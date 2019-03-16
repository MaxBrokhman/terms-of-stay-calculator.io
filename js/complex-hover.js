//complex-hover.js
const complexHover = (hoverButton, relatedButton, hoverBackground, hoverColor) => {
    relatedButton.style.backgroundColor = hoverColor;
    relatedButton.style.color = hoverBackground;
    hoverButton.style.backgroundColor = hoverBackground;
    hoverButton.style.color = hoverColor;
    hoverButton.onmouseout = () => {
        relatedButton.style.backgroundColor = '';
        relatedButton.style.color = '';
        hoverButton.style.backgroundColor = '';
        hoverButton.style.color = '';
    }
};
export default complexHover;