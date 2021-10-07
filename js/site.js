
// Displays a message to the user
function displayMessage() {
    // Declare our variable
    let msg = "";
    // Pull the value from the input box
    msg = document.getElementById("message").value;
    // Alert the user
    alert(msg);
}

function displayMessage2() {
    
    let msg = "";
    
    msg = document.getElementById("message").value;
    
    Swal.fire(msg);
}

