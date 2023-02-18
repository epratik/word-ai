// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { wordDictionary } from '../../words/WordDictionary'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const fs = require('fs');

  let wordList: {
    word: string,
    score: number,
    startChar: string,
    endChar: string
  }[] = []

  const dictWithoutDuplicates: any = {};

  for (const key in wordDictionary) {
    const keyWithoutSpecChar = key.replace(/[^a-zA-Z0-9 ]/g, '')
    if (dictWithoutDuplicates.hasOwnProperty(keyWithoutSpecChar)) {
      continue;
    }
    dictWithoutDuplicates[keyWithoutSpecChar] = wordDictionary[keyWithoutSpecChar];
  }

  Object.keys(dictWithoutDuplicates).forEach(key => {

    const score = key.split('').reduce((total, char) => {
      const val = (char.charCodeAt(0) == 32) ? 0 : (char.charCodeAt(0) - 96)
      return total + val
    }, 0)

    wordList.push({
      word: key,
      score: score,
      startChar: key.slice(0, 1),
      endChar: key.slice(-1)
    })
  });

  var jsonContent = JSON.stringify(wordList);

  fs.writeFile("output.json", jsonContent, 'utf8', function (err: any) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });

  res.status(200)
}
