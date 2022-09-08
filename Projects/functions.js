function createCard()
{
    const modal = document.getElementById("modal")
    const saveModal = document.getElementById("saveTask")
    const closeModal = document.getElementById("cancelTask")
    modal.showModal();

    var btn = document.getElementById("createCard");
    btn.onclick = "createCard()";
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    
    
    saveModal.addEventListener("click", ()=>{
        //Storing of data goes here
        modal.close();
    })
    closeModal.addEventListener("click", () =>{
        modal.close();
    })

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
      } 

    // Creation of card goes here
    let cardIdRef = document.getElementById("cards");
    //Based on local storage update i(id = "card"+ i) accordingly.
    cardIdRef.innerHTML += `<div class="mdl-cell mdl-cell--4-col" id=${"card"+1}> 
    hi
    </div>`
}
