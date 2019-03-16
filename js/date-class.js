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
    constructor(inDay, inMonth, inYear, outDay, outMonth, outYear, checked){
        this.inDate = isTooLongAgo(new Date(inYear, inMonth-1, inDay));
        this.outDate = checked? new Date() : isTooLongAgo(new Date(outYear, outMonth-1, outDay)) ;
    }
    get terms(){
        return this.outDate - this.inDate;
    }
};