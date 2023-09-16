<div align="center">
<h1> 🚀 PokeDex - API 🚀 </h1>
</div>

<p>
  Olá!! Este é um projeto full-stack que criei sendo esta a API do próprio, aqui o usuário poderá fazer as chamadas
  para obter algumas informações, desde se cadastrar até montar o seu time pokemon.
  <br>
  Esse projeto foi feito utilizando a API PokeAPI: https://pokeapi.co/
</p>

<p>💻 As tecnologias usadas no projeto foram:
  <br>
  <br> - TypeScript
  <br> - Node
  <br> - Express 
  <br> - MongoDB
  <br> - Mongoose
  <br> - Jest
  <br> - Supertest 
  <br> - Axios
  <br> - Eslint
  <br> - Dotenv 
  <br> - Bcrypt 
  <br> - Cookie Parser 
  <br> - Cors 
  <br> - Dayjs 
  <br> - Jsonwebtoken
  <br> - Nodemailer 
  <br> - Yup 
  <br> - Ts-node-dev 
</p>

<br><br>

<h2>Links</h2>
<p>
  <strong>🖥️ Link do repositório do front do projeto: https://github.com/FernandoLuppo/PokeDex</strong>
</p>
<p>
  <strong>📚 Link da documentação: https://documenter.getpostman.com/view/25854787/2s9YC1Xa23</strong>
</p>
<br><br>

<h2>Rotas</h2>
<h3>Rotas do Usuário</h3>
<p>
  <br> - Registro (post) - http://localhost:8080/user/register
  <br> - Login (post) - http://localhost:8080/user/login
  <br> - Logout (get) - http://localhost:8080/user/logout
  <br> - New User Infos (put) - http://localhost:8080/user/new-infos
  <br> - User Infos (get) - http://localhost:8080/user/infos
</p>

<h3>Rota do Token</h3>
<p>
  <br> - New Token (get) - http://localhost:8080/token/new-token
</p>

<h3>Rotas do Pokemon - Abertas</h3>
<p>
  <br> - One Pokemon - (post) - http://localhost:8080/pokemon/get-one
  <br> - Pokemon Evolution - (post) - http://localhost:8080/pokemon/get-evolution
  <br> - All Pokemon - (post) - http://localhost:8080/pokemon/get-all
</p>

<h3>Rotas do Pokemon - Fechadas</h3>
<p>
  <br> - Add Pokemon - (put) - http://localhost:8080/pokemon/add
  <br> - Get Team - (get) - http://localhost:8080/pokemon/team
  <br> - Remove Pokemon - (delete) - http://localhost:8080/pokemon/remove/(id)
</p>

<h3>Rota Para Mudar de Senha</h3>
<p>
  <br> - Check Email - (post) - http://localhost:8080/recover-password/check-email
  <br> - New Password - (put) - http://localhost:8080/recover-password/new-password
</p>

<br><br>

<h2>Rotas do Usuário</h2>
<p>
  <strong>Register:</strong> Essa rota serve para o usuário se cadastrar no banco de dados, os valores usados para acessar essa rota é: 
  <br>
  <br> - <strong>name</strong>
  <br> - <strong>email</strong>
  <br> - <strong>password</strong>
  <br><br>
  Essa rota possui validação feita com YUP, todos os valores são obrigatórios, <strong>name precisa ter no mínimo 3 caracteres, valor email precisa ser 
  preenchido com um email válido, password precisa ter no mínimo 5 caracteres</strong>, para a segurança do usuário a senha é criptografada e é salva
  assim no banco
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266794523-fab0e116-b22f-407d-a4a1-c9879742025b.png >
</div>
<br><br>

<p>
  <strong>Login:</strong> Essa rota serve para o usuário logar no aplicativo, com isso ele terá acesso a novas rotas, os valores dessa rota são:
  <br>
  <br> - <strong>email</strong>
  <br> - <strong>password</strong>
  <br><br>
  Essa rota possui as mesmas validações que a rota de registro, e ao logar o usuário receberá um Access Token e um Refresh Token para fazer
  as validações de rotas.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266794829-f8b4d9c4-eb9c-4a83-a9f1-e0309a3273cd.png >
</div>
<br><br>

<p>
  <strong>Logout:</strong> Essa rota serve para o usuário deslogar da aplicação, com isso os tokens também são limpos
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266794957-6914b29c-739a-462f-831d-8ffa9d49f137.png >
</div>
<br><br>

<p>
  <strong>New User Infos:</strong> Essa rota serve para trocar algumas informações do usuário como nome e email, seu valores são:
  <br>
  <br> - <strong>name</strong>
  <br> - <strong>email</strong>
  <br><br>
  Essa rota possui as mesmas validações referente aos mesmos campos das rotas register e login. 
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266795174-b42dbfbf-f3df-430e-9faf-bafa4df8bc6b.png >
</div>
<br><br>

