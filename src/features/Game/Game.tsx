import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useMemo, useRef, useState } from "react";
import { generateHand, getRandomWord, getScore } from "../../utils";

export function Game() {
  const randomWord: string = useMemo(getRandomWord, []);

  const hand: string = useMemo(() => generateHand(randomWord), [randomWord]);

  const [word, setWord] = useState<string>("");

  const isFirstTry = useRef(true);

  const submittedWords = useRef<string[]>([]);

  const [score, setScore] = useState<number>(0);

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittedWords.current.includes(word.toLowerCase())) {
      return alert(`You already submitted "${word}"!`);
    }

    const score = getScore({
      word,
      isFirstTry: isFirstTry.current,
      n: randomWord.length,
    });

    if (isFirstTry.current) {
      isFirstTry.current = false;
    }

    if (score === 0) {
      alert(`"${word}" is invalid!`);
    } else {
      submittedWords.current = [...submittedWords.current, word.toLowerCase()];

      setScore((previousScore) => previousScore + score);

      setWord("");

      alert(`Yay! "${word}" scored ${score} points!`);
    }
  }

  function resetGame() {
    isFirstTry.current = true;
    submittedWords.current = [];
    setScore(0);
    setWord("");
  }

  function startNewGame() {
    window.location.reload();
  }

  function endGame() {
    const optimalFirstScore = getScore({
      word: randomWord,
      isFirstTry: true,
      n: randomWord.length,
    });

    alert(
      `Game over!\nYour total score is: ${score} points\nThe optimal outcome of the game is if you answered "${randomWord}" on your first try.\nYou could have gotten ${optimalFirstScore} points for that.`
    );

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} style={{ height: "100vh" }}>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item>
          <Grid container spacing={2} direction="row">
            <Grid item>
              <Button variant="contained" color="info" onClick={resetGame}>
                Reset Game
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="warning"
                onClick={startNewGame}
              >
                Start New Game
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error" onClick={endGame}>
                End Game
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h2">{hand}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">{`Score: ${score} points`}</Typography>
        </Grid>
        <Grid item>
          <TextField
            required
            label="Word"
            value={word}
            onChange={(event) => setWord(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
