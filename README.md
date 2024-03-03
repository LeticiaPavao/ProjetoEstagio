# showtime.github.io

Sistema para submissão de contratos

Este repositório contém uma aplicação simples em Node.js para a submissão de contratos em um banco de dados. A aplicação utiliza Express.js para lidar com requisições HTTP, MySQL para operações de banco de dados e express-validator para validação dos dados do contrato.

Instalação

Antes de executar a aplicação, certifique-se de ter o Node.js e o MySQL instalados em sua máquina. Em seguida, siga estes passos:

    Clone o repositório para sua máquina local

    Navegue até o diretório do projeto

    Instale as dependências usando npm:

    npm install

    Configure o banco de dados MySQL:
    Crie um novo banco de dados chamado 'contract' em seu servidor MySQL.
    Crie uma tabela chamada 'contratos' com o seguinte esquema:

    CREATE TABLE contratos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        artista_nome VARCHAR(255) NOT NULL,
        artista_id INT NOT NULL,
        contratante_nome VARCHAR(255),
        cache DECIMAL(10, 2),
        data_evento DATE,
        endereco VARCHAR(255)
    );

    Configure a conexão com o banco de dados:
    Abra o arquivo server.js e modifique os parâmetros de conexão do banco de dados de acordo com a configuração do seu servidor MySQL

Uso

    Para iniciar a aplicação, execute o seguinte comando no diretório do projeto:

    npm start

    Uma vez que o servidor estiver em execução, você pode submeter contratos enviando uma requisição POST para o endpoint /submit-contract com os dados do contrato no corpo da requisição. 

Contribuições

    Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões para melhorias, por favor, abra uma issue ou crie um pull request.
