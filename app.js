// Dollor sign ($) is used for all variables which points to HTML elements.

class App{
    constructor(){
        
        // this.title and this.text will hold the text and title of selected notes.
        this.title="";
        this.text="";
        this.id="";
                    
        this.notes=[];
        this.$form=document.querySelector("#form");
        this.$noteTitle=document.querySelector("#note-title");
        this.$noteText=document.querySelector("#note-text");
        this.$notes=document.querySelector("#notes");
        this.$formButtons=document.querySelector("#form-buttons");
        this.$placeholder=document.querySelector("#placeholder");
        this.$formCloseButton=document.querySelector("#form-close-button");
        this.$modal=document.querySelector(".modal");
        this.$modalTitle = document.querySelector(".modal-title");
        this.$modalText = document.querySelector(".modal-text");
        this.$modalCloseButton = document.querySelector('.modal-close-button');
        this.$colorTooltip=document.querySelector("#color-tooltip");

        // When we start our app we attach all event listeners defined inside addEventListeners method.
        this.addEventListeners();
        
    }

    // Event listeners for whole the whole app.
    addEventListeners(){
        // We apply here addEventListener to body. When we click any child element in HTML, this event will get triggered as every child will be the part of body.
        document.body.addEventListener("click",event=>{
            this.handleFormClick(event);
            this.selectNote(event);
            this.openModal(event);
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
            // stopPropagation stops bubbling of events. All the event listener below our close won't run. We have event listener which opens form when we click anywhere on form. That event listener will run after this event listener which will again open the form. stopPropagation stops that event listener from running.
            event.stopPropagation();
            this.closeForm();
            })
        
        this.$modalCloseButton.addEventListener("click",event=>{
            this.closeModal(event);
        })
        document.body.addEventListener('mouseover',event=>{
            openToolTip(event);
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
        // clicking anywhere else in form will close the opened form.
        this.$form.classList.remove('form-open');
        this.$noteTitle.style.display="none";
        this.$formButtons.style.display="none";
        this.$noteTitle.value = '';
        this.$noteText.value = '';
    }

    openModal(event){
        // event.target provides the element which was clicked. The closest method will return the first HTML element with the ".note" class inside the clicked element. The closest method will start looking for the ".note" class from the top most clicked element to its parents and grand parents until it finds it. Note that if we clicked in area outside the notes it will return false as no element will have the .note method.

        if (event.target.closest('.note')){
            // toggle methods add the class if not present and removes when present. The class "open-modal" set the visibility of modal(defined inside "modal" class) to visible which is hidden by default. A very important thing to note that in our "styles.css" we defined the "open-modal" below the "modal" class, therefore visibility of "open-modal" will be given more preference. 

            this.$modal.classList.toggle('open-modal');

            // Following two lines will add the value in modal
            this.$modalTitle.value=this.title;
            this.$modalText.value=this.text;
        }
    }
    closeModal(event){
        // closeModal runs when we click close button on modal.
        this.editNote();
        // After editing the note we close the modal by toggling its class.
        this.$modal.classList.toggle('open-modal');

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
    editNote(){
            // Selects what is written in modal text and modal title and store them in two variables.
            const title=this.$modalTitle.value;
            const text =this.$modalText.value;

            // Here we update our this.notes array. We edit that note whose id matches with id stored in this.notes. Thats why we stored id in two places-one in HTML element and the other in this.notes.
            this.notes=this.notes.map(note=>
                note.id===Number(this.id) ? {...note,title,text} : note)

            // After updating the notes we display them.
            this.displayNotes();
        }

    selectNote(event){
        // Selects the HTMLelement closest to "note" class.
        const $selectedNote=event.target.closest(".note");
        if(!$selectedNote) return;
        // Get the first to children of "note", which contains details of note title and note text respectively.
        const [$noteTitle,$noteText]=$selectedNote.children;
        this.title=$noteTitle.innerText;
        this.text=$noteText.innerText;
        this.id=$selectedNote.dataset.id;
    }
 
    displayNotes(){
        //show the placeholder only if the number of notes are 0.
        const hasNotes=this.notes.length>0;
        this.$placeholder.style.display=hasNotes?"none":"flex";

        this.$notes.innerHTML=this.notes.map(note=>`
            <div style="background:${note.color};"class="note" data-id="${note.id}">
                <div class="${note.title && 'note-title'}">${note.title}</div>
                <div class="note-text">${note.text}</div>
                <div class="toolbar-container>
                <img class="toolbar-color" src="color-picker.png">
                <img class="toolbar-delete" src="https://icon.now.sh/delete">
              </div>
            </div>
          </div>
       `).join("");         
    }
    
    openToolTip(event){
        // The "matches" method of HTML elements returns true if the element exactly matches the class provided in input.
        if(!event.target.matches(".toolbar-color")){return;}    
        
        //getBoundingCLientRect gives the coordinate of the element.
        const noteCoords=event.target.getBoundingCLientRect();
        

        const horizontal = noteCoords.left + window.scrollX;
        const vertical = noteCoords.top + window.scrollY;

        this.$colorTooltip.style.transform=`translate(${horizontal}px, ${vertical}px)`;
        this.$colorTooltip.style.display = 'flex';

    }
}
    

new App()