// Alunos: Pedro Cabral Paisano
//         Otávio Lima de Andrade

// === Colocando o ano no rodapé ===
const anoSpan = document.getElementById("ano");
if (anoSpan) {
  anoSpan.textContent = new Date().getFullYear();
}

// Menu responsivo para o mobile
const menuToggle = document.getElementById("menuToggle");
const menuLinks = document.getElementById("menuLinks");
menuToggle.addEventListener("click", () => {
  menuLinks.classList.toggle("show");
});

// Estrutura para a busca de Pokémon
const botaoSearch = document.getElementById("botaoSearch");
const searchInput = document.getElementById("searchInput");
const imagemPokemon = document.getElementById("imagemPokemon");
const metaPokemon = document.getElementById("metaPokemon");
const spriteDefault = document.getElementById("spriteDefault");
const spriteShiny = document.getElementById("spriteShiny");

// Novos elementos para card mais bonito
const nomePokemon = document.getElementById("nomePokemon");
const idPokemon = document.getElementById("idPokemon");
const tiposPokemon = document.getElementById("tiposPokemon");
const infoPokemon = document.getElementById("infoPokemon");

let troca;
// Função para buscar Pokémon
function buscarPokemon() {
  const termo = searchInput.value.toLowerCase().trim();
    if (!termo) return;

    metaPokemon.textContent = "Carregando...";

    fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon não encontrado");
        return res.json();
      })
      .then((data) => {
        // Atualiza imagem principal
        troca = data;
        imagemPokemon.src = data.sprites.other["official-artwork"].front_default;
        imagemPokemon.alt = `Imagem oficial de ${data.name}`;
        imagemPokemon.classList.remove("invisivel");

        // Nome e ID
        nomePokemon.textContent = data.name;
        idPokemon.textContent = data.id;

        // Tipos com badges coloridas
        tiposPokemon.innerHTML = "";
        data.types.forEach((t) => {
          const span = document.createElement("span");
          span.textContent = t.type.name;
          span.classList.add("tipo", t.type.name);
          tiposPokemon.appendChild(span);
        });

        infoPokemon.classList.remove("invisivel");
        metaPokemon.textContent = ""; // limpa o "Carregando..."

        // Sprites
        spriteDefault.src = data.sprites.front_default;
        spriteDefault.alt = `Sprite padrão de ${data.name}`;
        spriteDefault.classList.remove("invisivel");

        spriteShiny.src = data.sprites.front_shiny;
        spriteShiny.alt = `Sprite shiny de ${data.name}`;
        spriteShiny.classList.remove("invisivel");
      })
      .catch(() => {
        // Limpa imagens e texto
        imagemPokemon.src = "";
        imagemPokemon.classList.add("invisivel");

        spriteDefault.src = "";
        spriteDefault.classList.add("invisivel");

        spriteShiny.src = "";
        spriteShiny.classList.add("invisivel");

        metaPokemon.textContent = "Pokémon não encontrado.";
        infoPokemon.classList.add("invisivel");
      });
  }


function trocaImg1() {
  imagemPokemon.src = troca.sprites.front_default;

}

function trocaImg2() {
  imagemPokemon.src = troca.sprites.front_shiny;

}

function voltaOrig() {
  imagemPokemon.src = troca.sprites.other["official-artwork"].front_default;
}


// Enter no input
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    buscarPokemon();
  }
});
