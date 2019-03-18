import '../css/style.css';
import Accordion from './accordion';
import DateInputs from './date-inputs';
import complexHover from './complex-hover';
import countTerms from './count-terms';
import getCountedDate from './get-counted-date';

const isVisible = (elem) => {
    const elemCoords = elem.getBoundingClientRect();
    const topVisible = elemCoords.top > 0 && elemCoords.top < document.documentElement.clientHeight;
    const bottomVisible = elemCoords.bottom > 0 && elemCoords.bottom < document.documentElement.clientHeight
    return topVisible || bottomVisible;
};
const accordionSection = document.querySelector('.app-description__accordion');
const termsContainer = document.querySelector('.app-interface__terms-container');
const startAccordion = () => {
    if(isVisible(accordionSection)){
        const accordion = new Accordion(
            document.querySelectorAll('.app-description__accordion-item'),
            '.app-description__accordion-body'
        );
        accordion.init();
        window.removeEventListener('scroll', startAccordion);
    }
};
const startTerms = () => {
    if(isVisible(termsContainer)){
        termsContainer.appendChild(DateInputs.renderInitialInputs());
        const appResetButton = document.querySelector('.app-interface__app-reset-button');
        appResetButton.addEventListener('click', (evt)=>{
            evt.preventDefault();
            termsContainer.reset();
            termsContainer.innerHTML = "";
            termsContainer.appendChild(DateInputs.renderInitialInputs());
            document.querySelector('.app-interface__app-result').style.display = 'none';

        });
        const appStartButton = document.querySelector('.app-interface__app-start-button');
        appStartButton.addEventListener('click', () => {
            countTerms();
        });
        appResetButton.addEventListener('mouseover', ()=>{
            complexHover(appResetButton, appStartButton, '#EC2127', '#fff');
        });
        window.removeEventListener('scroll', startTerms);
    }
};
getCountedDate();
window.addEventListener('scroll', startAccordion);
window.addEventListener('scroll', startTerms);