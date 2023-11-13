const catalog = document.getElementById('catalog');
const rowCatalog = document.getElementById('rowCatalog');
const botaoExpansao = document.getElementById("botao-expansao");
const botaoOrdena = document.getElementById('botao-ordena');
const search = document.getElementById("pesquisar");



// Lógica de conexão com a api, ainda não implementada, implementar na sprint 3

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDEwYzE1MmU5YTgxMmFiNTkxMWMxNTcxZTE2YzVmMSIsInN1YiI6IjY1MzU5ZjFjYzhhNWFjMDBhYzM5NTU1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zic9T4hGPlYWCj_WjJwBHSzMPnGE8vqJOQdROzuMAqI'
//   }
// };  

// async function fetchGenres() {
//   const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
//   const data = await response.json()
//   return data.genres;
// }

// async function fetchData() {
//   const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//   const data = await response.json();
//   return data.results;
// }

// let filmsJSON, genresJSON;
// async function main () {
//   filmsJSON = await fetchData();
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   genresJSON = await fetchGenres();
//   await new Promise((resolve) => setTimeout(resolve, 1000));
// } 



// Arquivo de filters de exemplo
const filterOptions = [
  {
    name: "genre",
    key: "genre",
    text: "Gênero"
  },
]
// // Carrega o array de filmes de exemplo vindo do arquivo .json

// async function fetchData() {
//   const response = await fetch('../films.json');
//   const data = await response.json();
//   return data;
// }

// let films;

// async function fetchFilms () {
//   try {
//     films = await fetchData();

//     // Só após carregados os filmes a lógica é implementada
//     // main();
//   } catch (e) {
//     console.log(e);
//   }
// }

// // Função executada para carregar os filmes
// fetchFilms();
const profiles = [
  {
      "films": [
          {
              "name": "Encanto",
              "genre": "action",
              "cover": "./covers/d1.jpeg"
          },
          {
              "name": "Wish",
              "genre": "fantasia",
              "cover": "./covers/download.jpeg"
          },
          {
              "name": "Besouro Azul",
              "genre": "action",
              "cover": "./covers/images.jpeg"
          },
          {
            "name": "Terrifier",
            "genre": "terror",
            "cover": "./covers/terrifier_2_poster_oficial.jpg"
        },
        {
            "name": "Casa Gucci",
            "genre": "drama",
            "cover": "./covers/casa-gucci.jpg"
        }
      ]
  }, {
    "films": []
  }
];

const films = [
  {
      "name": "Encanto",
      "genre": "action",
      "cover": "./covers/d1.jpeg"
  },
  {
      "name": "Wish",
      "genre": "fantasia",
      "cover": "./covers/download.jpeg"
  },
  {
      "name": "Besouro Azul",
      "genre": "action",
      "cover": "./covers/images.jpeg"
  },
  {
      "name": "Terrifier",
      "genre": "romance",
      "cover": "./covers/terrifier_2_poster_oficial.jpg"
  },
  {
      "name": "O lar das crianças peculiares",
      "genre": "terror",
      "cover": "./covers/lardascriancaspeculiares_2.jpg"
  },
  {
      "name": "Casa Gucci",
      "genre": "drama",
      "cover": "./covers/casa-gucci.jpg"
  },
  {
      "name": "Veloses e Furiosos 9",
      "genre": "action",
      "cover": "./covers/3385237.jpg"
  },
  {
      "name": "Star Wars: O despertar da força",
      "genre": "action",
      "cover": "./covers/starwars.jpg"
  }
];

// // Funções

/*
  Função que renderiza as opções do select de recomendação, baseado nos dados pré existentes
  no array de filmes
*/
function renderFilterOptions(films){
  const filtrosSelect = document.getElementById("filtros");

  filterOptions.forEach((item, index) => {
    const select = document.createElement('select');
    select.id = item.key;
    select.name = item.text;
    const nomesUnicos = new Set();

    if (index === 0) {
      const optionPadrao = document.createElement("option");
      optionPadrao.text = "Selecione uma opção";
      optionPadrao.value = null;
      select.appendChild(optionPadrao);
    }

    films.forEach((film) => nomesUnicos.add(film[`${item.key}`]))
  
    const nomesSemRepeticao = Array.from(nomesUnicos);
    
    nomesSemRepeticao.forEach((item) => {
      const option = document.createElement("option");
      option.text = item;
      option.value = item;
      select.appendChild(option);
    })

    filtrosSelect.appendChild(select);
  })

}

