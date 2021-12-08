const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Question = require('./database/Question');
const Answer = require('./database/Answer');

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    });

// Estou dizendo para o Express usar o ejs como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
    Question.findAll({raw: true, order:[
        ['id', 'DESC']                         // DESC = DECRESCENTE
    ]}).then(questions =>{                     //SELECT no MySQL
        res.render("index",{
            questions: questions
        });
    }) 
    
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/savequestion", (req, res) => {
    var title = req.body.title;
    var desc = req.body.desc;
    Question.create({                          //INSERT INTO no MySQL
        title:  title,
        desc: desc
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: {id: id},
    }).then(question => {
        if(question != undefined){             // Pergunta encontrada
            Answer.findAll({
                where: {questionId: question.id},
                order: [['id', 'DESC']]
            }).then(answers => {
                res.render("question", {           // Manda para a página da pergunta requisitada
                    question: question,
                    answers: answers
            })            
            });                             
        }else{                                 // Pergunta não encontrada
            res.redirect("/")                  // Redireciona usuário para página principal
        }
    })
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var questionId = req.body.question;
    Answer.create({
        corpo: corpo,
        questionId: questionId
    }).then(() => {
        res.redirect("/question/" + questionId)
    });
});

app.listen(8080, ()=>{console.log("App rodando!");});