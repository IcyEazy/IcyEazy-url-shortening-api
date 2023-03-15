let illustrationImage = document.getElementById("illustration"),
    menuBtns = document.querySelector(".menu-btns"),
    openBtn = document.getElementById("open-btn"),
    closeBtn = document.getElementById("close-btn"),
    mobileMenu = document.querySelector(".menu"),
    statisticsDiv = document.querySelector(".statistics"),
    inputField = document.querySelector("input"),
    errorMsg = document.querySelector(".error-msg"),
    submitBtn = document.getElementById("submit-btn");


inputField.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        if(inputField.value !== ''){
            fetchData();
            inputField.classList.remove("error");
            errorMsg.classList.remove("show");
        }
        else{
            inputField.classList.add("error");
            errorMsg.classList.add("show");
        }
    }
});

submitBtn.addEventListener("click", function(){
    if(inputField.value !== ''){
        fetchData();
        inputField.classList.remove("error");
        errorMsg.classList.remove("show");
    }
    else{
        inputField.classList.add("error");
        errorMsg.classList.add("show");
    }
});

function fetchData(){
    let api = "https://api.shrtco.de/v2/shorten?url=";
    let inputValue = inputField.value;
    let url = api + inputValue;

    fetch(url, {method: 'GET'})
    .then(data => {
        return data.json();
    })
    .then(link => {
        let shortenedLnk = link.result.full_short_link;
        console.log(shortenedLnk);
        const shortLink = document.createElement("div"),
            typedLink = document.createElement("p"),
            copied = document.createElement("div"),
            shortendLink = document.createElement("p"),
            copyBtn = document.createElement("button");

        shortLink.className = 'short-link';
        typedLink.className = 'typed-link';
        typedLink.innerText = inputField.value;
        copied.className = 'copied';
        shortendLink.className = 'shortened-link';
        shortendLink.id = "item-to-copy";
        shortendLink.innerText = shortenedLnk;
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.onclick = function(){
            copyToClipboard();
            copyBtn.textContent = "Copied";
            setTimeout(function(){
                typedLink.parentElement.remove();
            }, 5000);
        }
        copyBtn.ontouchstart = function(){
            copyToClipboard();
        }
        copied.appendChild(shortendLink);
        copied.appendChild(copyBtn);
        shortLink.appendChild(typedLink);
        shortLink.appendChild(copied);
        statisticsDiv.prepend(shortLink);

        function copyToClipboard() {
            const str = document.getElementById('item-to-copy').innerText
            const el = document.createElement('textarea')
            el.value = str
            el.setAttribute('readonly', '')
            el.style.position = 'absolute'
            el.style.left = '-9999px'
            document.body.appendChild(el)
            el.select()
            document.execCommand('copy')
            document.body.removeChild(el)
            // alert("Copied the link: " + el.value);
        }
    })
    .catch(error => {
        console.error(error);
    })
}

menuBtns.addEventListener("click", function(){
    openBtn.classList.toggle("hide");
    illustrationImage.classList.toggle("hide");
    closeBtn.classList.toggle("show");
    mobileMenu.classList.toggle("show");

});

// function copyTexts(){
//     inputField.select();
//     inputField.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(inputField.value);
//     alert("Copied the text: " + inputField.value);
// }