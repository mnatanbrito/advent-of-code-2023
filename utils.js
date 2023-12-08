import {
  readFile as readFileInternal,
  writeFile as writeFileInternal,
} from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const readAsync = promisify(readFileInternal);
const writeAsync = promisify(writeFileInternal);

export async function readFile(filename) {
  const data = await readAsync(join(__dirname, filename), {
    encoding: "utf8",
  });

  return data;
}

export async function writeFile(filename, data) {
  return await writeAsync(join(__dirname, filename), data, {
    encoding: "utf8",
  });
}

export function replaceNonDigits(str) {
  return (str || "").replace(/\D+/g, "");
}

export function replaceSpelledDigits(str) {
  let finalStr = "";
  const matchMappings = {};
  const replacementMap = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const matches = findDigitMatches(str);

  for (const match of matches || []) {
    const idxs = getAllIndexes(str, match);
    for (const idx of idxs) {
      if (idx !== -1) {
        matchMappings[idx] = {
          digit: replacementMap[match],
          endIndex: idx + match.length,
        };
      }
    }
  }

  const strSplit = str.split("");
  let currentEndIndex = 0;
  for (let i = 0; i < strSplit.length; i++) {
    const digitMapping = matchMappings[`${i}`];
    if (digitMapping) {
      currentEndIndex = digitMapping.endIndex;
      finalStr += digitMapping.digit;
    } else {
      if (i >= currentEndIndex) {
        finalStr += strSplit[i];
      }
    }
  }

  return finalStr;
}

function findDigitMatches(str) {
  const DIGITS_REGEX = [
    /one/g,
    /two/g,
    /three/g,
    /four/g,
    /five/g,
    /six/g,
    /seven/g,
    /eight/g,
    /nine/g,
  ];
  const matches = [];
  for (const digit of DIGITS_REGEX) {
    const match = str.match(digit);
    if (!!match && !matches.includes(match[0])) {
      matches.push(match[0]);
    }
  }
  return matches;
}

function getAllIndexes(source, searchValue) {
  var indexes = [];
  var index = source.indexOf(searchValue);

  while (index !== -1) {
    indexes.push(index);
    index = source.indexOf(searchValue, index + 1);
  }

  return indexes;
}
