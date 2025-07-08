# Imersão Alura Spotify

Projeto inspirado na interface do Spotify, desenvolvido durante a Imersão Alura.

## Descrição

Este projeto simula uma interface do Spotify, permitindo ao usuário buscar artistas e visualizar playlists. A busca de artistas utiliza uma API local simulada com um arquivo JSON.

## Estrutura do Projeto

```
index.html
script.js
api-artists/
  artists.json
src/
  assets/
    icons/
      favicon.png
      logo-spotify.png
      search.png
      small-left.png
      small-right.png
    playlist/
      1.jpeg
      ...
  styles/
    footer.css
    header.css
    main.css
    nav.css
    reset.css
    resultArtist.css
    vars.css
```

## Como rodar o projeto

1. **Clone o repositório**
2. Instale o [JSON Server](https://github.com/typicode/json-server) globalmente:
   ```sh
   npm install -g json-server
   ```
3. Inicie o servidor da API:
   ```sh
   json-server --watch api-artists/artists.json --port 3000
   ```
4. Abra o arquivo `index.html` no seu navegador.

## Funcionalidades

- Visualização de playlists na tela inicial.
- Busca de artistas pelo nome.
- Exibição de informações do artista ao buscar.
- Cadastro de usuário com validação de e-mail, senha e dados pessoais.
- Login automático após cadastro.
- Saudação personalizada de acordo com o horário e nome do usuário logado.
- Dados de cadastro e login salvos no localStorage.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- [JSON Server](https://github.com/typicode/json-server) para simular a API

## Créditos

Desenvolvido durante a Imersão