function filterFilms(filterValue, filterKey) {
  const copyFilms = films.filter((film) => film.genre == filterValue);
  renderFilms(copyFilms);
}

// Função de comparação personalizada com base na propriedade selecionada
function compararFilmes(propriedade) {
  return function(a, b) {
    if (a[propriedade] < b[propriedade]) {
      return -1;
    }
    if (a[propriedade] > b[propriedade]) {
      return 1;
    }
    return 0;
  };
}

function ordernaFilms(key) {
  const copyFilms = films.sort(compararFilmes(key));
  renderFilms(copyFilms);
}

// Função auxiliar para criar botões
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add('btn', 'btn-primary', 'mr-2');
  button.onclick = onClick;
  return button;
}

function renderFilms (movies) {
  rowCatalog.innerHTML = "";
  const larguraFixa = '200px'; // Define largura fixa para as imagens
  const alturaFixa = '300px'; // Define altura fixa para as imagens
  const arrayFilms = movies.length ? movies : films;
  arrayFilms.forEach((film) => {
    const div = document.createElement('div'); // Cria a div da coluna que vai envelopar a imagem e o subtítulo
    div.classList.add('col-md-3');
    div.classList.add('mb-3');
    

    const figureDiv = document.createElement('figure');
    figureDiv.classList.add('text-center');
    figureDiv.classList.add('card-film');

    const figureCaption = document.createElement('figcaption');
    figureCaption.textContent = film.name;
    figureCaption.classList.add("text-light")

    const img = document.createElement('img');
    img.src = film.cover;
    img.style.width = larguraFixa;
    img.style.height = alturaFixa;
    img.classList.add('img-fluid');
    const likeButton = createButton('Curtir', () => likeFilm(film.name));

    // Agora por ordem, adiciona os elementos filhos aos elementos pais correpondentes
    figureDiv.appendChild(img)
    figureDiv.appendChild(figureCaption);
    figureDiv.appendChild(likeButton);
    div.appendChild(figureDiv);

    // Adiciona todos os elementos criados a rowCatalog, presente no index.html
    rowCatalog.appendChild(div)
  })
}

function likeFilm(nome) {
  films.forEach((f) => {
    if (f.name === nome) {
      if (f.liked) {
        const index = profiles[1].films.findIndex(filme => filme.name === nomeDoFilme);

        if (index !== -1) {
            // Remove o filme do array
            profiles[1].splice(index, 1);
            console.log(`Filme "${nome}" removido com sucesso.`);
        } else {
            console.log(`Filme "${nome}" não encontrado no array.`);
        }
      } else {
        profiles[1].films.push(f);
      }
    }
  })
}

function encontrarGeneroMaisCurtido(usuario) {
  const filmesCurtidos = usuario.films;

  // Criar um objeto para contar a ocorrência de cada gênero
  const contagemGeneros = {};
  filmesCurtidos.forEach(filme => {
      contagemGeneros[filme.genre] = (contagemGeneros[filme.genre] || 0) + 1;
  });

  // Converter o objeto em um array de objetos { genre, count }
  const generosComContagem = Object.keys(contagemGeneros).map(genre => ({ genre, count: contagemGeneros[genre] }));

  // Ordenar o array com base na contagem (do mais curtido para o menos curtido)
  generosComContagem.sort((a, b) => b.count - a.count);

  // Pegar o gênero mais curtido
  const generoMaisCurtido = generosComContagem[0].genre;

  return generoMaisCurtido;
}


