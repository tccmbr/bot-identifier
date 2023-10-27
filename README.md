## Bot Identifier

É um projeto que visa identificar através do user-agent e referer da requisição, se a mesma foi feita por um bot / spammer. Veja a arquitetura em `documents/arquitetura.pdf`.

## Requisitos

- NodeJs >= 18
- Yarn >= 1.22
- Java >= 21
- Jmeter >= 5.6
- Docker >= 24
- Docker compose >= 2.3

## Configuração

Descomente o arquivo `.env.example` para `.env` e adicione seus valores as variáveis conforme preferir.

## Instalação

```bash
$ yarn install
```

## Gerando versão de produção

```bash
$ yarn build
```

## Executando os containers

Ao executar o comando abaixo, os containers: mongodb e redis, serão criados.

```bash
$ docker compose up
```

## Executando o projeto

```bash
$ yarn start:prod
```
Em seguida, acesse http://localhost:8080.

## Jmeter
1 - Faça o download [aqui](https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.2.tgz).

2 - Faça o download do arquivo [sessions2.csv](https://vturb-labs.s3.amazonaws.com/challenges/sessions2.csv).

3 - Descompacte e execute o comando:

```bash
$ cd ~/Downloads/apache-jmeter-5.6.2
$ ./bin/jmeter.sh
```

4 - Clique em `"Arquivo" > "Abrir"` e selecione o arquivo `"Bot Identifier.jmx"` que se encontra no diretório `jmeter`.

5 - Em `"Grupo de usuários" > Requisição HTTP > Requisições`, selecione o arquivo `sessions2.csv`.

6 - Clique em "iniciar" (ícone de "play" verde). Será iniciada uma sequência de `1000 requisições simultâneas` lendo do arquivo `sessions2.csv` e enviando para a `api`.

## Testes

```bash
# testes unitários
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
