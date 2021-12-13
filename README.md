## Serverless - AWS Node.js Typescript
![Badge](https://img.shields.io/static/v1?label=DH&message=DOSOMETHINGGREAT&color=0070f3&style=<0070f3>&logo=rocket)

### Projeto

Este projeto é uma aplicação serverless desenvolvida para realizar a emissão de certificados, com exportação em pdf e validação de url.

### Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Serverless framework](https://www.serverless.com/).

### Requisitos básicos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- [Git](https://git-scm.com)

O projeto pode ser construído com npm ou yarn, então escolha uma das abordagens abaixo caso você não tenha nenhum instalado em seu sistema.

O Npm é distribuído com o Node.js, o que significa que quando você faz o download do Node.js, o npm é instalado automaticamente no seu computador
- [Node.js v14.16.0](https://nodejs.org/) ou maior.

Yarn é um gerenciador de pacotes criado pela equipe do Facebook e parece ser mais rápido do que o npm em geral.
- [Yarn v1.22.5](https://yarnpkg.com/) ou maior.

Além disso, é bom ter um editor para trabalhar com o código, como [VSCode](https://code.visualstudio.com/).

### :information_source: Como executar

Siga as instruções abaixo para baixar e usar o projeto deste repositório:

```bash
# Clone este repositório usando SSH
$ git clone git@github.com:danielhessell/certificate-generator.git
# ou clone usando https
$ git clone https://github.com/danielhessell/certificate-generator.git

# Vá para o repositório
$ cd certificate-generator

# Instale as dependências
$ yarn

# Iniciei o banco local Dynamo
$ yarn dynamo:start

# Executar projeto
$ yarn dev
```

---

Made with :blue_heart: by Daniel Hessel :wave:
