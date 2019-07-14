$(document).ready(function() {

    var myQuestions = [
        {
            question: "What is 10/2?",
            answers: {
                a: '3',
                b: '5',
                c: '115'
            },
            correctAnswer: 'b'
        },
        {
            question: "What is 30/3?",
            answers: {
                a: '3',
                b: '5',
                c: '10'
            },
            correctAnswer: 'c'
        }
    ];

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
            resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        }

        // show questions right away, hide start button and display done button
        //showQuestions(questions, quizContainer);
       submitButton.onclick = function() {
            // showQuestions(questions, quizContainer);
            // console.log("Ok");
            // console.log(submitButton);
            showQuestions(questions, quizContainer);
            submitButton.style.display = "none";
            doneButton.style.display = "block";


        };

        
        // clicking Done button, shows results of quiz
        doneButton.onclick = function(){
            showResults(questions, quizContainer, resultsContainer);
        }

    }
    

});