import React, { useState, useEffect } from 'react';

function Movie() {
    const [movieList, setMovieList] = useState([]);

    const getMovie = () => { 
        fetch("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
        .then(res => res.json())
        .then(json => setMovieList(json.results))
        .catch(error => console.error('Error fetching movies:', error));
    };

    useEffect(() => {
        getMovie();
    }, []);

    return (
        <div>
            {movieList.map(movie => (
                <img key={movie.id} style={{width:"300px",height:"250px",marginLeft:"10px",marginTop:"10px"}}src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            ))}
        </div>
    );
}

export default Movie;
