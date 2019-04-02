//change-inputs.js
import InputsData from './inputs-data.js'


/*
Вспомогательная функция замены полей ввода дат при добавлении новых полей или удалении существующих
Принимает на вход:
1) элемент, который необходимо заменить или удалить, 
2)элемент, в который необходимо перенести введенную пользователем информацию, 
3)элемент, который необходимо добавить в разметку для ввода новых дат, 
4) флаг определяющий будет ли добавляемый элемент отрисован до или после заменяемого
*/
export default (oldInputs, inputsToChange, inputsToRender, before) => {
    let newInputsWrapper;
    if(inputsToChange){
        /*Информация, введенная пользователем, сохраняется в объект InputsData для отрисовки в новых полях ввода дат */
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