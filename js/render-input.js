(function(){
    const appStartButton = document.querySelector('.app-start');
    const appResetButton = document.querySelector('.app-reset');
    const termsContainer = document.querySelector('.terms-container');
    const tillPresentCheckHandler = (elem, flag) => {
        elem.elements['out-day'].required = flag;
        elem.elements['out-month'].required = flag;
        elem.elements['out-year'].required = flag;
        elem.elements['out-day'].disabled = !flag;
        elem.elements['out-month'].disabled = !flag;
        elem.elements['out-year'].disabled = !flag;
        elem.querySelector('.add-date-button').disabled = !flag;
        elem.querySelector('.add-date-button').style.backgroundColor = (!flag) ? '#bab6b6' : '#f4424b';
    };
    const formStartReset = () => {
        termsContainer.reset();
        termsContainer.innerHTML = '';
        document.querySelector('#result').textContent = '';
        appStartButton.textContent = "Посчитать сроки";
        appStartButton.onclick = appStartHandler;
    };
    const renderInput = () => {
        const newDatesInput = document.querySelector('#terms-input-template').content.querySelector('.term-input-item').cloneNode(true);
        newDatesInput.querySelector('.add-prevous-date-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            newDatesInput.insertAdjacentElement('beforebegin', renderInput());
        });
        newDatesInput.querySelector('.add-date-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            termsContainer.appendChild(renderInput());
        });
        newDatesInput.querySelector('.out-input__year').addEventListener('input', () => {
            window.validateYear(newDatesInput.querySelector('.in-input__year'), newDatesInput.querySelector('.out-input__year'));
        });
        newDatesInput.querySelector('.term-input__close').addEventListener('click', () => {
            if(newDatesInput.previousElementSibling || newDatesInput.nextElementSibling){
                newDatesInput.remove();
            } else{
                formStartReset();
            }
        });
        newDatesInput.elements['till-present'].addEventListener('change', () => {
            if(newDatesInput.elements['till-present'].checked){
                tillPresentCheckHandler(newDatesInput, false);
            } else{
                tillPresentCheckHandler(newDatesInput, true);
            }
        });
        return newDatesInput;
    };
    const appStartHandler = () => {
        termsContainer.appendChild(renderInput());
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