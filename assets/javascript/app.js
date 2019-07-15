// quiz questions taken from laffgaff.com
// functions taken from class Demo 
// and from youtube tutorial "how to create an online quiz - https://www.codeexplained.org/2018/10/create-multiple-choice-quiz-using-javascript.html"

$(document).ready(function() {

    var myQuestions = [

        {
            question: "Which superhero gets their powers from their power ring?",
            answers: {
                a: 'The Flash',
                b: 'Wonder Woman',
                c: 'Super Girl',
                d: 'Green Lantern'
            },
            correctAnswer: 'd'
        },

        {
            question: "Which superhero's only weakness is kryptonite?",
            answers: {
                a: 'Wolverine',
                b: 'Spider Man',
                c: 'Super Man',
                d: 'Ant Man'
            },
            correctAnswer: 'c'
        },

        {
            question: "Diana Prince is the civilian identity of which superhero?",
            answers: {
                a: 'Wonder Woman',
                b: 'Batgirl',
                c: 'Elastigirl',
                d: 'Supergirl'
        },
            correctAnswer: 'a'
        },

        {
            question: "Which superhero has a butler named Alfred?",
            answers: {
                a: 'Wolverine',
                b: 'Bat Man',
                c: 'Spider Man',
                d: 'The Flash'
            },
            correctAnswer: 'b'
        },

        {
            question: "Which superhero owns a company called Stark Industries?",
            answers: {
                a: 'Supergirl',
                b: 'Captain America',
                c: 'Super Man',
                d: 'Iron Man'
            },
            correctAnswer: 'd'
        },

    ];

    // set my timer clock to 30 sec
    var timer = 30;

    // from class demo - this will hold our interval ID when we execute the start Clock function
    var intervalId;

    //var quizContainer = document.getElementById("quiz");
    var quizContainer = $("#quiz")[0];

    //var resultsContainer = document.getElementById("results");
    var resultsContainer = $("#results")[0];

    // var submitButton = document.getElementById("submit");

    // JQuery object thats wrapped around DOM object, [0] gives the raw DOM object
    var submitButton = $("#submit")[0];

    // var doneButton = document.getElementById("done");
    var doneButton = $("#done")[0];

// function call here
    generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

    function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

        function showQuestions(questions, quizContainer) {
            // we'll need a place to store the output and the answer choices
            var output = [];
            var answers;

            // for each question...
            for(var i=0; i < questions.length; i++) {
                
                // first reset the list of answers
                answers = [];

                // for each available answer...
                for(letter in questions[i].answers){

                    // ...add an html radio button
                    answers.push(
                        '<label>'
                            + '<input type="radio" name="question'+ i+ '" value="' + letter + '">'
                            + letter + ': '
                            + questions[i].answers[letter]
                        + '</label>'
                    );
                }

                // add this question and its answers to the output
                output.push(
                    '<div class="question">' + questions[i].question + '</div>'
                    + '<div class="answers">' + answers.join('') + '</div>'
                );
            }

            // finally combine our output list into one string of html and put it on the page
            quizContainer.innerHTML = output.join('');
            // quizContainer.html(output).join('');
            // quizContainer.empty().append(output.join(''));
        }

        // from class demo - this run function sets an interval that runs the decrement function once a second.
        //  *****BUG FIX******** 
        // Clearing the intervalId prior to setting our new intervalId will not allow multiple instances.
        function startClock() {

            clearInterval(intervalId);
            intervalId = setInterval(decrement, 1000);
        }

        //  from class demo - the decrement function
        function decrement() {
            //  Decrease number by one.
            timer--;

            //  Show the number in the #show-number tag.
            $("#timer").html("<h2> Time remaining " + timer + " secs</h2>");

            //  Once number hits zero...
            if (timer === 0) {

                //  ...run the stop function
                stop();
                showResults(questions, quizContainer, resultsContainer);

                //  Alert the user that time is up
                // alert("Time's Up!");

            }
        }

        //  stops the timer
        function stop () {
            // from class Demo 
            // Clears our intervalId
            // We just pass the name of the interval to the clearInterval function

            clearInterval(intervalId);
        }



        function showResults(questions, quizContainer, resultsContainer){
            
            // gather answer containers from our quiz
            var answerContainers = quizContainer.querySelectorAll('.answers');
            
            // keep track of user's answers
            var userAnswer = '';
            var numCorrect = 0;
            
            // for each question...
            for (var i=0; i < questions.length; i++) {

                // find selected answer
                userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
                
                // if answer is correct
                if (userAnswer === questions[i].correctAnswer){
                    // add to the number of correct answers
                    numCorrect++;
                    
                    // color the answers blue
                    answerContainers[i].style.color = 'blue';
                }
                // if answer is wrong or blank
                else {
                    // color the answers red
                    answerContainers[i].style.color = 'red';
                }
            }

            // show number of correct answers out of total
            resultsContainer.innerHTML = 'You got ' + numCorrect + ' out of ' + questions.length + ' questions right';
        }

        // show questions right away, hide start button and display done button
        //showQuestions(questions, quizContainer);
       submitButton.onclick = function() {
            // showQuestions(questions, quizContainer);
            // console.log("Ok");
            // console.log(submitButton);
            showQuestions(questions, quizContainer);
            startClock();
            submitButton.style.display = "none";
            doneButton.style.display = "block";


        };

        
        // clicking Done button, shows results of quiz and stops the timer
        doneButton.onclick = function(){
            showResults(questions, quizContainer, resultsContainer);
            stop();
        }

    }
    

});