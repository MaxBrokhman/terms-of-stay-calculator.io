//date-inputs.js
import changeInputs from './change-inputs';
import InputControls from './input-control';

export default class DateInputs {
    constructor(options){
        this.inputs = document.querySelector('#inputs-template').content.cloneNode(true);
        this.inputs.querySelector('.add-previous-date-button').addEventListener('click', this.addPreviousDateHandler);
        if(!options.previousDate){
            this.inputs.querySelector('.add-previous-date-button').remove();
        }
        this.inputs.querySelector('.add-date-button').addEventListener('click',this.addDateHandler);
        this.inputs.querySelector('.remove-date-button').addEventListener('click', this.removeDateHandler);
        if(!options.removeDate){
            this.inputs.querySelector('.remove-date-button').remove();
        }
        this.inputs.querySelector('.app-interface__till-present').querySelector('input').addEventListener('change', this.tillPresentHandler);
        if(!options.tillPresent){
            this.inputs.querySelector('.app-interface__till-present').remove();
        }
    }
    render(){
        this.inputs.querySelectorAll('input[type="number"]').forEach(input => {
            new InputControls(input);
        });
        return this.inputs;
    }
    removeDateHandler(evt){
        evt.preventDefault();
        const inputsWrapper = this.closest('.inputs-wrapper');
        if(!inputsWrapper.nextElementSibling && inputsWrapper.previousElementSibling){
            if(inputsWrapper.previousElementSibling === inputsWrapper.parentNode.firstElementChild){
                changeInputs(inputsWrapper.previousElementSibling, DateInputs.renderOnlyInputs());
            } else{
                changeInputs(inputsWrapper.previousElementSibling, DateInputs.renderLastInputs());
            }
        } else if (inputsWrapper.nextElementSibling && !inputsWrapper.previousElementSibling){
            if(inputsWrapper.nextElementSibling === inputsWrapper.parentNode.lastElementChild){
                changeInputs(inputsWrapper.nextElementSibling, DateInputs.renderOnlyInputs());
            } else{
                changeInputs(inputsWrapper.nextElementSibling, DateInputs.renderFirstInputs());
            }
        } 
        inputsWrapper.remove();
    }
    addDateHandler(evt){
        evt.preventDefault();
        const inputsWrapper = this.closest('.inputs-wrapper');
        if(!inputsWrapper.nextElementSibling && !inputsWrapper.previousElementSibling){
            changeInputs(inputsWrapper, DateInputs.renderFirstInputs(), DateInputs.renderLastInputs());
        } else if(!inputsWrapper.nextElementSibling){
            changeInputs(inputsWrapper, DateInputs.renderMiddleInputs(), DateInputs.renderLastInputs());
        } else{
            inputsWrapper.after(DateInputs.renderMiddleInputs());
        }
    }
    addPreviousDateHandler(evt){
        evt.preventDefault();
        const inputsWrapper = this.closest('.inputs-wrapper');
        if(!inputsWrapper.nextElementSibling && !inputsWrapper.previousElementSibling){
            changeInputs(inputsWrapper, DateInputs.renderLastInputs(), DateInputs.renderFirstInputs(), true);
        } else{
            changeInputs(inputsWrapper, DateInputs.renderMiddleInputs(), DateInputs.renderFirstInputs(), true);
        }
    }
    tillPresentHandler(){
        const inputsWrapper = this.closest('.inputs-wrapper');
        inputsWrapper.querySelector('.input-out-date-wrapper').querySelectorAll('input').forEach(input => {
            input.disabled = this.checked? true : false;
            input.style.backgroundColor = this.checked? '#D8D8D8' : '#fff';
        });
        inputsWrapper.querySelector('.add-date-button').disabled = this.checked? true : false;
        inputsWrapper.querySelector('.input-out-date-wrapper').style.backgroundColor = 
            this.checked? '#D8D8D8' : '#fff';
    }

    static renderLastInputs(){
        return new this({
            previousDate: false,
            removeDate: true,
            tillPresent: true
        }).render();
    }
    static renderFirstInputs(){
        return new this({
            previousDate: true,
            removeDate: true,
            tillPresent: false
        }).render();
    }
    static renderOnlyInputs(){
        return new this({
            previousDate: true,
            removeDate: false,
            tillPresent: true
        }).render();
    }
    static renderInitialInputs(){
        return new this({
            previousDate: false,
            removeDate: false,
            tillPresent: true
        }).render();
    }
    static renderMiddleInputs(){
        return new this({
            previousDate: false,
            removeDate: true,
            tillPresent: false
        }).render();
    }
}