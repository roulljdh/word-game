import { shuffle } from "lodash";
import letterValues from "../data/letter-values";
import words from "../data/words.json";

export function getRandomWord(): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function generateHand(word: string): string {
  return shuffle(word.split("")).join(" ");
}

export function getScore({
  word,
  isFirstTry,
  n,
}: {
  word: string;
  isFirstTry: boolean;
  n: number;
}) {
  if (words.includes(word.toUpperCase())) {
    let score: number = Array.from(word)
      .map((letter) => letterValues[letter.toLowerCase()] ?? 0)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    score *= word.length;

    if (isFirstTry && word.length === n) {
      score += 50;
    }

    return score;
  }

  return 0;
}
