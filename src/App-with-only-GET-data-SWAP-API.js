import React, { useState, useEffect, useCallback } from "react"

import MoviesList from "./components/MoviesList"
import "./App.css"

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
      const response = await fetch("https://swapi.dev/api/films/")
      if (!response.ok) {
        throw new Error("Something went wrong!")
      }
      const data = await response.json()
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        }
      })

      setMovies(transformedData)
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

  const addMovieHandler = (newMoview) => {
    console.log(newMoview)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading && <p>loading...</p>}
        {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>}
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  )
}

export default App
