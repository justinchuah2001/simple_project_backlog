function createCard()
{
    const modal = document.getElementById("modal")
    const btn = document.getElementById("myBtn");
    const saveModal = document.getElementById("saveTask")
    const closeModal = document.getElementById("cancelTask")
    
    btn.onclick = function() {
        modal.showModal();
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
            modal.close();
        }
      } 

    // Creation of card goes here
    let cardIdRef = document.getElementById("cards");
    //Based on local storage update i(id = "card"+ i) accordingly.
    cardIdRef.innerHTML += `<div class="mdl-cell mdl-cell--4-col" id=${"card"+1}> 
    hi
    </div>`
}
