document.getElementById("button").addEventListener("click", displaySentence);
document.getElementById("copyButton").addEventListener("click", copySentence);

let sentences = []; // Array to store the sentences
let currentIndex = 0; // Index to keep track of the current sentence

function displaySentence() {
    if (currentIndex < sentences.length) {
        const sentence = sentences[currentIndex];
        document.getElementById("display").textContent = sentence;
        currentIndex++;
        document.getElementById("copyButton").disabled = false;
    } else {
        document.getElementById("display").textContent = "No more sentences.";
        document.getElementById("button").disabled = true;
        document.getElementById("copyButton").disabled = true;
    }
}

function copySentence() {
    const sentence = sentences[currentIndex - 1];
    const tempInput = document.createElement("input");
    tempInput.value = sentence;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Sentence copied: " + sentence);
}

fetch("sentences.txt")
    .then(response => response.text())
    .then(data => {
        sentences = data.split("\n").filter(Boolean);
        if (sentences.length === 0) {
            document.getElementById("display").textContent = "No sentences available.";
            document.getElementById("button").disabled = true;
        } else {
            displaySentence();
        }
    })
    .catch(error => {
        console.log("Error:", error);
    });
