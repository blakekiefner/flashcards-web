let flashcards = [];
let currentFlashcardIndex = 0;
let showingAnswer = false;

// Fetch the flashcards from the JSON file
fetch('flashcards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        flashcards = data;
        shuffle(flashcards); // Shuffle the questions after loading them
        // Load the first flashcard after shuffling
        nextFlashcard();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to show the answer
function showAnswer() {
    if (flashcards.length === 0) return;

    const answerElement = document.getElementById("answer");
    if (!showingAnswer) {
        answerElement.textContent = flashcards[currentFlashcardIndex].answer;
        showingAnswer = true;
    }
}

// Function to load the next flashcard
function nextFlashcard() {
    if (flashcards.length === 0) return;

    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    const flashcardElement = document.getElementById("question");
    const answerElement = document.getElementById("answer");

    flashcardElement.textContent = flashcards[currentFlashcardIndex].question;
    answerElement.textContent = ""; // Clear the answer when loading the next question
    showingAnswer = false;
}
