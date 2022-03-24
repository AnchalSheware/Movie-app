import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import MovieList from "./Component/MovieList";
import MovieListHeading from "./Component/MovieListHeading";
import SearchBox from "./Component/SearchBox";
import AddFavorites from "./Component/AddFavorites";
import RemoveFavourites from "./Component/RemoveFavourites";

const App = () => {
  const[movies,setmovies] = useState ([]);
  const[searchValue, setSearchValue] = useState(" ");
  const[favourites,setFavourites]=useState([]);

const getmovies = async() => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=2541f189`;

  const response = await fetch(url);
  const responseJson = await response.json();
  if(responseJson.Search){
    setmovies(responseJson.Search);
  }
  
}
useEffect(()=>{
   getmovies(); 
},[searchValue])

useEffect(()=>{
  const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites")); 
  setFavourites(movieFavourites);
},[])


const savetoLocalStorage = (items) => {
  localStorage.setItem("react-movie-app-favourites",JSON.stringify(items));
}

const addFavoriteMovie = (movie) => {
  console.log("Favorites is  called");
  // const newFavouriteList = [...favourites, movie];
 console.log('favourites: ', favourites);
//  console.log('newFavouriteList: ', newFavouriteList);
  setFavourites([...favourites, movie]);
  savetoLocalStorage(favourites);
}
 const removeFavoritesMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite)=>favourite.imdbID !== movie.imdbID) 
    console.log(newFavouriteList);
    setFavourites(newFavouriteList);
    savetoLocalStorage(newFavouriteList);


 }
return(
  
    <div className="container-fluid movie-app">
      <div className="row d-flex align-item-center mt-4 mb-4">
          <MovieListHeading heading = "Movies"></MovieListHeading>
          <SearchBox 
          searchValue={searchValue}
          setSearchValue ={setSearchValue}
          on/>
        </div>
      <div className="row">
          <MovieList movies={movies} 
          handleFavoritesClick={addFavoriteMovie}
           favoriteComponent={AddFavorites} />
       </div>
       <div className="row d-flex align-item-center mt-4 mb-4">
          <MovieListHeading heading = "Favourites"></MovieListHeading>
       </div>
         <div className="row">
             <MovieList movies={favourites}
             handleFavoritesClick={removeFavoritesMovie}
             favoriteComponent={RemoveFavourites}
           />
        </div>
    </div>
      
  );
};

export default App;
