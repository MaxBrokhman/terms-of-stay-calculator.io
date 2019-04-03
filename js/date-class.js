//date-class.js
import {minAndMax} from './input-control';

const HALF_YEAR = 180;

/*Функция для целей расчета сроков пребывания приводящая слишком раннюю дату к
 минимальной и слишком позднюю - к максимальной*/
const isTooLongAgo = (date) => {
    let currentDate = new Date();
    const halfYearAgo = currentDate.setDate(currentDate.getDate() - HALF_YEAR);
    currentDate = new Date();
    if(date.getTime() - halfYearAgo < 0) {
        date = halfYearAgo;
    } else if(currentDate.getTime() - date.getTime() < 0){
        date = currentDate;
    }
    return date;
};

const isValid = (input) => {
    if (isNaN(input.value) || (input.value < minAndMax[input.name].min || input.value > minAndMax[input.name].max)){
        //Если поля вводы даты выезда пусты, но отмечен чекбокс "по настоящее время" валидация должна проходить
        if(+input.value === 0 && input.parentNode.className === 'input-out-date-wrapper' && !input.closest('.inputs-wrapper').querySelector('input[name="till-present"]').checked){
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
};

/*Класс подсчитывающий разницу между датой въезда и датой выезда в рамках одного блока
 полей ввода дат. Принимает на вход все инпуты одного блока полей ввода дат и возвращает
  объект с информацией о содержимом полей*/
export default class {
    constructor(inputs){
        inputs.forEach(input => {
            if(isValid(input)){
                this[input.name] = input;
            }  else{
                throw new Error(input.parentNode.className);
            }
        });
        this.inDate = isTooLongAgo(new Date(this['in-year'].value, this['in-month'].value-1, this['in-day'].value));
        this.outDate = this['till-present'].checked? new Date() : isTooLongAgo(new Date(this['out-year'].value, this['out-month'].value-1, this['out-day'].value));
    }
    get terms(){
        return this.outDate - this.inDate;
    }
};