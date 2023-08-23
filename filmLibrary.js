import {Film} from "./film.js";


export const FilmLibrary = {
     API_KEY : "a4ad6f6e7b06660b32432abfeb19ec3d",
     film_list : [],

    async getAllFilms(){
        try {
            const response = await  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${this.API_KEY}`)
            const data = await response.json();
            console.log(data)

            this.film_list = this.convertDataToFilms(data.results)
            this.convertFilmListToHTML()
        }
        catch (err){
            console.log(`Apiden ${err} - adli error gelir `)
        }
    },
    convertDataToFilms(data){
         return data.map(element=> new Film(element.title,element.original_language,element.release_date.split("-")[0],element.poster_path,element.vote_average))
    },
    convertFilmListToHTML(films= this.film_list) {
         const film_list_box = document.querySelector("#film-list");
         film_list_box.innerHTML = "";

         if(films.length===0){
             film_list_box.innerHTML = `<p class="alert alert-danger p-2">Bele bir film yoxdur</p>`
             return
         }
         films.forEach((kino)=>{
             const cardElement = this.createCardElement(kino)
             film_list_box.appendChild(cardElement);
         })
    },
    async searchFilmFromInternet(keyword){
        try {
            // query
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${keyword}`)
            const data = await response.json()

            const films = this.convertDataToFilms(data.results)
            console.log(films) //results
            this.convertFilmListToHTML(films)
        }

        catch(err) {
            console.log("Xeta bash verdi"+err)
        }
    },
    createCardElement (f){
        // v1
        const cardElement = document.createElement('div')

        // <div class="">
        cardElement.classList.add("card", "col-md-6", "col-lg-3","my-2")

        const imageElement = document.createElement("img")
        imageElement.classList.add("card-img-top")
        imageElement.src = f.getPosterUrl()

        cardElement.appendChild(imageElement)

        const cardBodyElement = document.createElement("div")
        cardBodyElement.classList.add("card-body")

        const titleElement = document.createElement("h5")
        titleElement.classList.add('card-title')
        titleElement.innerText = f.getInfo()

        cardBodyElement.appendChild(titleElement)



        const paraqrafForVote = document.createElement("p")
        paraqrafForVote.classList.add('card-text')
        paraqrafForVote.innerText = f.votingScore

        cardBodyElement.appendChild(paraqrafForVote)

        const yearElement = document.createElement("p")
        yearElement.classList.add('card-text')
        yearElement.innerText = f.language

        cardBodyElement.appendChild(yearElement)


        cardElement.appendChild(cardBodyElement)

        return cardElement
    },
    searchFilmListener() {
        const searchFilmForm = document.getElementById('film-search-form')

        const input = searchFilmForm.querySelector('input')

        searchFilmForm.addEventListener('submit', async(e)=> {
            e.preventDefault()

            const searching_key = input.value.trim()

            if(searching_key ==="") {
                return
            }

            await this.searchFilmFromInternet(searching_key)
        })

        input.addEventListener('input', async (e)=> {
            e.preventDefault()
            const searching_key = input.value.trim()

            if(searching_key ==="") {
                return
            }

            await this.searchFilmFromInternet(searching_key)




        })


    },
    start() {
        this.getAllFilms()
            this.searchFilmListener()
    }
}