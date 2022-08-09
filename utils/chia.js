"use strict";

const fs = require("fs");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const chalk = require("chalk");

// const {
//   NFTName,
//   symbol,
//   description,
//   external_url,
//   royaltyFee,
//   creators,
// } = require(path.join(basePath, "/Solana/solana_config.js"));
const { startIndex } = require(path.join(basePath, "/src/config.js"));
const imagesDir = `${basePath}/build/images`;
const jsonDir = `${basePath}/build/json`;

const chipBuildPath = `${basePath}/build/chia`;
const chipDir = `${basePath}/build/chia`;

// Deletes existing build path if exists and remakes folders
const setup = () => {
  if (fs.existsSync(chipBuildPath)) {
    fs.rmSync(chipBuildPath, {
      recursive: true,
    });
  }
  fs.mkdirSync(chipBuildPath);
  fs.mkdirSync(path.join(chipBuildPath, "/json"));
  fs.mkdirSync(path.join(chipBuildPath, "/images"));
};

const getIndividualJsonFiles = () => {
  return fs
    .readdirSync(jsonDir)
    .filter((item) => /^[0-9]{1,6}.json/g.test(item));
};

// Setup
setup();
console.log(chalk.cyan.black("Beginning Tezos conversion"));
console.log(
  chalk.cyan(`\nExtracting files.\nWriting to folder: ${chipBuildPath}`)
);

// Identify json files
const jsonFiles = getIndividualJsonFiles();
console.log(
  chalk.green(`Found ${jsonFiles.length} json files in "${jsonDir}" to process`)
);