# Dependências

Aqui encontramos a lista de aplicações necessárias para a execução da demo.

## Fedora

Para instalar as aplicações necessárias, com excessão do NodeJS, podem ser instaladas via gerenciador de pacotes dnf:

    >sudo dnf install git docker docker-compose java-1.8.0-openjdk java-1.8.0-openjdk-devel java-1.8.0-openjdk-headless maven

Para instalar o NodeJS pode utilizar o script que esta na pasta scripts/fedora:

    >cd scripts/fedora
    >./install_nodejs

durante a execução será pedido a senha de usuário, que deve estar configurado como administrador.

É necessário iniciar o serviço do docker, usando o comando a inicialização fica permanente:

    >sudo systemctl enable docker

Neste ponto será necessário reiniciar a máquina. Depois para utilizar o docker com seu usuário é necessário dar as permissões através dos comandos abaixo:

    >sudo groupadd docker
    >sudo chown root:docker /var/run/docker.sock
    >sudo usermod -a -G docker $USERNAME

Reinicie novamente e tudo funcionará como o esperado.

## Ubuntu

Para instalar as aplicações necessárias, com excessão do NodeJS, podem ser instaladas via gerenciador de pacotes dnf:

    >sudo apt-get install git docker docker-compose java-1.8.0-openjdk java-1.8.0-openjdk-devel java-1.8.0-openjdk-headless maven

Para instalar o NodeJS pode utilizar o script que esta na pasta scripts/fedora:

    >cd scripts/ubuntu
    >./install_nodejs

durante a execução será pedido a senha de usuário, que deve estar configurado como administrador.

É necessário iniciar o serviço do docker, usando o comando a inicialização fica permanente:

    >sudo systemctl enable docker

Neste ponto será necessário reiniciar a máquina. Depois para utilizar o docker com seu usuário é necessário dar as permissões através dos comandos abaixo:

    >sudo groupadd docker
    >sudo chown root:docker /var/run/docker.sock
    >sudo usermod -a -G docker $USERNAME

Reinicie novamente e tudo funcionará como o esperado.

José Carlos M. Oliveira Jr.
jose.oliveira@gft.com

Team API & Integration Practice Brazil
GFT Brazil
