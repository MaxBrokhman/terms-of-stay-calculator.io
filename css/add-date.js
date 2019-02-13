(function(){
    const dateTemplate = document.querySelector('#terms-input-template').content.querySelector('.term-input-item');
    const termsContainer = document.querySelector('.terms-container');

    window.renderDates = (func) => {
        const newDates = dateTemplate.cloneNode(true);
        newDates.addEventListener('click', () => func);
        termsContainer.appendChild(newDates);
    };
})();