<p>
  <strong>Get Infos:</strong> Essa rota serve para pegar algumas informações do usuário como nome e email
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266797535-50b759d4-3fff-4775-813a-b9927e08fbb3.png >
</div>
<br><br>

<h2>Rota do Token</h2>
<p>
  <strong>New Token:</strong> Essa rota serve para quando o access token do usuário expirar, ele usa o refresh token para criar novos tokens,
  o refresh token é passado por uma validação caso ele seja autêntico são gerados novos tokens, um novo access token e um novo refresh token.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266797743-d8987683-9a3f-4cf7-86ac-ebed9d731e61.png >
</div>
<br><br>

<h2>Rotas do Pokemon - Abertas</h2>
<p>
  <strong>One Pokemon:</strong> Essa rota serve para pegar apenas um pokemon, a resposta desta rota vem com mais informações do uq a rota All Pokemon, o valor dessa rota é:
  <br>
  <br> - <strong>id</strong>
  <br><br>
  Id pode ser tanto o nome quanto o próprio id do pokemon.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266797926-a6e44f23-37fa-4ed3-a19c-b6f68a91eee7.png >
</div>
<br><br>

<p>
  <strong>Pokemon Evolution:</strong> Essa rota serve para pegar a linha evolutiva de um pokemon escolhido pelo usuário, seus valores são:
  <br>
  <br> - <strong>id</strong>
  <br><br>
  Id pode ser tanto o nome quanto o próprio id do pokemon.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798015-7ddda19a-d20b-47a9-baea-bc869b24f3d7.png >
</div>
<br><br>

<p>
  <strong>All Pokemon:</strong> Essa rota serve para pegar mais de um pokemon, os valores são:
  <br>
  <br> - <strong>{pokemonList: {"start": 0, "end": 20}}</strong>
  <br><br>
  O valor start é o inicio da lista de pokemon que irá retornar, o end é a quantidade de pokemon que irão retornar.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798217-5b3220d4-257a-4db7-9c8e-85e23edb2fb6.png >
</div>
<br><br>

<h2>Rotas do Pokemon - Fechadas</h2>
<p>
  <strong>Add Pokemon:</strong> Essa rota é protegida e o usuário tem acesso apenas se estiver logado, ela serve para adicionar
  um pokemon ao time do usuario, caso o usuário já tenha atingido o limite de pokemon em seu time que no caso são 6 ele irá
  retornar um erro, os valores são:
  <br>
  <br> - <strong>id</strong>
  <br><br>
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798379-60800ff8-f408-4641-a574-20f1a8c4c8a6.png >
</div>
<br><br>

<p>
  <strong>Get Team:</strong> Essa rota serve para pegar o time do usuário e o próprio também precisa estar logado para ter acesso.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798458-f8000ae6-15c2-44a0-a9d6-337a97c7ab68.png >
</div>
<br><br>

<p>
  <strong>Remove Pokemon:</strong> Esta rota serve para remover um pokemon do time do usuário, ele precisa estar logado para ter
  acesso a essa rota, o valor é o id ou o nome do pokemon, porém diferente das outras rotas o valor tem que ser passado por
  parâmetro.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798574-d4304dde-3253-4be1-92ea-766f42453712.png >
</div>
<br><br>

<h2>Rota Para Mudar de Senha</h2>
<p>
  <strong>Check Email:</strong> Essa rota serve para enviar um email com o código para o usuário criar uma nova senha, o valor dessa rota é:
  <br>
  <br> - <strong>email</strong>
  <br><br>
  Essa rota é validada com o YUP e em relação ao envio de emails é enviado o código apenas para os que já foram cadastrados.
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798767-b4ff7459-38f2-4814-9b9b-41916bd058a1.png >
</div>
<br><br>

<p>
  <strong>New Password:</strong> Essa rota serve para criar uma nova senha para o usuário, o valor da rota é:
  <br>
  <br> - <strong>password</strong>
  <br> - <strong>email</strong>
  <br><br>
  Essa rota também é validada com o YUP e em relação a senha ela tem a mesma validação da página de login e registro, precisa ter pelo menos
  5 caracteres
</p>
<div align="center">
  <img src=https://user-images.githubusercontent.com/95176596/266798855-91390e59-aa75-405e-b931-a8d9565c82a7.png >
</div>
<br><br>

<h2>Para mais informações da minha API consultar a documentação: https://documenter.getpostman.com/view/25854787/2s9YC1Xa23</h2>
































