let firstName = document.getElementById("fname")
let secondName = document.getElementById("lname")
let donation = document.getElementById("donation")
let form  = document.getElementById("form")


form.addEventListener("submit",function(event){
    event.preventDefault();
    let dntamount = donation.options[donation.selectedIndex].value;
    let fname = firstName.value;
    let lname = secondName.value;
    location.assign("examples/simple.html")
})



