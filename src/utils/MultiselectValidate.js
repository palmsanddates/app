function setToInvalid() {
    if(document.querySelector('.search-wrapper').classList.contains("valid-border")) {
        document.querySelector('.search-wrapper').classList.remove("valid-border");
    }
    document.querySelector('.search-wrapper').classList.add("invalid-border")
    document.getElementById('valid-club').style.display = 'block'
}
function setDeaultValue() {
    if(document.querySelector('.search-wrapper').classList.contains("invalid-border")) {
        document.querySelector('.search-wrapper').classList.remove("invalid-border")
    }
    if(document.querySelector('.search-wrapper').classList.contains("valid-border")) {
        document.querySelector('.search-wrapper').classList.remove("valid-border");
    }
    document.getElementById('valid-club').style.display = 'none'
}
function setToValid() {
    if(document.querySelector('.search-wrapper').classList.contains("invalid-border")) {
        document.querySelector('.search-wrapper').classList.remove("invalid-border")
    }
    document.querySelector('.search-wrapper').classList.add("valid-border")
    document.querySelector('.search-wrapper').classList.remove("invalid-border")
    document.getElementById('valid-club').style.display = 'none'
}

export { setToInvalid, setDeaultValue, setToValid };