const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("CI/CD Pipeline is Running 🚀");
});

app.listen(3000, () => {
  console.log("Server running");
});