require("dotenv").config();
const express = require('express');
const ejs = require('ejs');

const app = express();

const PORT = 3000 || process.env.PORT;

const mailer = require("./mailer");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("sendMail");
});

app.post("/", async(req, res) => {
    const {email} = req.body;

    try{
        mailer.sendAnEmail(email);
        res.status(250).json({status: "Success", message: `The Mail to ${email} was sent successfully !!`});
    }catch(e){
        console.log(e);
    }

});

app.listen(PORT, () => {
    console.log("Server started at PORT: " + PORT);
});