#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import { configDotenv } from "dotenv";
import readline from "readline";

configDotenv();

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const program = new Command();

const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

// Function to prompt user for API key
const promptForApiKey = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(chalk.yellow("Enter your OMDB API Key: "), (key) => {
      rl.close();
      fs.appendFileSync(".env", `OMDB_KEY=${key}\n`);
      console.log(chalk.green("API key saved successfully!"));
      resolve(key);
    });
  });
};

// Ensure API key is available
const ensureApiKey = async () => {
  let apiKey = process.env.OMDB_KEY;
  if (!apiKey) {
    console.log(chalk.red("OMDB API Key not found!"));
    apiKey = await promptForApiKey();
  }
  return apiKey;
};

program
  .name("movierating2")
  .description("A simple CLI tool to view movie ratings")
  .version(packageJson.version)
  .option("-y, --year <year>", "Get Movie By Year")
  .option("-t, --type <type>", "Get Movie By Type (series/movie/episode)");

program
  .command("search <name>")
  .description("Get Movie Details")
  .action(async (name) => {
    const apiKey = await ensureApiKey();
    const { year, type } = program.opts();

    let url;
    if (year) {
      url = `http://www.omdbapi.com/?t=${name}&y=${year}&apikey=${apiKey}`;
    } else {
      url = `http://www.omdbapi.com/?s=${name}&apikey=${apiKey}`;
    }

    try {
      const data = await fetchData(url);
      if (data.Search) {
        data.Search.forEach((movie) => {
          console.log(chalk.green(movie.Title) + chalk.blue(" (" + movie.Year + ")"));
        });
      } else {
        console.log(chalk.green(data.Title) + chalk.blue(" (") + chalk.yellow(data.Year) + chalk.blue(")"));
        console.log(chalk.blue("IMDB Rating:") + chalk.yellow(data.imdbRating));
        console.log(chalk.blue("Metacritic Rating:") + chalk.yellow(data.Metascore));
      }
    } catch (error) {
      console.error(chalk.red("Error fetching data:"), error);
    }
  });

program.parse(process.argv);
