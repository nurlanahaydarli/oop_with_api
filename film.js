export class Film{
    constructor(title,language,releaseYear,posterPath,votingScore) {
        this.title=title
        this.language=language
        this.releaseYear=releaseYear
        this.posterPath=posterPath
        this.votingScore=votingScore
    }
    getInfo(){
        return `${this.title} (${this.releaseYear})`
    }
    getPosterUrl(){
        return `https://image.tmdb.org/t/p/w500${this.posterPath}`
    }
}
