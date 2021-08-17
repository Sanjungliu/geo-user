const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Controller = require("./controllers/controller");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/register", Controller.postRegister);
app.post("/login", Controller.postLogin);
app.get("/user/:id", Controller.getUser);

app.listen(port, () => console.log(`user server listen at port ${port}`));
