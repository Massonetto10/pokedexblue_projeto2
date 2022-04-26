require("dotenv").config();

import express from 'express' 
import path from 'path' 
const __dirname = path.resolve(path.dirname('')) 

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set("view engine", "ejs") 
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());

const port = process.env.Port  || 3001 

const pokedex = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    altura: "0.7 m",
    peso: "6.9 kg",
    categoria: "seed",
    habilidade: "overgrow",
  },
  {
    id: 2,
    nome: "Charmander",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    altura: "0.6 m",
    peso: "8.5 kg",
    categoria: "lizard",
    habilidade: "blaze",
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    altura: "0.5 m",
    peso: "9.0 kg",
    categoria: "tiny turtle",
    habilidade: "torrent",
  },
];

let pokemon = undefined;
let message = "";
var pok = 1;


app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", { pokedex, pokemon, message });
});

app.get("/cadastrar", (req, res) => {
  res.render("cadastrar", { pokedex, pokemon });
});


app.get("/detalhes", (req, res) => {
  res.render("detalhes", { pokedex, pok });
});

app.get("/detalhes/:id", (req, res) => {
    pok = +req.params.id;
    res.redirect("/detalhes");
  });

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  message = "Pokémon cadastrado com sucesso!";
  res.redirect("/#cards");
});




app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
