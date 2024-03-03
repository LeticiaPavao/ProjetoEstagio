// Waits for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    // Retrieves artistName and artistId from query parameters
    const artistName = urlParams.get('artistName');
    const artistId = urlParams.get('artistId');

    // Sets the value of artistName field in the form
    document.getElementById('artistName').value = artistName;

    // Adds a submit event listener to the form
    const contractForm = document.getElementById('contractForm');
    contractForm.addEventListener('submit', function(event) {
        // Prevents the default form submission behavior
        event.preventDefault();
        // Calls submitContract function with relevant parameters
        submitContract(artistName, artistId);
    });
});

// Requires the 'mysql' module for database connection
const connection = require('mysql'); 

// Function to submit contract details to the database
function submitContract(artistName, artistId, contractorName, cache, eventDate, address) {
    // Constructs SQL query to insert contract details into the database
    const query = `INSERT INTO contratos (artista_nome, artista_id, contratante_nome, cache, data_evento, endereco) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [artistName, artistId, contractorName, cache, eventDate, address];

    // Executes the SQL query with provided values
    connection.query(query, values, (err, result) => {
        // Handles errors, if any
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            return;
        }
        // Logs success message if data is inserted successfully
        console.log('Dados inseridos no banco de dados com sucesso');
    });
}

// Exports the submitContract function
module.exports = submitContract;

// Displays an alert confirming the successful submission of the contract
alert(`Contratação do artista ${artistName} realizada com sucesso por ${contractorName} para o evento em ${eventDate} no endereço ${address}. Cachê: ${cache}`);

