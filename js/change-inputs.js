//change-inputs.js
import InputsData from './inputs-data.js'

export default (oldInputs, inputsToChange, inputsToRender, before) => {
    let newInputsWrapper;
    if(inputsToChange){
        const inputsData = new InputsData(
            oldInputs.querySelector('.input-in-date-wrapper').querySelectorAll('input'),
            oldInputs.querySelector('.input-out-date-wrapper').querySelectorAll('input')
        );
        oldInputs.parentNode.insertBefore(inputsToChange, oldInputs);
        newInputsWrapper = oldInputs.previousElementSibling;
        inputsData.get(
            newInputsWrapper.querySelector('.input-in-date-wrapper').querySelectorAll('input'),
            newInputsWrapper.querySelector('.input-out-date-wrapper').querySelectorAll('input')
        );
    }
    if(inputsToRender){
        before ? newInputsWrapper.before(inputsToRender) : oldInputs.after(inputsToRender);
    }
    oldInputs.remove();
};