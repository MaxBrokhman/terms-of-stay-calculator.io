(function(){
    const popupOverlay = document.querySelector('.popup-overlay');
    const errorPopup = document.querySelector('.error-popup');
    const errorPopupCloseButton = errorPopup.querySelector('.error-popup__close');
    const errorButtonHandler = (evt) => {
        evt.preventDefault();
        document.querySelector('#result').textContent = '';
        errorPopup.style.display = 'none';
        popupOverlay.style.display = 'none';
        errorPopupCloseButton.onclick = null;
        errorPopupCloseButton.onkeydown = null;
        popupOverlay.onclick = null;
    };

    window.onError = (message) => {
        errorPopup.style.display = 'block';
        popupOverlay.style.display = 'block';
        errorPopup.querySelector('.error-popup__text').textContent = message;
        errorPopupCloseButton.onclick = (evt) => {
            errorButtonHandler(evt);
        };
        errorPopupCloseButton.onkeydown = (evt) => {
            if(evt.keyCode === 13){
                errorButtonHandler(evt);
            }
        };
        popupOverlay.onclick = (evt) => {
            errorButtonHandler(evt);
        };
        errorPopupCloseButton.focus();
    };
})();