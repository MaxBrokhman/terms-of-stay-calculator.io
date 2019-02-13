(function(){
    const appStartButton = document.querySelector('.app-start');
    const appResetButton = document.querySelector('.app-reset');
    const termsContainer = document.querySelector('.terms-container');
    const formStartReset = () => {
        termsContainer.reset();
        termsContainer.innerHTML = '';
        document.querySelector('#result').textContent = '';
        appStartButton.textContent = "Посчитать сроки";
        appStartButton.onclick = appStartHandler;
    };
    const renderInput = () => {
        const newDatesInput = document.querySelector('#terms-input-template').content.querySelector('.term-input-item').cloneNode(true);
        newDatesInput.querySelector('.add-date-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            renderInput();
        });
        newDatesInput.querySelector('.out-input__year').addEventListener('input', () => {
            window.validateYear(newDatesInput.querySelector('.in-input__year'), newDatesInput.querySelector('.out-input__year'));
        });
        newDatesInput.querySelector('.term-input__close').addEventListener('click', () => {
            if(newDatesInput.previousElementSibling){
                newDatesInput.remove();
            } else{
                formStartReset();
            }
        });
        termsContainer.appendChild(newDatesInput);
        return false;
    };
    const appStartHandler = () => {
        renderInput();
        appStartButton.textContent = "Закончить подсчет";
        appStartButton.onclick = () => {
            let termsValidity = function(){
                for(let i = 0; i < termsContainer.elements.length; i++){
                    if(!termsContainer.elements[i].validity.valid){
                        return false;
                    }
                }
                return true;
            }();
            if(termsValidity){
                window.countTerms();
            } else{
                window.onError('Данные не введены или введены неправильно. Проверьте введенные Вами данные и повторите попытку.');
            }
        };
    };
    appStartButton.onclick = () => {
        appStartHandler();
    };

    appResetButton.onclick = formStartReset;
})();