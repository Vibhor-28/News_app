import stringSimilarity from 'string-similarity';

const units = {
  "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
  "ten": 10, "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14, "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18, "nineteen": 19
};

const tens = {
  "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90
};

const scales = {
  "hundred": 100, "thousand": 1000, "million": 1000000, "billion": 1000000000
};

const allWords = {
  ...units,
  ...tens,
  ...scales
};

const allKeys = Object.keys(allWords);

function fuzzyMatch(word) {
  const matches = stringSimilarity.findBestMatch(word, allKeys);
  return matches.bestMatch.target;
}

export function wToN(word) {
  let result = 0;
  let current = 0;
  let scale = 1;

  const words = word.toLowerCase().split(/[\s-]+/);

  words.forEach(w => {
    const matchedWord = fuzzyMatch(w);
    if (units[matchedWord] !== undefined) {
      current += units[matchedWord];
    } else if (tens[matchedWord] !== undefined) {
      current += tens[matchedWord];
    } else if (matchedWord === "hundred") {
      current *= scales[matchedWord];
    } else if (scales[matchedWord] !== undefined) {
      scale = scales[matchedWord];
      result += current * scale;
      current = 0;
    } else {
      throw new Error(`Unknown word: ${matchedWord}`);
    }
  });

  return result + current;
}


