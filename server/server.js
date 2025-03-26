const express = require("express")
const app = express();
const port = 8080

app.get("/api", (req, res) => {
    res.json("Test");
})

app.listen(port, () => {
    console.log("Server started on port ", port);
})