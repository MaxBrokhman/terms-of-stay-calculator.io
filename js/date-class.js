//date-class.js
import Result from './result.js'

const HALF_YEAR = 180;
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