function renderRecommendedFilms () {
  if (!profiles.length) {
    throw 'Sem perfis';
  }

  const filmesUsuario1 = profiles[0].films.map(filme => filme.genre);
  const filmesUsuario2 = profiles[1].films.map(filme => filme.genre);

  // Concatenar os arrays de gêneros dos dois usuários
  const todosGeneros = filmesUsuario1.concat(filmesUsuario2);

  // Criar um objeto para contar a ocorrência de cada gênero
  const contagemGeneros = {};
  todosGeneros.forEach(genero => {
      contagemGeneros[genero] = (contagemGeneros[genero] || 0) + 1;
  });

  // Calcular a média da contagem de gêneros
  const mediaContagem = Object.values(contagemGeneros).reduce((soma, contagem) => soma + contagem, 0) / todosGeneros.length;

  // Calcular o desvio padrão
  const desvioPadrao = Math.sqrt(
      Object.values(contagemGeneros).reduce((soma, contagem) => soma + Math.pow(contagem - mediaContagem, 2), 0) / todosGeneros.length
  );

  // Filtrar os gêneros que têm uma contagem acima da média + 1 desvio padrão
  const generosMaisComuns = Object.keys(contagemGeneros).filter(
      genero => contagemGeneros[genero] > mediaContagem + desvioPadrao
  );
  console.log(generosMaisComuns);
  
  const mostLikedGenre = encontrarGeneroMaisCurtido(profiles[0]);
  const mostLikedGenre2 = encontrarGeneroMaisCurtido(profiles[1])

  const genresToFilter = [];
  if (mostLikedGenre) genresToFilter.push(mostLikedGenre);
  if (mostLikedGenre2) genresToFilter.push(mostLikedGenre2);
  if (generosMaisComuns.length) {
    generosMaisComuns.forEach((g) => {
      genresToFilter.push(g);
    })
  }

  console.log(genresToFilter);


  const movies = new Set();
  genresToFilter.forEach((g) => {
    let count = 0;
    films.forEach((f) => {
      if (count <= 10) {
        if (f.genre === g) movies.add(f);
        count++;
      }
    })
  })

  const filmesEmComum = filmesUsuario1.filter(filme => filmesUsuario2.includes(filme));

  if (filmesEmComum.length) {
    let count = 0;
    filmesEmComum.forEach((f) => {
      if (count < 10) {
        movies.add(f);
      }
    })
  }
  const arrayMovies = Array.from(movies);
  arrayMovies.forEach((i, index) => {
    console.log(i);
    if (typeof(i) !== 'object') {
      console.log('wsdf');
      // Remove o filme do array
      arrayMovies.splice(index, 1);
    }
  })
  console.log(arrayMovies);
  renderFilms(arrayMovies);
  renderFilterOptions(arrayMovies);
}

function main() {
  search.addEventListener("input", function(event) {
    event.preventDefault(); // Impede a recarga da página
    let searchTerm = search.value;
  
    // Deixa o termo todo em minúsculo, para não afetar a pesquisa
    searchTerm = searchTerm.toLowerCase().replace(/\s+/g, "");
  
    // Faz uma cópia do array de filmes, para não alterar o array original na hora de filtrar
    let copyFilms = films;
  
    copyFilms = copyFilms.filter((film) => {
      // Deixa todos os nomes de filmes em minúsculos para não afetar na pesquisa
      const nameFilm = film.name.toLowerCase().replace(/\s+/g, "");
      if (nameFilm.includes(searchTerm)) return film; // Se encontrou um filme, retorna
    });
    
    // Passa para a função que renderiza os filmes na página o novo array apenas com as correspondências
    renderFilms(copyFilms);
  })
  
  botaoExpansao.addEventListener("click", function() {
    if (filtros.style.display === "none") {
      filtros.style.display = "block";
      botaoExpansao.textContent = "Ocultar Filtros";
    } else {
      filtros.style.display = "none";
      botaoExpansao.textContent = "Expandir Filtros";
    }
  });
  
  botaoOrdena.addEventListener("click", function() {
    if (ordena.style.display === "none") {
      ordena.style.display = "block";
      botaoOrdena.textContent = "Ocultar";
    } else {
      ordena.style.display = "none";
      botaoOrdena.textContent = "Ordenar";
    }
  });
  
  
  
  // Sempre executado (main)
  renderFilms(films);
  renderFilterOptions(films);
  
  const selectElement = document.getElementById('genre');
    
  selectElement.addEventListener("change", function() {
    const selected = selectElement.value;
    const selectedKey = selectElement.key;
    filterFilms(selected, selectedKey);
  });
  
  const selectOrdena = document.getElementById('ordenacao');
  selectOrdena.addEventListener("change", function() {
    const selected = selectOrdena.value;
    const selectedKey = selectOrdena.key;
    ordernaFilms(selected, selectedKey);
  });
}

main();