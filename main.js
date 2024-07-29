let nameGame = "Guess The Word "
document.querySelector("h1").innerHTML = nameGame 
document.querySelector("footer").innerHTML = ` ${nameGame} Game Created By Mohamed Gamal`
document.title = "Guess The Word"

let numOfLetter = 6
let numOfTries = 6
let current = 1
let hents = 2

let Word = ""
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School" , "shehab" , "number" , "follow" , "letter" ];
Word = words[Math.floor(Math.random() * words.length)].toLowerCase()
let message = document.querySelector(".message")
console.log(Word)

let hentSpan = document.querySelector(".hent span")
let hentButton = document.querySelector(".hent")
hentSpan.innerHTML = hents
hentButton.addEventListener("click" , getHent)

function generateInput () {
    let inputContainer = document.querySelector(".inputs")
    for (let i = 1 ; i <= numOfTries ; i++) {
        let tryDiv = document.createElement("div")
        tryDiv.className = `try-${i}`
        tryDiv.innerHTML = `<span>Try ${i} </span>`
        inputContainer.appendChild(tryDiv)

        if (i !== 1) tryDiv.classList.add("disable")
            for ( let j = 1 ; j <= numOfLetter ; j++) {
                let input = document.createElement("input")
                input.type = "text"
                input.id = `gusse ${i} letter-${j}`
                input.maxLength = 1
                tryDiv.appendChild(input)
                
        }
    }
    inputContainer.children[0].children[1].focus()

    let disableInput = document.querySelectorAll(".disable input")
    disableInput.forEach((input) => (input.disabled = true))

    let inputs = document.querySelectorAll("input") 
    inputs.forEach((input  ,index) => {
        input.addEventListener ("input" , function () {
            this.value = this.value.toUpperCase()
            let next = inputs[index + 1]
            if (next) next.focus()
            
        })

        input.addEventListener ("keydown" , function (event) {
            let inputsArr = Array.from(inputs).indexOf(this)
            if (event.key === "ArrowRight") {
                let next = inputsArr + 1
                // console.log(next)
                // if (next < inputs.length) inputs[next].focus()
                // console.log(inputs.length)
                if (next < inputs.length) inputs[next].focus()
            }
            if (event.key === "ArrowLeft") {
                let past = inputsArr - 1
                // console.log(past)
                // console.log(inputsArr)
                // if (next < inputs.length) inputs[next].focus()
                // console.log(inputs.length)
                if (past >= 0) inputs[past].focus()
            }
        })
    })
    

}

let check = document.querySelector(".check")
check.addEventListener("click" , handle)

function handle () {
    let success = true
    for (i = 1 ; i <= numOfLetter ; i++) {
        let inputField = document.getElementById(`gusse ${current} letter-${i}`)
        let letter = inputField.value.toLowerCase()
        let chosenWord = Word[i - 1]
        // console.log(letter)
        // console.log(chosenWord)

            if (letter === chosenWord) {
                inputField.classList.add("color1")
            }else if (Word.includes(letter) && letter !== "")  {
                inputField.classList.add("color2")
                success = false
            }else {
                inputField.classList.add("color3")
                success = false
            }
    }
    if (success) {
        message.innerHTML = `You are Winner`
        let allInput = document.querySelectorAll(".inputs > div")
        allInput.forEach((input) => input.classList.add("disable"))
        check.disabled = true
        hentButton.disabled = true
    }else {
        document.querySelector(`.try-${current}`).classList.add("disable")
        let currentTryInputs = document.querySelectorAll(`.try-${current} input`)
        currentTryInputs.forEach((input) => input.disabled =true)
        current++
        let nextTryInput = document.querySelectorAll(`.try-${current} input`)
        nextTryInput.forEach((input) => input.disabled =false)

        let el = document.querySelector(`.try-${current}`)

        if (el) {
            document.querySelector(`.try-${current}`).classList.remove("disable")
            el.children[1].focus()
        }else {
            check.disabled = true
            hentButton.disabled =true
            message.innerHTML = `Game Over, The Word Is ${Word}`
        }
    }
}

function getHent () {
    if (hents > 0) {
        hents--
        hentSpan.innerHTML = hents
    }
    if (hents === 0) {
        hentButton.disabled =true
    }

    let enableInput = document.querySelectorAll("input:not([disabled])")
    // console.log(enableInput)
    let emptyenableinput = Array.from(enableInput).filter((el) => el.value === "")
    // console.log(emptyenableinput)

    if (emptyenableinput.length > 0) {
        let random = Math.floor(Math.random() * emptyenableinput.length)
        let randomInput = emptyenableinput[random]
        let indexfiled = Array.from(enableInput).indexOf(randomInput)
        // console.log(indexfiled)
        // console.log(random)
        // console.log(randomInput)
        if (random !== -1) {
            randomInput.value = Word[indexfiled].toLocaleUpperCase()
        }


    }
}

document.addEventListener("keydown" , backspace) 

function backspace (event) {
    if (event.key === "Backspace") {
        let inputs = document.querySelectorAll("input:not([disabled])")
        let currentindex = Array.from(inputs).indexOf(document.activeElement)
        if (currentindex > 0) {
        let past = currentindex - 1
        inputs[currentindex].value = ""
        inputs[past].value = ""
        inputs[past].focus()
        }
    }
}



window.onload = function () {
    generateInput()
}

