(function(){
    const ALLOWED_TERM = 89;//День въезда считается первым днем пребывания, поэтому 89
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

    window.countTerms = () => {
        const terms = [];
        let result = 0;
        const allInputs = document.getElementsByClassName('term-input-item');
        for(let i = 0; i<allInputs.length; i++){
            terms[i] = new window.InAndOut(
                allInputs[i].elements['in-day'].value, 
                allInputs[i].elements['in-month'].value,
                allInputs[i].elements['in-year'].value,
                allInputs[i].elements['out-day'].value, 
                allInputs[i].elements['out-month'].value,
                allInputs[i].elements['out-year'].value
            );
            if(terms[i-1] && terms[i].inDate - terms[i-1].outDate < 0){
                window.onError('Дата нового въезда в РФ не может быть раньше даты последнего выезда из РФ');
                return;
            } else {
                result += terms[i].terms;
            }
        }

        document.querySelector('#result').textContent = function() {
            const days = Math.floor(ALLOWED_TERM - result/(1000 * 60 * 60 * 24));
            if(days < 0){
                return "Сроки Вашего пребывания в РФ превышены на " + (-days) +  ' ' + getDaysWord(days);
            } else if(days == 0){
                return "Сроки Вашего пребывания в РФ истекли. Дальнейшее нахождение в РФ без законных оснований может повлечь ограничения на въезд в РФ";
            } else {
                return "Сроки Вашего пребывания в РФ не нарушены. Вы можете находиться в РФ еще " + days + ' ' + getDaysWord(days);
            }
        }();
    };
})();