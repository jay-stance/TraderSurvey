/* ====== Questions ====== */
let start_question = [{
    question: 'Have you sold anything online before',
    options: ['Yes, I have', 'No, I am more of a buyes']
}];

const Seller_questions = [{
    question: "What's the avreage range of customers you get ii a month",
    options: ["1-10", "10-20", "20-50", "50-above"]
}, {
    question: "How often do you use tech solutions",
    options: ["very often", "Don't ike it", "20-50", "50-above"]
}, {
    question: "Do you think an online store will improve your store",
    options: ["Yes, it will", "No, it won't"]
}, {
    question: "What's the price range of your products",
    options: ["1,000 - below", "1,000 - 5,000", "5,000 - 20,000", "20,000 - above"]
}, {
    question: "How often do you use tech solutions",
    options: ["very often", "Don't ike it", "20-50", "50-above"]
}, {
    question: "Are you comfortable with posting your products everyday on your status",
    options: ["No, it's very stressful amd annoying", "it helps me a lot", "I love it", "Not at all"]
}, {
    question: "or do you like the in-person advertisment you do for your products",
    options: ["No. it's very stressful", "it helps me a lot", "I love it", "Not at all"]
}, {
    question: "Do you beloeve that there are prospective students that need your products/services that you offer?",
    options: ["Yes, I do", "No, I don't", "absolutely yes", "No t at ll"]
}, {
    question: "What if you are given a platform that provides a comdusive enviroment for sale and directed to your prospective clients ,Students. How open minded are you to embrace it?",
    options: ["I am eecited", "Not willing", "Not sure", "I LOVE IT"]
}, {
    question: "What do you think will be added to the platform to enhace your experience and sales?"
}]

const buyer_questions = [{
        question: "Have you ever bought something online",
        options: ["yes, I have", "No, I haven't", "I wish to", "Not interested"]
    }, {
        question: "how do you feel about the idea of buying online?",
        options: ["Satisfied", "perfectly Okay", "Risky", "mixed feelings"]
    }, {
        question: "Outside Jumia and konga have you ever bought from any online store?",
        options: ["No, I haven't", "yes, I have"]
    }, {
        question: "Do ypu like the 4-7 days delay involef in buying from this platforms",
        options: ["No, I don't", "Not at all, expecially at urgent times", "perfectly okay", "yes, I do"]
    }, {
        question: "Or do you like the stress involved in leaving campus to get what you want, even the smallet things",
        options: ["No, I don't", "Not at all, expecially at little things", "perfectly okay", "yes, I do"]
    }, {
        question: "Are you comfortable making payment online using third parties like paypal, PayStack, Stripe etc.",
        options: ["No, I don't", "not so well", "perfectly okay", "yes, I do"]
    }, {
        question: "What if there is a platform that solve your problem involved with buying online, How open-mindd are you to embrace it",
        options: ["I am eecited", "Not willing", "Not sure", "I LOVE IT"]
    }, {
        question: "What if this platform is tailored for you with quality products sold by fellow students in your campus, would you recommend it to others?",
        options: ["Ye, i will", "with all pleaseure", "Not sure", "No, I won't"]
    }, {
        question: "So far, how do you feel about this idea ",
        options: ["Super eecited", "Not willing", "Not sure", "I LOVE IT"]
    }, {
        question: "What do you think will be added to the platform to enhace your experience and sales?"
    }]
    /* ======== End ======== */

let reply = [];
/* ==== True code ==== */
const progressBar = document.querySelector(".progress--bar");
const questionArea = document.querySelector(".questionArea");
const scoreArea = document.querySelector(".scoreArea");
const scoreText1 = document.querySelector(".scoreText1");
const scorePct = document.querySelector(".scorePct");

//initial data
let currentQuestion = 0;

showQuestion(start_question);

//reset event
document.querySelector(".scoreArea button").addEventListener("click", () => {
    currentQuestion = 0;
    window.location.href = "index.html"
});

//Functions
function showQuestion(question) {
    console.log(question[0])
    if (question[currentQuestion]) {
        let q = question[currentQuestion];

        let progress = Math.floor((currentQuestion / question.length) * 100);
        progressBar.style.width = `${progress}%`;
        scoreArea.style.display = "none";
        questionArea.style.display = "block";

        document.querySelector(".question").innerHTML = q.question;
        let optionsHtml = "";

        if (currentQuestion === 9) {
            optionsHtml += "<textarea placeholder='Enter your opinion here ...' style='color: #fff; width: 100%;height: 200px; padding: 10px; background: #00000033;'> </textarea>";
        } else {
            for (let i in q.options) {
                optionsHtml += `<div data-op="${i}" class="option"><span> ${
              parseInt(i) + 1
            }</span> ${q.options[i]}</div>`;
            }
        }

        document.querySelector(".options").innerHTML = optionsHtml;
        if (document.querySelector("textarea")) document.querySelector("textarea").addEventListener("keydown", (e) => enter_key(e, question))
        document.querySelectorAll(".options .option").forEach((item) => {
            item.addEventListener("click", (e) => optionsClickEvent(e, question));
        });
    } else {
        finishQuiz();
    }
}


function enter_key(e, question) {
    if (e.keyCode === 13) {
        reply.push({
            question: question[currentQuestion].question,
            answer: e.target.value.trim()
        })
        optionsClickEvent(e, question)
    }
}

function optionsClickEvent(e, question) {
    reply.push({
        question: question[currentQuestion].question,
        answer: e.target.innerText.trim()
    })
    if (question[0] === start_question[0]) {
        question = parseInt(e.target.getAttribute("data-op")) === 0 ? Seller_questions : buyer_questions;
        showQuestion(question);
    } else {
        currentQuestion++;
        showQuestion(question);
    }
}

function finishQuiz() {
    reply = JSON.stringify({ "reply": reply })
    console.log(JSON.parse(reply), "replyyyyy")
    fetch("/reply", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: reply
        })
        .then(response => {
            response.text()
                .then(data => console.log(data))
        })

    scoreText1.innerHTML = "Good job";
    document.querySelector(
        ".scoreText2"
    ).innerHTML = `Survey Complete`;
    scoreArea.style.display = "block";
    questionArea.style.display = "none";
    progressBar.style.width = "100%";
}