// Dollor sign ($) is used for all variables which points to HTML elements.

class App{
    constructor(){
        
        this.notes=[];
        this.$form=document.querySelector("#form");
        this.$noteTitle=document.querySelector("#note-title");
        this.$noteText=document.querySelector("#note-text");
        this.$notes=document.querySelector("#notes");
        this.$formButtons=document.querySelector("#form-buttons");
        this.$placeholder=document.querySelector("#placeholder");
        this.$formCloseButton=document.querySelector("#form-close-button");

        // When we start our app we attach all event listeners defined inside addEventListeners method.
        this.addEventListeners();
        
    }

    // Event listeners for whole the whole app.
    addEventListeners(){
        // We apply here addEventListener to body. When we click any child element in HTML, this event will get triggered as every child will be the part of body.
        document.body.addEventListener("click",event=>{
            this.handleFormClick(event);
        })

        // Note that submit is a event in form.
        this.$form.addEventListener("submit",event=>{
            // preventDefault will prevent default behavior of HTML forms from happening.
            event.preventDefault();

            const title=this.$noteTitle.value;
            const text=this.$noteText.value;
            const hasNote = title || text;
            if (hasNote) {
                this.addNote({ title, text });
                        }
                                                })
        this.$formCloseButton.addEventListener("click",(event)=>{
            // stop propagation stops bubbling of events. All the event listener below our close won't run. We have event listener which opens form when we click anywhere on form. That event listener will run after this event listener which will again open the form. stopPropagation stops that event listener from running.
            event.stopPropagation();
            this.closeForm();
             })

    };
    // Event is passed to callback function. Here mouse click event on body is passed as object to handleFormClick.   
    handleFormClick(event){
        
        // HTMLelement object has a "contains" method which take another HTMLelement object as argument and returns true if the other element is child of first element.
        
        // event.target is the HTMLelement object which is clicked. If this object is child of the $form HTMLelement, the contains method will return true otherwise false. In simpler words if the user clicked inside the form only then the form will open.
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
        this.$noteTitle.value = '';
        this.$noteText.value = '';
    }


    addNote(note){
        const newNote={
            title:note.title,
            text:note.text,
            color:"white",
            id:this.notes.length > 0 ? this.notes[this.notes.length-1].id+1 : 1,}

            this.notes=[...this.notes,newNote];
            this.displayNotes();
            this.closeForm();
        }
        // addNote adds note to list object and displayNotes displays the objects onto screen.
    displayNotes(){
        //show the placeholder only if the number of notes are 0.
        const hasNotes=this.notes.length>0;
        this.$placeholder.style.display=hasNotes?"none":"flex";


        this.$notes.innerHTML=this.notes.map(note=>`
            <div style="background:${note.color};"class="note">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container>
                <img class="toolbar-color" src="https://icon.now.sh/palette">
                <img class="toolbar-delete" src="https://icon.now.sh/delete">
              </div>
            </div>
          </div>
       `).join("");         

    }
}


new App()