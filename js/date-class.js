//date-class.js

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

/*Класс подсчитывающий разницу между датой въезда и датой выезда в рамках одного блока
 полей ввода дат. Принимает на вход все инпуты одного блока полей ввода дат и возвращает
  объект с информацией о содержимом полей*/
export default class {
    constructor(inputs){
        inputs.forEach(input => this[input.name] = input);
        if(this['till-present']) this.checked = this['till-present'].checked;
        this.inDate = isTooLongAgo(new Date(this['in-year'].value, this['in-month'].value-1, this['in-day'].value));
        this.outDate = this.checked? new Date() : isTooLongAgo(new Date(this['out-year'].value, this['out-month'].value-1, this['out-day'].value)) ;
    }
    get terms(){
        return this.outDate - this.inDate;
    }
};