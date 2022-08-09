"use strict";

const fs = require("fs");
const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const chalk = require("chalk");

const {
  sensitive_content,
  format,
  collection,
} = require(path.join(basePath, "/Chia/chia_config.js"));
const { startIndex } = require(path.join(basePath, "/src/config.js"));
// const imagesDir = `${basePath}/build/images`;
const jsonDir = `${basePath}/build/json`;

const chiaBuildPath = `${basePath}/build/chia`;

// Deletes existing build path if exists and remakes folders
const setup = () => {
  if (fs.existsSync(chiaBuildPath)) {
    fs.rmSync(chiaBuildPath, {
      recursive: true,
    });
  }
  fs.mkdirSync(chiaBuildPath);
  fs.mkdirSync(path.join(chiaBuildPath, "/json"));
  fs.mkdirSync(path.join(chiaBuildPath, "/images"));
};

const getIndividualJsonFiles = () => {
  return fs
    .readdirSync(jsonDir)
    .filter((item) => /^[0-9]{1,6}.json/g.test(item));
};

// Setup
setup();
console.log(chalk.cyan.black("Beginning Chia conversion"));
console.log(
  chalk.cyan(`\nExtracting files.\nWriting to folder: ${chiaBuildPath}`)
);

// Identify json files
const jsonFiles = getIndividualJsonFiles();
console.log(
  chalk.green(`Found ${jsonFiles.length} json files in "${jsonDir}" to process`)
);

// Iterate, open and put in metadata list
jsonFiles.forEach((file) => {
  let nameWithoutExtension = file.slice(0, -4);
  let editionCountFromFileName = Number(nameWithoutExtension);
  let newEditionCount = editionCountFromFileName - startIndex;

  const rawData = fs.readFileSync(`${jsonDir}/${file}`);
  const jsonData = JSON.parse(rawData);

  let tempMetadata = {
    name: jsonData.name,
    description: jsonData.description,
    attributes: jsonData.attributes,
    sensitive_content,
    format,
    collection,
  };
  fs.writeFileSync(
    path.join(`${chiaBuildPath}`, "json", `${newEditionCount}.json`),
    JSON.stringify(tempMetadata, null, 2)
  );
});
console.log(
  `\nFinished converting json metadata files to being chia-ready.`
);
console.log(chalk.green(`\nConversion was finished successfully!\n`));