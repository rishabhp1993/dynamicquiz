var allQuestionSet = [
  {
    question: "India’s first-ever national police museum will establish in which city?",
    choices: ["Chennai", "Delhi", "Nagpur", "Kolkata"],
    correctAnswer: 1
    },
  {
    question: "Which country will host the 45th G7 summit 2019?",
    choices: ["Italy", "France", "Germany", "Canada"],
    correctAnswer: 1
    },
  {
    question: "Which country’s women cricket team has clinched the Asia Cup Twenty-20 tournament 2018?",
    choices: ["South Korea", "Bangladesh", "India", "Pakistan"],
    correctAnswer: 1
    },
  {
    question: "Who has won the men’s singles French Open tennis tournament 2018?",
    choices: ["Novak Djokovic", "Dominic Thiem", "Roger Federer", "Rafael Nadal"],
    correctAnswer: 2
    },
  {
    question: "Which country’s football team has lifted the 2018 Intercontinental Cup football title?",
    choices: ["India", "Sri Lanka", "Kenya", "Argentina"],
    correctAnswer: 0
    },
  {
    question: "Which of the following personalities from India is the only winner of Special Oscar in the history of Indian Cinema so far?",
    choices: ["Mrinal Sen", "Shyam Bengal", "Satyajit Ray", "Mira Nair "],
    correctAnswer: 2
      },
  {
    question: "Who wrote Arthashastra?",
    choices: ["Kalhan", "Visakhadatta", "Bana Bhatta", "Chanakya"],
    correctAnswer: 3
      }, {
    question: "H.J. Kania was the first...",
    choices: ["Chief Justice of the Supreme Court of India", "Attorney-General of India", "Solicitor-General of India", "None of them"],
    correctAnswer: 0
      }, {
    question: "Which is the world’s largest dry desert?",
    choices: ["Sahara", "Thar of Desert", "Black Rock Desert", "Gobi Desert"],
    correctAnswer: 0
      }, {
    question: "What is the best conductor of electricity?",
    choices: ["Salt Water", "Green Water", "Cold Water", "Sweet Water"],
    correctAnswer: 0
      }
    ];


var questionSet;
var correct = 0;
var selected = [];
var position = 0;

$(document).ready(function() {

  $('#previous').hide();
  // Show the user the start screen to begin with
  document.getElementById('start-container').style.display = 'block';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('score-container').style.display = 'none';

  // When the user clicks the start button show the first question
  $("#start, #restart").click(function() {
    position = 0;
    correct = 0;
    selected = [];
    shuffle();
    document.getElementById("start-container").style.display = 'none';
    document.getElementById("score-container").style.display = 'none';
    showQuestion();
    $("#resulthead").remove();
    $("#btnsubmit").hide();
    $("#quiz-container").fadeIn("slow");
    $("#pie").remove();

  });

  function shuffle() {
    questionSet = allQuestionSet.sort(() => 0.5 - Math.random()).slice(-5);
  }
  // When user selects an option
  $(document).on('click', '.radio', function(event) {

    if (event.target.nodeName == 'LABEL') {
      if (position == 5) {
        alert("You cannot change your Response.")
      } else {
        $('.radio').removeClass('greenbg');
        $(this).addClass('greenbg');
        var clicked = $(this).attr('for');
        checkAnswer(clicked);
      }
    }
  });
  $(document).on('click', '.radio input', function(event) {
    event.stopPropagation();
  });


  // Function that creates the HTML for the question in the current position
  function showQuestion() {
    if (position == 5) {
      $("#btnsubmit").css("display", "inline-block");
    } else {
      document.getElementById("question").innerHTML = null;
      document.getElementById("answers").innerHTML = null;

      if (position < questionSet.length) {
        document.getElementById("question").innerHTML += (position + 1) + ") " + questionSet[position].question;
        for (var i = 0; i < questionSet[position].choices.length; i++) {
          document.getElementById("answers").innerHTML +=
            "<label class='radio' for='" +
            questionSet[position].choices[i] +
            "'>" +
            questionSet[position].choices[i] +
            "<input id='" +
            questionSet[position].choices[i] +
            "' type='radio' name='options' value='" +
            questionSet[position].choices[i] + "'></label><br>"
        }
      } else {
        document.getElementById("quiz-container").style.display = 'none';
        
        document.getElementById("quiz-container").style.display = 'none';
        $("#score-container").prepend("<h1 id='resulthead'>You got " 
        + correct 
        + " questions correct!</h1>").fadeIn(300);

        $("#piediv").append("<div class='pie' id='pie' style='background-image: conic-gradient(#2C85FD "
        +correct*20+"%, #C9C9C9 "
        +0
        +"%);'><span class='lblcorrectperc'>"+correct*20+"% Correct</span><span class='lblincorrectperc'>"+(100-(correct*20))+"% Incorrect</span></div>").fadeIn(300);
      }
    }
  }

  // Function that checks to see if the answer is correct
  function checkAnswer(clickedValue) {
    selected.push(clickedValue);
    var correctAnswer = questionSet[position].choices[questionSet[position].correctAnswer];
    console.log('correct ans is:' + correctAnswer);
    console.log('selected ans is:' + clickedValue);
    console.log(selected);
    if (clickedValue === correctAnswer) {
      $("#popupcorrect").fadeIn();
      correct++;
    } else {
      $("#popupwrong").fadeIn();
      $("#txtcorrectans").html(" " + correctAnswer);
    }

  }


  $("#tncbtn").click(function() {
    $("#popupmessage").fadeIn(300);
  });
  $(".closebtn").click(function() {
    $(".overlay").fadeOut(300);
  });
  $('#tnc').change(function() {
    if ($(this).is(":checked")) {
      $("#start").css('display', 'inline');
    } else {
      $("#start").css('display', 'none');
    }
  });
  $("#start").click(function() {
    $("#start-container").fadeOut(300);
    $("#center-block").fadeOut(300);
  });
  $('.btnpopupnext').click(function() {
    $(".overlay").fadeOut(300);
    position++;
    showQuestion();
  });
  $('#btnsubmit').click(function() {
    position++;
    showQuestion();
  });


});

