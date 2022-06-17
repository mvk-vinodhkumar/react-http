import React, { useState, useEffect, useCallback } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"
import AddMovie from "./components/AddMovie"

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // multiple then() callbacks
  // const fetchMoviesHandler = () => {
  //   setIsLoading(true)
  //   setError(null) //to clear previous errors if any

  //   fetch("https://swapi.dev/api/films/")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("SOMETHING!")
  //       }
  //       return response.json()
  //     })
  //     .then((data) => {
  //       const transformedData = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           releaseDate: movieData.release_date,
  //           openingText: movieData.opening_crawl,
  //         }
  //       })

  //       setMovies(transformedData)
  //       setIsLoading(false)
  //     })
  //     .catch((err) => {
  //       setIsLoading(false)
  //       setError(err.message)
  //     })
  // }

  // using async await
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        "https://react-http-88862-default-rtdb.firebaseio.com/movies.json"
      )
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const data = await response.json()

      const loadedMovies = []
      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        })
        // console.log(loadedMovies[0].releaseDate)
      }

      setMovies(loadedMovies)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  let content = <p>No movies found!</p>

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  console.log(movies)

  const addMovieHandler = async (newMovie) => {
    const response = await fetch(
      "https://react-http-88862-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await response.json()
    // console.log(data)
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  )
}

export default App
