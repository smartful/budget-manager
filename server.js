import express from "express";
import ejs from "ejs";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

let spendings = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Budget",
    spendings,
  });
});

app.post("/add-spending", (req, res) => {
  const { description, price, category } = req.body;

  if (!description || !price || !category) {
    res.status(400).send("Tous les champs doivent être remplis.");
    return;
  }

  const newSpending = {
    description,
    price,
    category,
  };

  spendings.push(newSpending);
  res.render("spending-table", { spendings });
});

app.listen(PORT, () => {
  console.log(`The server in listening at PORT : ${PORT}`);
});
