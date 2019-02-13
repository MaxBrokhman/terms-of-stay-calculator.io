(function(){
    const HALF_YEAR = 180;
    const currentDateSpan = document.querySelector('.date--counted');
    const currentDate = new Date();
    currentDateSpan.textContent = new Intl.DateTimeFormat("ru").format(currentDate.setDate(currentDate.getDate() - HALF_YEAR));
})();