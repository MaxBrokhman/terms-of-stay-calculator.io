(function(){
    const ALLOWED_TERM = 90;
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
                allInputs[i].querySelector('.in-input').elements['in-day'].value, 
                allInputs[i].querySelector('.in-input').elements['in-month'].value,
                allInputs[i].querySelector('.in-input').elements['in-year'].value,
                allInputs[i].querySelector('.out-input').elements['out-day'].value, 
                allInputs[i].querySelector('.out-input').elements['out-month'].value,
                allInputs[i].querySelector('.out-input').elements['out-year'].value
            );
        }

        if(terms.length > 1){
            for(let i = 0; i < terms.length; i++){
                result += terms[i].terms;
            }
        } else if(terms.length == 0){
            window.onError('Для подсчета необходимо внести даты въездов и выездов.');
        } else{
            result = terms[0].terms;
        }

        document.querySelector('#result').textContent = function() {
            const days = Math.floor(ALLOWED_TERM - result/(1000 * 60 * 60 * 24));
            if(days < 0){
                return "Сроки Вашего пребывания в РФ превышены на " + (-days) +  " дней";
            } else if(days == 0){
                return "Сроки Вашего пребывания в РФ истекли. Дальнейшее нахождение в РФ без законных оснований может повлечь ограничения на въезд в РФ";
            } else {
                return "Сроки Вашего пребывания в РФ не нарушены. Вы можете находиться в РФ еще " + days + ' ' + getDaysWord(days);
            }
        }();
    };
})();