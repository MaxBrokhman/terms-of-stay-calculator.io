(function(){
    const accordionButtons = document.querySelectorAll('.app-description__accordion-button');
    const accordionBodies = document.querySelectorAll('.app-description__accordion-body');
    for(let i=0; i < accordionButtons.length; i++){
        accordionButtons[i].addEventListener('click', ()=>{
            accordionBodies[i].classList.toggle('open');
        }); 
    }
})();