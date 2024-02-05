const hex = document.getElementById("hex");
const copyBtn = document.getElementById("copyBtn");
const changeColorBtn = document.getElementById("changeColorBtn");


changeColorBtn.addEventListener('click',changeColor);

function changeColor(){
    // Math.floor(Math.random()*16777215).toString(16)
    var hexCode = Math.floor(Math.random()*16777215).toString(16);
    hex.textContent = `#${hexCode}`;
    document.body.style.backgroundColor = `#${hexCode}`;
}


copyBtn.addEventListener('click',copy);

function copy(){
    navigator.clipboard.writeText(hex.textContent);

    copyBtn.textContent = "Copied";
    copyBtn.style.backgroundColor = "green";
    copyBtn.style.color = "white";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.style.backgroundColor = "";
        copyBtn.style.color = "";   
    }, 1000); //ms 100ms = 1s

}