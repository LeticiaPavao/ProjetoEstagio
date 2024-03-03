CREATE DATABASE contract;

USE contract;

CREATE TABLE contratos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artista_nome VARCHAR(255) NOT NULL,
    artista_id VARCHAR(255) NOT NULL,
    contratante_nome VARCHAR(255) NOT NULL,
    cache DECIMAL(10, 2) NOT NULL,
    data_evento DATE NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
