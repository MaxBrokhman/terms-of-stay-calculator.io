//count-terms.js
import DateClass from './date-class.js'
import Result from './result.js'

const ALLOWED_TERM = 89;//День въезда считается первым днем пребывания, поэтому 89
const TODAY = new Date();
const getDaysWord = (num) => {
    const daysWordEnd = '' + num;
    const lastSymbol = +daysWordEnd[daysWordEnd.length-1];
    switch(lastSymbol){
        case 1:
        return 'день';
        case 2:
        case 3:
        case 4:
        return 'дня';
        default:
        return 'дней';
    }
};

export default () => {
    const terms = [];
    let result = 0;
    const allInputs = document.querySelectorAll('.inputs-wrapper');
    allInputs.forEach((input, i) => {
        terms.push(new DateClass(
            input.querySelector('input[name="in-day"]').value, 
            input.querySelector('input[name="in-month"]').value,
            input.querySelector('input[name="in-year"]').value,
            input.querySelector('input[name="out-day"]').value || TODAY.getDate(), 
            input.querySelector('input[name="out-month"]').value || TODAY.getMonth() + 1,
            input.querySelector('input[name="out-year"]').value || TODAY.getFullYear(),
            input.querySelector('input[name="till-present"]').checked
        ));
        if(terms[i-1] && terms[i].inDate - terms[i-1].outDate < 0){
            return new Result('Дата нового въезда в РФ не может быть раньше даты последнего выезда из РФ', true).render();
        } else {
            result += terms[i].terms;
        }
    });
    const showDays = () => {
        const days = Math.floor(ALLOWED_TERM - result/(1000 * 60 * 60 * 24));
        if(days < 0){
            return "Сроки Вашего пребывания в РФ превышены на " + (-days) +  ' ' + getDaysWord(days);
        } else if(days == 0){
            return "Сроки Вашего пребывания в РФ истекли. Дальнейшее нахождение в РФ без законных оснований может повлечь ограничения на въезд в РФ";
        } else {
            return "Сроки Вашего пребывания в РФ не нарушены. Вы можете находиться в РФ еще " + days + ' ' + getDaysWord(days);
        }
    };
    if(result < 0){
        return new Result("При вводе дат допущены ошибки. Проверьте правильность введенных данных", true).render();
    }
    return new Result(showDays(), false).render();
};