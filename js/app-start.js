//app-start.js
import countTerms from './count-terms';
import Accordion from './accordion';
import DateInputs from './date-inputs';

//Вспомогательная функция для определения того, находится ли элемент в пределах вьюпорта 
const isVisible = (elem) => {
    const elemCoords = elem.getBoundingClientRect();
    const topVisible = elemCoords.top > 0 && elemCoords.top < document.documentElement.clientHeight;
    const bottomVisible = elemCoords.bottom > 0 && elemCoords.bottom < document.documentElement.clientHeight
    return topVisible || bottomVisible;
};
const removeColors = (elem) => {
    elem.style.backgroundColor = '';
    elem.style.color = '';
};
const setColors = (elem, color, bgc) => {
    elem.style.backgroundColor = bgc;
    elem.style.color = color;
}; 
const getFormattedDate = () => {
    const currentDate = new Date();
    const HALF_YEAR_AGO = currentDate.getDate() - 180;
    return new Intl.DateTimeFormat("ru").format(currentDate.setDate(HALF_YEAR_AGO));
};

//Класс инициирующий работу приложения
export default class {
    constructor(){
        this.terms = document.querySelector('.app-interface__terms-container');
        this.inputs = (new DateInputs).render(false, false, true);
        this.start = document.querySelector('.app-interface__app-start-button');
        this.reset = document.querySelector('.app-interface__app-reset-button');
        this.result = document.querySelector('.app-interface__app-result');
        this.accordion = new Accordion(
            document.querySelectorAll('.app-description__accordion-item'),
            '.app-description__accordion-body'
        );
        this.showAccordion = this.showAccordion.bind(this);
        this.showInputs = this.showInputs.bind(this);
        this.startHandler = this.startHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
        this.resetHover = this.resetHover.bind(this);
    }
    startHandler(evt){
        evt.preventDefault();
        countTerms();
    }
    resetHandler(evt){
        evt.preventDefault();
        this.terms.reset();
        this.terms.innerHTML = '';
        this.terms.appendChild((new DateInputs).render(false, false, true));
        this.result.style.display = 'none';
    }
    resetHover(){
        setColors(this.start, '#EC2127', '#fff');
        setColors(this.reset, '#fff', '#EC2127');
        this.reset.onmouseout = () => {
            removeColors(this.start);
            removeColors(this.reset);
        }
    }

    //"Ленивая" инициализация скрипта аккордеона
    showAccordion(){
        const container = document.querySelector('.app-description__accordion');
        if(isVisible(container)){
            this.accordion.init();
            window.removeEventListener('scroll', this.showAccordion);
        }
    }

    //"Ленивая" отрисовка полей ввода дат
    showInputs(){
        if(isVisible(this.terms)){
            this.terms.appendChild(this.inputs);
            window.removeEventListener('scroll', this.showInputs);
            this.start.addEventListener('click', this.startHandler);
            this.reset.addEventListener('click', this.resetHandler);
        }
    }

    //Определение и вставка даты - точки отсчета для подсчета сроков пребывания
    insertDate(date, elems){
        elems.forEach(elem => elem.textContent = date);
    }
    init(){
        window.addEventListener('scroll', this.showAccordion);
        window.addEventListener('scroll', this.showInputs);
        this.insertDate(getFormattedDate(), document.querySelectorAll('.date--counted'));
        this.reset.addEventListener('mouseover', this.resetHover);
    }
};