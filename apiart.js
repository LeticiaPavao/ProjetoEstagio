// Selecting necessary DOM elements
const form = document.querySelector('#form') // Selects the form element
const searchInput = document.querySelector('#search') // Selects the search input field
const songsContainer = document.querySelector('#songs-container') // Selects the container for displaying songs
const prevAndNextContainer = document.querySelector('#prev-and-next-container') // Selects the container for previous and next buttons

// API base URL
const apiURL = `https://api.lyrics.ovh`

// Function to fetch data from a given URL using async/await
const fetchData = async url => {
    const response = await fetch(url)
    return await response.json()
}

// Function to fetch more songs based on provided URL
const getMoreSongs = async url => {
    const data = await fetchData(`https://cors-anywhere.herokuapp.com/${url}`)
    insertSongsIntoPage(data)
}

// Function to insert previous and next buttons into the page
const insertNextAndPrevButtons = ({ prev, next }) => {
    prevAndNextContainer.innerHTML = `
    ${prev ? `<button class="btn" onClick="getMoreSongs('${prev}')">Previous</button>` : ''}
    ${next ? `<button class="btn" onClick="getMoreSongs('${next}')">Next</button>` : ''}
    `
}

// Function to insert songs into the page
const insertSongsIntoPage = ({ data, prev, next }) => {
    songsContainer.innerHTML = data.map(({ artist: { name }, title }) => `
        <li class="song">
            <span class="song-artist"><strong>${name}</strong> - ${title}</span>
            <button class="btn" data-artist="${name}" data-song-title="${title}">View Lyrics</button>
        </li>
    `).join('')

    if (prev || next) {
        insertNextAndPrevButtons({ prev, next })
        return
    }

    prevAndNextContainer.innerHTML = ''
}

// Function to fetch songs based on the search term
const fetchSongs = async term => {
    const data = await fetchData(`${apiURL}/suggest/${term}`)
    insertSongsIntoPage(data)
}

// Function to handle form submission
const handleFormSubmit = event => {
    event.preventDefault()

    const searchTerm = searchInput.value.trim()
    searchInput.value = ''
    searchInput.focus()

    if (!searchTerm) {
        songsContainer.innerHTML = `<li class= "warning-message"> Please enter artist name</li>`
        return
    }

    fetchSongs(searchTerm)
}

// Event listener for form submission
form.addEventListener('submit', handleFormSubmit)

// Function to insert lyrics into the page
const insertLyricsIntoPage = ({ lyrics, artist, songTitle }) => {
    songsContainer.innerHTML = `
        <li class"lyrics-container">
            <h2><strong>${songTitle}</strong> - ${artist}</h2>
            <p class="lyrics">${lyrics}</p>
        </li>
    `
}

// Function to fetch lyrics for a specific artist and song title
const fetchLyrics = async (artist, songTitle) => {
    const data = await fetchData(`${apiURL}/v1/${artist}/${songTitle}`)
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
    insertLyricsIntoPage({ lyrics, artist, songTitle })
}

// Function to handle click on songs container to fetch lyrics
const handleSongsContainerClick = event => {
    const clickedElement = event.target

    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist')
        const songTitle = clickedElement.getAttribute('data-song-title')

        prevAndNextContainer.innerHTML = ''
        fetchLyrics(artist, songTitle)
    }
}

// Event listener for click on songs container
songsContainer.addEventListener('click', handleSongsContainerClick)


