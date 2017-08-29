# workshop-api-swagger-raml

This repository maintains code to demonstrate Swagger tools.

## Objetivo

Demonstraremos como a utilização de uma definição de API em um formato padrão pode ser util para criarmos pontos de integração entre sistemas, de forma ágil e automatizada e como a interoperabilidade entre implementações em linguagens e frameworks diferentes pode ser mantida através do contrato de API. Utilizaremos para isso uma especificação de uma API, no padrão OpenAPI 2.0 (Swagger) e ferramentas para verificação, documentação e geração de código.

Também criaremos uma Sandbox para permitir que desenvolvedores de aplicações clientes da API possam desenvolver a sua integração, mesmo antes da implementação da API estar pronta.

## Setup

Na criação desta demo usamos ferramentas abertas que possuem algumas dependências. A demo foi desenvolvida usando um sistema operacional Fedora Linux, mas podem ser utilizadas outras distribuições. Leia o arquivo sobre [Dependências](deps.md) que contém a lista de aplicações necessárias para a preparação e execução da demo.

### Preparação das ferramentas Swagger

Utilizaremos na demo ferramentas fornecidas pelo projeto [Open API Initiative](https://www.openapis.org/), utilizando suas versões em containers [Docker](https://www.docker.com). Também será utilizada o módulo swagger para NodeJS para a criação da Sandbox. Outra ferramenta utilizada será o framework para criação de microservices [Loopback](https://loopback.io) da StrongLoop, também baseado em NodeJS.

Para essa preparação temos o script que instala e prepara as ferramentas para isso (desde que as dependências mencionadas no arquivo [Dependências](deps.md) estejam resolvidas). Abra um terminal e execute o script:

    >./step_1_setup_tools

Esse script é responável por:

* criar os diretórios necessários
* baixar o arquivo de definição da API na pasta docs
* baixar e instalar as ferramentas
  * swagger
  * loopback
* baixar as imagens e criar os containers:
  * swagger-generator (porta 9000)
  * swagger-editor (porta 8000)
  * swagger-ui (porta 7000)

## Geração de código

Criaremos código baseados na especificação da API (ref), da seguinte forma:

* Servidores:
  * Java Spring Boot
  * NodeJS
  * Loopback
* Clientes:
  * Java
  * NodeJs

Para isso utilizaremos outro script. No terminal execute:

    >./step_2_create_apis

Com as implementações geradas demonstraremos a interoperabilidade entre as versões servidoras e clientes, indepêndentes de plataforma e linguagem, sempre baseada no contrato estabelecido pela especificação da API [User](https://github.com/gft-technical-practices/workshop-api-development/blob/master/users_api.yaml).

No próximo passo faremos o build das APIs e seus clients, para que possam ser utilizados em outras aplicações permitindo acesso as APIs quando em execução. Para isso execute os dois scripts como descrito abaixo:

    >./step_3_build
    >./step_4_dockerize_apis

O primeiro empacota e o segundo cria imagens docker para os serviços das APIs.

Para testarmos use o script de execução da seguinte forma, no terminal:

    >./execute java node

Isso irá executar o servidor java e o client node para demonstrar a interoperabilidade. Podemos ainda executar:

    >./execute node java
    >./execute java java
    >./execute node node
    >./execute loopback java
    >./execute loopback node

(to be continue...)

José Carlos M. Oliveira Jr.
jose.oliveira@gft.com

Team API & Integration Practice Brazil
GFT Brazil