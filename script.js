// Function to submit contract details
function submitContract() {
    const artistName = document.getElementById('artistName').value;
    
    if (!artistName) {
        alert('Por favor, insira o nome do artista');
        return;
    }
    // Retrieving values of other form fields
    const artistId = document.getElementById('artistId').value;
    const contractorName = document.getElementById('contractorName').value;
    const cache = document.getElementById('cache').value;
    const eventDate = document.getElementById('eventDate').value;
    const address = document.getElementById('address').value;

    // Constructing formData object with form field values
    const formData = {
        artistName: artistName,
        artistId: artistId,
        contractorName: contractorName,
        cache: cache,
        eventDate: eventDate,
        address: address
    };

    // Sending form data to server using fetch API
    fetch('banco\contract.sql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    .then(response => response.json())

    .then(data => {
        
        if (data.success) {
            alert('Contrato enviado com sucesso!');
        } else {
            alert('Ocorreu um erro ao enviar o contrato. Por favor, tente novamente.');
        }
    })

    .catch(error => {
        console.error('Erro ao enviar contrato:', error);
        alert('Ocorreu um erro ao enviar o contrato. Por favor, tente novamente.');
    });
}






