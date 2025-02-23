
# mv-rate [![npm version](https://img.shields.io/npm/v/mv-rate)](https://www.npmjs.com/package/mv-rate) 



mv-rate is a command-line tool that allows users to quickly search for movie details and ratings from the OMDB API. With a simple command, you can fetch IMDb ratings, Metacritic scores, release years, and more for any movie or series.

## 📥 Installation

Install mv-rate with npm

```bash
  npm install -g mv-rate 
  mv-rate
```
    
## 🚀 Usage

Search for a Movie by Title

```bash
  mvrt search Inception
```
Search for Movies with a Specific Release Year

```bash
  mvrt search Avatar -y 2009

```
Search for a Series

```bash
  mvrt search Breaking Bad -t series

```
    
## API Reference

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `OMDB_KEY` | `string` | **Required**. Your OMDB API key |



## 🏷️ License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).


## Requirements

- Node
- npm 
- OMDB Api key




## 📌 Author

- [@TanishkDhope](https://www.github.com/TanishkDhope)

