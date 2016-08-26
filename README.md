# Pontos de Interesse (POI)
Sistema desenhado para cadastro e consulta de Pontos de Interesse (POIs).

## Rodando a aplicação
Foi criado um pequeno programa escrito em `nodejs` (com o pacote `express`) para subir um micro servidor http. 
Neste programa foram escritos os mocks para os três serviços.
Este arquivo se chama `poi.js` e está localizado na raiz do projeto. 
Para rodar o serviço basta chamá-lo na linha de comando:
```
node poi.js
```
Após isso, basta acessar `localhost:3000`

## Roteamento
O serviço abre a porta `3000` para acesso.
* `localhost:3000`: redireciona para o diretório `www` do projeto, que contém os arquivos estáticos;
* `GET` em `localhost:3000/poi`:
    * sem parâmetros: lista todos os POIs;
    * com os parâmetros `x`, `y` e `distance`: lista somente os POIs dentro do raio `distance` de `x` e `y`
* `POST` em `localhost:3000/poi`: cadastra um novo ponto de interesse 

## Tecnologias no front-end
* [Bootstrap](http://getbootstrap.com/)
* [Paper (tema do bootstrap)](https://bootswatch.com/paper/)
* [jQuery](https://jquery.com/)
* [Velocity.js](http://velocityjs.org/)

## Tecnologias no back-end
Linguagem: [NodeJS](https://nodejs.org)

Pacotes:
* [Express](http://expressjs.com/)
* [express-delay](https://www.npmjs.com/package/express-delay)
* [body-parser](https://www.npmjs.com/package/body-parser)