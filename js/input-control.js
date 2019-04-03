//input-control.js

let currentValue = 0;
const currentYear = +(new Date).getFullYear();
export const minAndMax = {
    'in-day': {
        min: 1,
        max: 31
    },
    'out-day': {
        min: 1,
        max: 31
    },
    'in-month': {
        min: 1,
        max: 12
    },
    'out-month': {
        min: 1,
        max: 12
    },
    'in-year': {
        min: 2014,
        max: currentYear
    },
    'out-year': {
        min: 2014,
        max: currentYear
    }
};
const toggleInputs = (target) => {
    if(target.name === 'in-year'){
        //если заполнено поле ввода года въезда, активизируетя фокус на поле ввода дня выезда 
        target.parentNode.nextElementSibling.nextElementSibling.firstElementChild.focus();
    } else if(target.name === 'out-year' && target.closest('.inputs-wrapper').nextElementSibling){
        target.closest('.inputs-wrapper').nextElementSibling.querySelector('input').focus();
    } else if (!target.nextElementSibling && !target.closest('.inputs-wrapper').nextElementSibling){
        /*если в блоке полей ввода дат ввод закончен и отсутствует следующий блок, фокус срабатывает на кнопке добавления нового блока */
        target.parentNode.nextElementSibling.firstElementChild.focus();
    } else{
        target.nextElementSibling.focus();
    }
};

//Объект обработчиков сообытий для полей ввода дат
const handlers = {
    'focus': (evt) => {
        evt.target.parentNode.style.borderColor = '';
        currentValue = evt.target.value.length;
        evt.target.parentNode.querySelectorAll('input').forEach(input => {
            input.placeholder = '';
        });
    },
    'blur': (evt) => {
        if(evt.target.value.length > 0 && (isNaN(+evt.target.value) || +evt.target.value < minAndMax[evt.target.name].min)){
            evt.target.value = minAndMax[evt.target.name].min;
        } else if (+evt.target.value > minAndMax[evt.target.name].max){
            evt.target.value = minAndMax[evt.target.name].max;
        }
    },
    'input': (evt) => {
        const maxValue = (evt.target.name === 'in-year' || evt.target.name === 'out-year') ? 4 : 2;
        if(evt.target.value.length >= currentValue && evt.target.value.length >= maxValue){
            toggleInputs(evt.target);
        }
    },
    'keydown': (evt) => {
        const maxValue = (evt.target.name === 'in-year' || evt.target.name === 'out-year') ? 4 : 2;
        if((evt.code === 'Backspace' && evt.target.value.length === 0 && evt.target.name !== 'in-day' && evt.target.name !== 'out-day') || (evt.code === 'ArrowLeft' && evt.target.name !== 'in-day' && evt.target.name !== 'out-day')){
            evt.target.previousElementSibling.focus();
        } else if(evt.code === 'ArrowRight' && evt.target.value.length >= maxValue && (evt.target.name !== 'in-year' && evt.target.name !== 'out-year')){
            evt.target.nextElementSibling.focus();
        } else if(evt.code === 'Enter'){
            evt.preventDefault();
            toggleInputs(evt.target);
        }
    }
};

export default class {
    constructor(input){
        this.input = input;
        for(event in handlers){
            this.input.addEventListener(event, handlers[event]);
        }
    }
};