(function(){
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

    window.InAndOut = class InAndOut{
        constructor(inDay, inMonth, inYear, outDay, outMonth, outYear){
            this.inDate = isTooLongAgo(new Date(inYear, inMonth-1, inDay));
            this.outDate = isTooLongAgo(new Date(outYear, outMonth-1, outDay));
        }
        get terms(){
            if(this.outDate - this.inDate < 0){
                window.onError("При вводе дат допущены ошибки. Проверьте правильность введенных данных");
                return 0;
            } else{
                return this.outDate - this.inDate;
            }
        }
    }
})();