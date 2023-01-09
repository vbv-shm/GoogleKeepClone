// Dollor sign ($) is used for all variables which points to HTML elements.

class App{
    constructor(){
    
        this.$form=document.querySelector("#form");
        this.$noteTitle=document.querySelector("#note-title");
        this.$formButtons=document.querySelector("#form-buttons");
        
        // When we start our app we attach all event listeners defined inside addEventListeners method.
        this.addEventListeners();
    }

    // Event listeners for whole the whole app.
    addEventListeners(){
        // We apply here addEventListener to body. When we click any child element in HTML, this event will get triggered as every child will be the part of body.
        document.body.addEventListener("click",event=>{
            this.handleFormClick(event);
        })
    };
    // Event is passed to callback function. Here mouse click event on body is passed as object to handleFormClick.   
    handleFormClick(event){
        
        // HTMLelement object has a "contains" method which take another HTMLelement object as argument and returns true if the other element is child of first element.
        
        // event.target is the HTMLelement object which is clicked. If this object is child of the $form HTMLelement the contains method will return true otherwise false.
        const isFromClicked=this.$form.contains(event.target);

        if(isFromClicked){
            this.openForm();
        }else{
            this.closeForm();
        }
    }
    openForm(){
        // "form-open" is a CSS class which adds borders to form when opened; 
        this.$form.classList.add('form-open');
        //form title and button are none by default therefore wont be visible. By adding display:block property to them they become visible.
        this.$noteTitle.style.display="block";
        this.$formButtons.style.display="block";
    }
    closeForm(){
        // clicking anywhere else in form will close th opened form.
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display="none";
        this.$formButtons.style.display="none";
    }
}
new App()