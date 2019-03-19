//date-inputs.js
import changeInputs from './change-inputs';
import InputControls from './input-control';

export default class DateInputs {
    constructor(){
        this.inputs = document.querySelector('#inputs-template').content.cloneNode(true);
        this.wrapper = this.inputs.querySelector('.inputs-wrapper');
        this.addPreviousDate = this.wrapper.querySelector('.add-previous-date-button');
        this.addDate = this.wrapper.querySelector('.add-date-button');
        this.removeDate = this.wrapper.querySelector('.remove-date-button');
        this.tillPresent = this.wrapper.querySelector('.app-interface__till-present');
        this.outDate = this.wrapper.querySelector('.input-out-date-wrapper');
        this.addDateHandler = this.addDateHandler.bind(this);
    }
    render(previousDate, removeDate, tillPresent){
        this.inputs.querySelectorAll('input[type="number"]').forEach(input => new InputControls(input));
        this.addDate.addEventListener('click',this.addDateHandler);

        if(previousDate){
            this.addPreviousDateHandler = this.addPreviousDateHandler.bind(this);
            this.addPreviousDate.addEventListener('click', this.addPreviousDateHandler);
        } else{
            this.addPreviousDate.remove();
        }

        if(removeDate){
            this.removeDateHandler = this.removeDateHandler.bind(this);
            this.removeDate.addEventListener('click', this.removeDateHandler);
        } else{
            this.removeDate.remove();
        }

        if(tillPresent){
            this.tillPresentHandler = this.tillPresentHandler.bind(this);
            this.tillPresent.querySelector('input').addEventListener('change', this.tillPresentHandler);
        } else{
            this.tillPresent.remove();
        }

        return this.inputs;
    }

    removeDateHandler(evt){
        evt.preventDefault();
        if(!this.wrapper.nextElementSibling && this.wrapper.previousElementSibling){
            if(this.wrapper.previousElementSibling === this.wrapper.parentNode.firstElementChild){
                changeInputs(this.wrapper.previousElementSibling, (new DateInputs).render(true, false, true));
            } else{
                changeInputs(this.wrapper.previousElementSibling, (new DateInputs).render(false, true, true));
            }
        } else if (this.wrapper.nextElementSibling && !this.wrapper.previousElementSibling){
            if(this.wrapper.nextElementSibling === this.wrapper.parentNode.lastElementChild){
                changeInputs(this.wrapper.nextElementSibling, (new DateInputs).render(true, false, true));
            } else{
                changeInputs(this.wrapper.nextElementSibling, (new DateInputs).render(true, true, false));
            }
        } 
        this.wrapper.remove();
    }
    addDateHandler(evt){
        evt.preventDefault();
        if(!this.wrapper.nextElementSibling && !this.wrapper.previousElementSibling){
            changeInputs(this.wrapper, (new DateInputs).render(true, true, false), (new DateInputs).render(false, true, true));
        } else if(!this.wrapper.nextElementSibling){
            changeInputs(this.wrapper, (new DateInputs).render(false, true, false), (new DateInputs).render(false, true, true));
        } else{
            this.wrapper.after((new DateInputs).render(false, true, false));
        }
    }
    addPreviousDateHandler(evt){
        evt.preventDefault();
        if(!this.wrapper.nextElementSibling && !this.wrapper.previousElementSibling){
            changeInputs(this.wrapper, (new DateInputs).render(false, true, true), (new DateInputs).render(true, true, false), true);
        } else{
            changeInputs(this.wrapper, (new DateInputs).render(false, true, false), (new DateInputs).render(true, true, false), true);
        }
    }
    tillPresentHandler(evt){
        this.outDate.querySelectorAll('input').forEach(input => {
            input.disabled = evt.target.checked? true : false;
            input.style.backgroundColor = evt.target.checked? '#D8D8D8' : '#fff';
        });
        this.addDate.disabled = evt.target.checked? true : false;
        this.outDate.style.backgroundColor = evt.target.checked? '#D8D8D8' : '#fff';
    }
};