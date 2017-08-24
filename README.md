# workshop-api-swagger-raml

This repository maintains code to demonstrate Swagger tools.

## Objetivo

Demonstraremos como a utilização de uma definição de API em um formati padrão pode ser util para criarmos pontos de integração entre sistemas, de forma ágil.

Utilizaremos para isso uma especificação de API, no padrão OpenAPI 2.0 (Swagger) e ferramentas para verificação, documentação e geração de código.

Também criaremos uma Sandbox para permitir que desenvolvedores de aplicações clientes da API possam desenvolver a sua integração, mesmo antes da implementação da API estar pronta.

## Setup

Na criação desta demo usamos ferramentas abertas que possuem algumas dependências. A demo foi desenvolvida usando um sistema operacional Fedora Linux, mas podem ser utilizadas outras distribuições. Leia o arquivo o "deps.txt" que contém a lista de depedências necessárias para a preparação e execução da demo.

### Preparação das ferramentas Swagger

Utilizaremos na demo ferramentas fornecidas pelo projeto OpenAPI (rev), utilizando suas versões em containers Docker. Também será utilizada o módulo swagger para NodeJS para a criação da Sandbox. Outra ferramenta utilizada será framework para criação de microservices Loopback da StrongLoop (IBM), também baseado em NodeJS.

Para essa preparação temos o script que instala e prepara as ferramentas para isso (desde que as dependências mencionadas no arquivo "deps.txt" estejam resolvidas). Abra um terminal e execute o script:

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

As implementações geradas podem ser utilizadas para demonstrar a interoperabilidade entre as versões servidoras e clientes, indepêndentes de plataforma e linguagem, sempre baseada no contrato estabelecido pela especificação da API (ref).

Para testarmos use o script de execução da seguinte forma, no terminal:

    >./execute java node

Isso irá executar o servidor java e o client node para demonstrar a interoperabilidade. Podemos ainda executar:

    >./execute node java
    >./execute java java
    >./execute node node
    >./execute loopback java
    >./execute loopback node
