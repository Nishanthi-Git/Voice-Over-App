
let speech = new SpeechSynthesisUtterance();
const textInput = document.getElementById("input-text");
const languageSelect = document.getElementById("language");
const listenBtn = document.querySelector(".listen");
const pitchSlider = document.getElementById("pitch");
const pitchDisplay = document.getElementById("pitch-display");
const rateSlider = document.getElementById("rate");
const speedDisplay = document.getElementById("speed-display");
const downloadBtn = document.querySelector('.download');

let languages = [];
let previousVoiceIndex = 0; // Variable to store the previously selected voice index



// Function to detect if text is English
function isEnglish(text) {
    // Check if the text contains non-English characters
    const nonEnglishRegex = /[^\x00-\x7F]+/; // Matches any non-ASCII character
    return !nonEnglishRegex.test(text); // Returns true if text is English
}

// Load voices and populate language options
window.speechSynthesis.onvoiceschanged = () => {
    languages = window.speechSynthesis.getVoices();


    // speech.voice = languages[0]; // ==> Set default voice


     // Populate the languageSelect dropdown
     languages.forEach((voice, i) => {
        languageSelect.options[i] = new Option(voice.name, i);
    });

    // Set the previously selected voice or the default
    languageSelect.value = previousVoiceIndex;
    speech.voice = languages[previousVoiceIndex];
};

// Change voice based on user selection
languageSelect.addEventListener("change", () => {
    const selectedIndex = languageSelect.value; // Get the selected voice index
    previousVoiceIndex = selectedIndex;        // Store the selected index
    speech.voice = languages[selectedIndex];
});

// Update pitch display
pitchSlider.addEventListener("input", () => {
    pitchDisplay.textContent = ": " + pitchSlider.value;
});

// Update rate display
rateSlider.addEventListener("input", () => {
    speedDisplay.textContent = ": " + rateSlider.value;
});

// Handle text-to-speech on button click
listenBtn.addEventListener("click", () => {
    const inputText = textInput.value;

    if (!inputText) {
        showCenteredAlert(" ✍️ Please enter some text!");
        return;
    }
    

    // Check if the text is in English or non-English
    if (!isEnglish(inputText)) {
        // Show alert if the text is non-English
        showCenteredAlert(" ❗ Please select the appropriate language!");
        return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Set speech properties
    speech.text = inputText;
    speech.pitch = parseFloat(pitchSlider.value);
    speech.rate = parseFloat(rateSlider.value);

    // Speak the text
    window.speechSynthesis.speak(speech);
});

// Function to show an alert in the center of the screen
function showCenteredAlert(message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.style.position = "fixed";
    alertBox.style.width = "280px"
    alertBox.style.textAlign = "center"
    alertBox.style.top = "50%";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translate(-50%, -50%)";
    alertBox.style.backgroundColor = "orangered";
    alertBox.style.color = "white";
    alertBox.style.padding = "20px";
    alertBox.style.borderRadius = "10px";
    alertBox.style.boxShadow = "0 0 10px rgba(249, 246, 246, 0.3)";
    alertBox.style.zIndex = "1000";
    document.body.appendChild(alertBox);

    // Remove the alert box after 3 seconds
    setTimeout(() => {
        document.body.removeChild(alertBox);
    }, 3000);
}


// (Optional) Add functionality for downloadBtn
downloadBtn.addEventListener("click", () => {
    showCenteredAlert("🙏 Download functionality is not implemented yet.");
});






/* USING API */

// const apiKey = "00721d9d405e4040a94c2be9d0fb7a22";
// const textInput = document.getElementById("input-text");
// const languageSelect = document.getElementById("language");
// const listenBtn = document.querySelector (".listen");
// const pitchSlider = document.getElementById('pitch');
// const pitchDisplay = document.getElementById ('pitch-display');
// const rateSlider = document.getElementById('rate');
// const speedDisplay = document.getElementById ('speed-display');
// const downloadBtn = document.querySelector('.download');

/*   

Advanced: Fetch Languages from an API

function fetchLanguages(){
    fetch("https://example.com/api/supported-languages")
    .then(response => response.json())
    .then (data => {
        for (const [code,name] of Object.entries(data)){
            const option = document.createElement("option");
            option.textContent = name;
            languageSelect.appendChild(option);
        }
    })
    
    .catch(error => console.error("Error fetching languages:", error));
}



// Call fetchLanguages instead of populateLanguages
document.addEventListener("DOMContentLoaded", fetchLanguages);


*/

// let audio;

// listenBtn.addEventListener("click", () => {
//     const text = textInput.value;
//     const language = languageSelect.value;
//     const pitch = pitchSlider.value;
//     const rate = rateSlider.value;

//     if (!text) {
//         alert("Please enter some text!");
//         return;
//     }
//     console.log("Pitch:", pitch);
//     console.log("Rate:", rate);
//     // Construct the API URL
//     const apiUrl = `https://api.voicerss.org/?key=${apiKey}&hl=${language}&src=${encodeURIComponent(
//         text
//     )}&c=MP3&f=44khz_16bit_stereo&pitch=${pitch}&rate=${rate}`;

//     // Create an Audio object and play the audio
//     audio = new Audio(apiUrl);
//     audio.play().catch(error => {
//         console.error("Error playing audio:", error);
//         alert("Failed to play the audio. Please try again.");
//     });
    
    

// });



// downloadBtn.addEventListener('click', () => {
    

//     if (audio && audio.src) {

//     const link = document.createElement('a');
//     link.href = audio.src;
//     link.download = 'VO-output.mp3';
//     link.click();

// } else {
//     alert('Generate audio first!');
// }
// })
