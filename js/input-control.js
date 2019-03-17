//input-control.js
let currentValue = 0;
const currentYear = +(new Date).getFullYear();
const minAndMax = {
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
        target.parentNode.nextElementSibling.firstElementChild.focus();
    } else if(target.name === 'out-year' && target.closest('.inputs-wrapper').nextElementSibling){
        target.closest('.inputs-wrapper').nextElementSibling.querySelector('input').focus();
    } else if (!target.nextElementSibling && !target.closest('.inputs-wrapper').nextElementSibling){
        target.parentNode.nextElementSibling.firstElementChild.focus();
    } else{
        target.nextElementSibling.focus();
    }
};
const handlers = {
    'focus': (evt) => {
        currentValue = evt.target.value.length;
        if(evt.target.name === 'in-day' || evt.target.name === 'out-day'){
            evt.target.parentNode.querySelectorAll('input').forEach(input => {
                input.placeholder = '';
            });
        }
    },
    'blur': (evt) => {
        if(evt.target.value.length > 0 && (isNaN(+evt.target.value) || +evt.target.value < minAndMax[evt.target.name].min)){
            evt.target.value = minAndMax[evt.target.name].min;
        } else if (+evt.target.value > minAndMax[evt.target.name].max){
            evt.target.value = minAndMax[evt.target.name].max;
        }
    },
    'input': (evt) => {
        const maxValue = evt.target.name === ('in-year' || 'out-year') ? 4 : 2;
        if(evt.target.value.length >= currentValue && evt.target.value.length >= maxValue){
            toggleInputs(evt.target);
        }
    },
    'keydown': (evt) => {
        const maxValue = evt.target.name === ('in-year' || 'out-year') ? 4 : 2;
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