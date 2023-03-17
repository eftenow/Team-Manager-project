let modalDialogueEl = document.createElement('div');
modalDialogueEl.id = 'modal';

modalDialogueEl.innerHTML = `
    <div class="modal-content">
        <p class="modal-msg"></p>
        <button  class="action" id="confirm-remove">Yes</button>
        <button  class="action" id="cancel-remove">No</button>    
</div>`;

modalDialogueEl.querySelector('#confirm-remove').addEventListener("click", () => onChoice(true));
modalDialogueEl.querySelector('#cancel-remove').addEventListener("click", () => onChoice(false));

let call = null;
const modalMsg = modalDialogueEl.querySelector('p');

function onChoice(choice) {
    modalDialogueEl.remove();
    call(choice);
    
};

export function showModal(message, callback) {
    call = callback;
    modalMsg.textContent = message;
    document.body.appendChild(modalDialogueEl);
};