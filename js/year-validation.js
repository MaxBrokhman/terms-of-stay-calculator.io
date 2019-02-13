(function(){
    window.validateYear = (year1, year2) => {
        if(year2.value - year1.value < 0){
            year2.setCustomValidity('Необходимо ввести корректную информацию о годе');
        } else{
            year2.setCustomValidity('');
        }
    };
})();