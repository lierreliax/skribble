    let incorrectGuess = 0;
    const maxIncorrectGuess = 3;
    let remainingLives = maxIncorrectGuess; 
    let remainingHints = 3;
    let currentQuestion = 0;
    let points = 0;
    let currentDifficulty = "easy";
    let currentAnswer;
    let guessButtons = [];
        

    const easyQuestions = [
        { question: 'What country did the BMW originated?', answer: 'GERMANY' },
        { question: 'Is the galaxy that includes the Solar System, with the name describing the galaxy appearance from earth.', answer: 'MILKYWAY' },
        { question: 'Was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology.', answer: 'STEPHENHAWKING' },
        { question: 'Was an Argentine Marxist revolutionary, physician, author, guerrilla leader, diplomat, and military theorist.', answer: 'CHEGUEVERA' },
        { question: 'What is the highest-grossing holiday movie of all time?', answer: 'HOMEALONE' },
        { question: 'What did Mitsubishi produce aside from vehicles in the past?', answer: 'PLANES' },
        { question: 'On the periodic table, which element has an atomic weight of 1.00794?', answer: 'HYDROGEN' },
        { question: 'Which planet has moons that are nearly all named after Shakespearean characters?', answer: 'URANUS' },
        { question: 'Dendrophobia is the fear of what?', answer: 'TREES' },
        { question: 'What is the only bird known to fly backward?', answer: 'HUMMINGBIRD' },
    ];

    const mediumQuestions = [
        { question: 'Refers to the object that is currently running the function.', answer: 'THIS' },
        { question: 'Refers to creating a personal copy of someone else project', answer: 'FORK' },
        { question: 'Proposed change to a repository on GitHub.', answer: 'PULLREQUEST' },
        { question: 'Is an automation tool that allows developers to define workflows for their projects.', answer: 'GITHUBACTIONS' },
        { question: 'Feature allows users to experiment with code directly on the W3Schools website.', answer: 'TRYITYOURSELF' },
        { question: 'This technique involves attaching a single event listener to a shared parent element, enabling it to handle events for multiple child elements.', answer: 'EVENTDELEGATION' },
        { question: 'Is block-scoped but cannot be reassigned.', answer: 'CONST' },
        { question: 'Contains boolean properties related to the validity of an input element.', answer: 'VALIDITY' },
        { question: 'The user will have to click ok to proceed?', answer: 'ALERTBOX' },
        { question: 'Is block-scoped and can be reassigned.', answer: 'LET' },
    ];

    const hardQuestions = [
        { question: 'Specifies the HTTP method to be used when submitting the form date. Can be set to get or post', answer: 'METHODATTRIBUTE' },
        { question: 'Specifies where to display the response that is received after submitting the form.', answer: 'ACTIONATTRIBUTE' },
        { question: 'Written with or without decimals', answer: 'NUMBERS' },
        { question: 'Written with double or single quotes', answer: 'STRING' },
        { question: 'is denoted by two hyphens (--). It is used to decrease the numeric value of its operand by one.', answer: 'DECREMENTOPERATOR' },
        { question: 'is used to perform different actions based on different conditions.', answer: 'SWITCHSTATEMENT' },
        { question: 'defined using var, let or const', answer: 'GLOBALSCOPE' },
        { question: 'is denoted by two plus signs (++). It is used to increase the incremented value.', answer: 'INCREMENTOPERATOR' },
        { question: 'is a value that has no properties or methods.', answer: 'PRIMITIVEVALUE' },
        { question: 'It is a standard OOP model programming interface of a JS.', answer: 'DOM' },
    ];
    

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }


    shuffleArray(easyQuestions);
    shuffleArray(mediumQuestions);
    shuffleArray(hardQuestions);


    var usedLetters = [];

    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
        'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];


    document.addEventListener('DOMContentLoaded', () => {
        const alphabetButtonsContainer = document.getElementById('alphabet-buttons');
        const difficultyElement = document.getElementById('difficulty');


        const hintContainer = document.getElementById('hint-container');
        // const restartGameBtn = document.getElementById('restartGame');
        const nextWordBtn = document.getElementById('nextWordBtn')

        hintContainer.addEventListener('click', showHintPopup);
        // restartGameBtn.addEventListener('click', restartGame);
        nextWordBtn.addEventListener('click', nextQuestion);


        currentAnswer = easyQuestions[0].answer.toUpperCase(); //answer

        const livesElement = document.getElementById('lives');

        alphabet.forEach(letter => {
            const button = document.createElement('button');
            button.classList.add('button');
            button.textContent = letter;
            
            button.addEventListener('click', () => {
                //Button click logic

                if (usedLetters.includes(letter)) {
                    console.log(`Letter ${letter} has been used.`);
                    return;
                }

                usedLetters.push(letter); // Add the clicked letter to the usedLetters array
                

                if (includesLetter(currentAnswer, letter)) {
                    console.log(`Letter ${letter} is in the answer.`);

                    // Iterate through all occurrences of the letter in the answer
                    for (let i = 0; i < currentAnswer.length; i++) {
                        if (currentAnswer[i] === letter) {
                            guessButtons[i].textContent = letter;
                        }
                    }

                    button.classList.add('correct');

                    if (isGuessed(currentAnswer)) {
                        console.log("The word has been fully guessed!");
                    }
                    
                    } else {
                        button.disabled = true;
                        console.log(`Letter ${letter} is not in the answer.`);
                        remainingLives--;
                        updateLivesUI();
                    }

                console.log(`Button ${letter} clicked! Incorrect guesses: ${incorrectGuess}`);
            });

            alphabetButtonsContainer.appendChild(button);
        });

        //questions
        let questionElement = document.getElementById('question');
        questionElement.textContent = easyQuestions[0].question;

        let guessesContainer = document.getElementById('guesses');


        for (let i = 0; i < currentAnswer.length; i++) {
            let guess = document.createElement('button');
            guess.classList.add('guess');
            guess.textContent = ' ';
            guessesContainer.appendChild(guess);
            guessButtons.push(guess);
        }

        function includesLetter(answer, letter) {
            // Helper function to check if the answer includes the letter, ignoring spaces
            const formattedAnswer = answer.replace(/ /g, ''); // Remove spaces from the answer
            return formattedAnswer.includes(letter);
        }


        function isGuessed(answer) {
            // Checks if all non-space characters in the answer have been guessed
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] !== ' ' && guessButtons[i].textContent === ' ') {
                    return false;
                }
            }

            const overlay = document.getElementById('overlay');
            const modal = document.getElementById('guessedWordModal');
            const guessedWord = document.getElementById('guessedWord')
            overlay.style.display = 'block';
            modal.style.display = 'block';
            guessedWord.innerText=answer



            return true;
        }


        // function isGuessed() {   //checks if the "button".guess may laman na letter 
        //     for (let i = 0; i < currentAnswer.length; i++) {
        //         if (guessButtons[i].textContent === ' ') {
        //             return false; 
        //         }
        //     }
        //     return true; 
        // }

        function createButtons(word) {
            guessesContainer.innerHTML = '';
            for (let i = 0; i < word.length; i++) {
            let guess = document.createElement('button');
            guess.classList.add('guess');
            guess.textContent = ' ';
            guessesContainer.appendChild(guess);
            guessButtons.push(guess);
            }
        }

        function checkDifficultyCompletion() {
            let questionsSet;
            

            if (currentDifficulty === "easy") {
                questionsSet = easyQuestions;
            } else if (currentDifficulty === "medium") {
                questionsSet = mediumQuestions;
                
            } else if (currentDifficulty === "hard") {
                questionsSet = hardQuestions;
                
            }

            if (currentQuestion >= questionsSet.length) {
                if (currentDifficulty === "easy") {
                    currentDifficulty = "medium";
                    difficultyElement.textContent = "Medium Round";
                } else if (currentDifficulty === "medium") {
                    difficultyElement.textContent = "Hard Difficulty";
                    currentDifficulty = "hard";
                } else if (currentDifficulty === "hard") {
                    window.alert("You have won! congratulations. Press OK to play again");
                    location.reload();
                }

                currentQuestion = 0; // Reset currentQuestion for the new difficulty
                // Display a message or perform any other action to indicate the change of difficulty
                console.log(`Difficulty changed to ${currentDifficulty}.`);
            }
        }

        function nextQuestion() {
            currentQuestion++; // Move to the next question
            checkDifficultyCompletion();

            while (guessesContainer.firstChild) {
                guessesContainer.removeChild(guessesContainer.firstChild);
            }
            
            guessButtons = []; // Reset the guessButtons array
            
            let questionsSet;   //pang set ng difficulty
            if (currentDifficulty === "easy") {
                questionsSet = easyQuestions;
            } else if (currentDifficulty === "medium") {
                questionsSet = mediumQuestions;
            } else if (currentDifficulty === "hard") {
                questionsSet = hardQuestions;
            }

            if (currentQuestion >= questionsSet.length) {
                if (currentDifficulty === "easy") {
                    currentDifficulty = "medium";
                } else if (currentDifficulty === "medium") {
                    currentDifficulty = "hard";
                } else if (currentDifficulty === "hard") {
                    console.log("All questions have been answered.");
                    return;
                }

                currentQuestion = 0; // Reset currentQuestion for the new difficulty
                // Display a message or perform any other action to indicate the change of difficulty
                console.log(`Difficulty changed to ${currentDifficulty}.`);
            }
        
        
            // Reset variables
            incorrectGuess = 0;
            usedLetters = [];
        
            points += 10; // Add points
            document.getElementById('score').innerHTML = `<p><strong>Points:</strong> ${points}</p>`;

            const overlay = document.getElementById('overlay');
            const modal = document.getElementById('guessedWordModal');
            overlay.style.display = 'none';
            modal.style.display = 'none';

        
            guessButtons.forEach(guess => { // Reset the display
                guess.textContent = ' ';
                guess.disabled = false;
            });
        
            alphabetButtonsContainer.querySelectorAll('.button').forEach(button => {
                button.classList.remove('correct'); 
                button.disabled = false; 
            });
        
            questionElement.textContent = questionsSet[currentQuestion].question;
            currentAnswer = questionsSet[currentQuestion].answer.toUpperCase();

            createButtons(currentAnswer);
        }

        // function checkIncorrect(){
        //     if (incorrectGuess === maxIncorrectGuess){
        //         alphabetButtonsContainer.querySelectorAll('.button').forEach(button => {
        //             button.disabled = true;
        //         });
        //         window.alert("You have ran out of lives, press OK to retry");
        //         location.reload();
        //     }
        // } //pang check if 3 incorrect na

        function updateLivesUI() {
            console.log("Updating lives UI");
        
            const livesContainer = document.getElementById('lives-container');
            if (livesContainer) {
                livesContainer.innerHTML = `<p> <strong>Lives: </strong> ${remainingLives} </p>`;
        
                if (remainingLives === 0) {
                    const overlay = document.getElementById('overlay');
                    const modal = document.getElementById('gameOverModal');
                    overlay.style.display = 'block';
                    modal.style.display = 'block';
                }
            } else {
                console.error("Lives container not found");
            }
        }

        function showHintPopup() {
            const hintPopup = document.getElementById('hintPopup');
            const overlay = document.getElementById('overlay');
        
            if (remainingHints > 0) {
                hintPopup.style.display = 'block';
                overlay.style.display = 'block';
            } else {
                showInsufficientPointsPopup("You ran out of hints!"); // Show a different message or handle as needed
            }
        }

        



    });
    function restartGame() {
        console.log('Restarting the game...');
        window.location.reload();
    }


    let consonants = "BCDFGHJKLMNPQRSTVWXYZ";
    let vowels = "AEIOU";

    function closeHintPopup() {
        const hintPopup = document.getElementById('hintPopup');
        const overlay = document.getElementById('overlay');
        hintPopup.style.display = 'none';
        overlay.style.display = 'none';
    }


    function useHint(hintType) {
        const hintPopup = document.getElementById('hintPopup');
        hintPopup.style.display = 'none';

        let revealedLetter;

        if (hintType === 'consonant') {
            revealedLetter = getUnrevealedLetter(consonants);
        } else if (hintType === 'vowel') {
            revealedLetter = getUnrevealedLetter(vowels);
        }

            if (revealedLetter !== null) {
                if (points >= 25) {
                    revealLetter(revealedLetter);
                    findButtonByLetter(revealedLetter)
                    updateHint();
                    closeHintPopup();
                    deductPoints(25);

                    if (isGuessed(currentAnswer)) {
                        console.log("The word has been fully guessed!");
                    }
                } else {
        
                showInsufficientPointsPopup(); 
            }
        } else {
            showInsufficientPointsPopup("No more letters to reveal for this hint type.");
        }
    }

    function findButtonByLetter(letter) {
        const upperCaseLetter = letter.toUpperCase();
        const buttons = document.querySelectorAll('.button');
        console.log('Received ', upperCaseLetter)

        for (const button of buttons) {
            if (button.textContent === upperCaseLetter) {
                button.classList.add('correct');
                console.log(`Button with letter ${upperCaseLetter} found with class:`, button.className);
            }
        }

        console.log(`No button found with the letter ${upperCaseLetter}`);
        return null;
    }

    function deductPoints(pointsToDeduct) {
        points -= pointsToDeduct;
        if (points < 0) {
            points = 0;
        }

        document.getElementById('score').innerHTML = `<p><strong>Points:</strong> ${points}</p>`;

    }


    function updateHint() {
        remainingHints--;

        // Log the remainingHints to check if it's decreasing correctly
        console.log("Remaining Hints:", remainingHints);

        // Update the hint count in the HTML
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            hintContainer.innerHTML = `<strong>Hint:</strong> ${remainingHints}`;
        } else {
            console.error("Hint container not found");
        }
    }



    function showInsufficientPointsPopup(message = "Insufficient Points! You need at least 25 points to use a hint.") {
        const insufficientPointsPopup = document.getElementById('insufficientPointsPopup');
        const overlay = document.getElementById('overlay');

        insufficientPointsPopup.querySelector('.popup-content p').textContent = message;

        insufficientPointsPopup.style.display = 'block';
        overlay.style.display = 'block';
    }


    function closeInsufficientPointsPopup() {
        const insufficientPointsPopup = document.getElementById('insufficientPointsPopup');
        const overlay = document.getElementById('overlay');
        insufficientPointsPopup.style.display = 'none';
        overlay.style.display = 'none';
    }




    function getUnrevealedLetter(letterSet) {
        for (let i = 0; i < letterSet.length; i++) {
            const letter = letterSet[i].toUpperCase(); 

            if (!usedLetters.includes(letter) && currentAnswer.includes(letter)) {
                return letter;
            }
        }

        return null; 
    }


    function revealLetter(letter) {
        if (guessButtons.length === 0) {
            console.error('guessButtons array is empty.');
            return;
        }

        usedLetters.push(letter);
        closeHintPopup();

        // Find all instances of the letter in the answer
        for (let i = 0; i < currentAnswer.length; i++) {
            if (currentAnswer[i] === letter) {
                guessButtons[i].textContent = letter;
            }
        }

        console.log(`Letter ${letter} revealed.`);
    }


    const spans = document.querySelectorAll('.gameName span');

    spans.forEach((span, idx) => {
        span.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });
        
        // Initial animation
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx+1))
    });

