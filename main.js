//show and hide navigation links in small screens
const closeNav = document.querySelector(".close-nav");
const openNav = document.querySelector(".open-nav");
const smallScreenNav = document.querySelector(".small-screen");
openNav.addEventListener("click",function(){
    smallScreenNav.style.display = "block";
    closeNav.style.display = "block";
    this.style.display = "none";
});
closeNav.addEventListener("click",function(){
    smallScreenNav.style.display = "none";
    openNav.style.display = "block";
    this.style.display = "none";
})

// show error mwssage when users submitted the form whith no link
const form = document.forms[0];
const formField = form.elements.link;

form.addEventListener("submit", function(e){
    if(formField.value == ""){
        e.preventDefault();
        document.querySelector(".error").style.display = "block";
        formField.style.borderColor = "hsl(0, 87%, 67%)"
    }
});
formField.addEventListener("focus", function(){
    document.querySelector(".error").style.display = "none";
    this.style.borderColor = "hsl(0, 0%, 100%)"
});