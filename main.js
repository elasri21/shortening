//show and hide navigation links in small screens
const closeNav = document.querySelector(".close-nav");
const openNav = document.querySelector(".open-nav");
const smallScreenNav = document.querySelector(".nav");
const shortenContainer = document.querySelector(".shorten-links");
openNav.addEventListener("click",function(){
    smallScreenNav.style.display = "flex";
    closeNav.style.display = "flex";
    this.style.display = "none";
});
closeNav.addEventListener("click",function(){
    smallScreenNav.style.display = "none";
    openNav.style.display = "flex";
    this.style.display = "none";
})

// show error mwssage when users submitted the form whith no link
const form = document.forms[0];
const formField = form.elements.link;

form.addEventListener("submit", function(e){
    e.preventDefault();
    if(formField.value == ""){
        document.querySelector(".error").style.opacity = "1";
        formField.style.borderColor = "hsl(0, 87%, 67%)"
    } else {
        let url = formField.value.trim();
        fetch(`https://tinyurl.com/api-create.php?url=${url}`)
        .then(response => response.text())
        .then(shortUrl => {
            shortenContainer.innerHTML += `
            <div class="shorten-link">
                <p>${url}</p>
                <div class="copy">
                    <span>${shortUrl}</span>
                    <button>copy</button>
                </div>
            </div>
            `;
            if (localStorage.getItem('links')) {
                let arr = JSON.parse(localStorage.getItem('links'));
                arr.push({url, shortUrl});
                localStorage.setItem('links', JSON.stringify(arr));
            } else {
                localStorage.setItem('links', JSON.stringify([{url, shortUrl}]));
            }
            formField.value = "";
            const copyBtns = document.querySelectorAll(".copy button");
            copyShorten(copyBtns);
        })
        .catch(error => console.error('Error:', error));
    }
});
formField.addEventListener("focus", function(){
    document.querySelector(".error").style.opacity = "0";
    this.style.borderColor = "hsl(0, 0%, 100%)"
});

// copy shorten link
function copyShorten(btns) {
    btns.forEach(btn =>{
        btn.addEventListener("click", function() {
            this.textContent = 'copied!';
            this.style.backgroundColor = 'hsl(257, 27%, 26%)';
            copyText(this.previousElementSibling);
            setTimeout(function() {
                for (let i = 0; i < btns.length; i++) {
                    btns[i].textContent = 'copy';
                    btns[i].style.backgroundColor = 'hsl(180, 66%, 49%)';
                }
            }, 2000);
        });
    });
}
function copyText(shortenLink) {
    const textToCopy = shortenLink.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("copied");
    }).catch(err => {
        console.log(`Failed to copy: ${err}`);
    })
}

window.addEventListener("DOMContentLoaded", function() {
    if (this.localStorage.getItem("links")) {
        let links = JSON.parse(this.localStorage.getItem('links'));
        console.log(links);
        links.forEach( item=> {
            shortenContainer.innerHTML += `
            <div class="shorten-link">
                <p>${item.url}</p>
                <div class="copy">
                    <span>${item.shortUrl}</span>
                    <button>copy</button>
                </div>
            </div>
            `;
        });
        const copyButtons = this.document.querySelectorAll(".copy button");
        copyShorten(copyButtons);
    }
});



