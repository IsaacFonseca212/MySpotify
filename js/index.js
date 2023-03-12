const cardTop = document.querySelector('#cardTop').content
const contenido = document.querySelector('#contenido')
const fragment = document.createDocumentFragment()
const btnBuscar = document.getElementById('buscador')
const imgMX = document.getElementById('MX')
const imgUSA = document.getElementById('USA')
const imgJP = document.getElementById('JP')
const imgDEU = document.getElementById('DEU')
const imgESP = document.getElementById('ESP')
const imgOS = document.getElementById('OS')

const inputAlbum = document.getElementById('inputAlbum')
const btnBuscarAlbum = document.getElementById('btnBuscar')
let topTwoHundred = []

document.addEventListener('DOMContentLoaded', () =>{
    loadMusicData()
})

/*imgMX.addEventListener('click', () =>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '759d40aa2emsh4191a12f29d1b59p1e6001jsn0ee8292679a7',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify81.p.rapidapi.com/top_200_tracks?country=MX', options)
        .then(response => response.json())
        .then(response => {
            topTwoHundred = response
            creaCards(topTwoHundred)
            console.log('canciones', topTwoHundred)
        })
        .catch(err => console.error(err));
})*/

const loadMusicData = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '759d40aa2emsh4191a12f29d1b59p1e6001jsn0ee8292679a7',
            'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify81.p.rapidapi.com/top_200_tracks', options)
        .then(response => response.json())
        .then(response => {
            topTwoHundred = response
            creaCards(topTwoHundred)
            console.log('canciones', topTwoHundred)
        })
        .catch(err => console.error(err));
}

const creaCards = (musica) => {
    contenido.innerHTML = ''
    musica.forEach((song) => {
        cardTop.querySelector('img').setAttribute('src', song.trackMetadata.displayImageUri);
        cardTop.querySelector('.songname').textContent = song.trackMetadata.trackName
        let artists = ''
        let size = song.trackMetadata.artists.length
        song.trackMetadata.artists.forEach((item, index) => {
            if(index === size - 1) {
                artists += item.name
            } else {
            artists += item.name + '/'
            }
        })
        cardTop.querySelector('.artistname').textContent = artists

        const clone = cardTop.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
}

btnBuscar.addEventListener('keyup', () => {
    //console.log('tecla', btnBuscar.value)
    console.log('tecla', btnBuscar.value)
    let temp = []
    temp = topTwoHundred.filter((item) => item.trackMetadata.trackName.includes(btnBuscar.value))
    creaCards(temp)
    })

    btnBuscarAlbum.addEventListener('click', () => {
        const request = inputAlbum.value.toLowerCase()
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '759d40aa2emsh4191a12f29d1b59p1e6001jsn0ee8292679a7',
                'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
            }
        };
        
        fetch(`https://spotify81.p.rapidapi.com/search?q=${request}&type=multi&offset=0&limit=10&numberOfTopResults=5`, options)
            .then(response => response.json())
            .then(response => console.log(response.albums.items))
            .catch(err => console.error(err));
    })


const call = (parametro) => {
        const country = '?country=' + parametro
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '650e154080mshc001ab9d7985cc7p1f1c1ajsnb0f87b6d417e',
                    'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
                }
            };
            
            fetch(`https://spotify81.p.rapidapi.com/top_200_tracks${country}`, options)
                .then(response => response.json())
                .then(response => {
                    topTwohundred = []
                    topTwohundred = response
                    creaCards(topTwohundred)
                    console.log('canciones', topTwohundred)
                })
                .catch(err => console.error(err));
    
    }
    
imgMX.addEventListener('click', () => {
        const countryName = 'MX'
        call(countryName)
})

imgUSA.addEventListener('click', () => {
        const countryName = 'US'
        call(countryName)
})
    
imgJP.addEventListener('click', () => {
        const countryName = 'JP'
        call(countryName)
})

imgESP.addEventListener('click', () => {
        const countryName = 'ES'
        call(countryName)
})

imgDEU.addEventListener('click', () => {
        const countryName = 'DE'
        call(countryName)
})

imgAU.addEventListener('click', () => {
        const countryName = 'AU'
        call(countryName)
})