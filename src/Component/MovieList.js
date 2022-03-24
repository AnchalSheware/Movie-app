import React from "react";
import AddFavorites from "./AddFavorites";

const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent;
    return(
        <>
         {props.movies.map((movie , index) => (
             <div className="image-container d-flex justify-content-start m-3">
                 <img src={movie.Poster} alt="Poster"></img>
                 <div
                 onClick={()=>props.handleFavoritesClick(movie)}
                 className="overlay d-flex align-items-center justify-content">
                     <FavoriteComponent/>
                 </div>
             </div>
         ))
         }
        </>
    )
};

export  default MovieList;