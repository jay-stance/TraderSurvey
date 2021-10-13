const express = require("express");
const mongoose = require("mongoose");
const { Reply, validate_reply } = require("./Models");

const app = express();
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
// app.disable("x-powered-by")
const MongoURL = "mongodb://localhost:27017/Survey"
console.log(MongoURL)
mongoose.connect(MongoURL)
    .then(() => console.log("has coonected to database"))
    .catch((err) => console.log(`could not connect to database ${err}`))


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/survey', (req, res) => {
    res.render('survey')
})

app.post('/reply', async(req, res) => {
    const body = req.body;
    console.log(body)
    const { error } = validate_reply(body);
    if (error) return res.status(401).send(error.details[0].message)

    let reply = new Reply({
        reply: body.reply
    });
    try {
        reply = await reply.save()
        console.log(reply)
        return res.send("done")
    } catch (err) {
        console.log(err)
        return res.status(401).send("bad request")
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => console.log(`App listenig on port ${PORT}`))