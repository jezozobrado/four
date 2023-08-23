"use client";

import CorrectRow from "@/components/forms/CorrectRow";
import DefaultRow from "@/components/forms/DefaultRow";

import useFourStore from "@/lib/store/guesses";
import { useMemo, useState, useEffect } from "react";
import { GoDotFill, GoDot } from "react-icons/go";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import * as _ from "lodash";
import { timer } from "@/lib/utils";
// import { Label } from "./ui/label";
// import {
//   DialogHeader,
//   DialogFooter,
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogDescription,
// } from "./ui/dialog";
// import { Input } from "./ui/input";

interface Props {
  rawSolution: string[][];
}
const FourGame = ({ rawSolution }: Props) => {
  const colors = useMemo(
    () => ["lightcoral", "sandybrown", "mediumaquamarine", "lightblue"],
    []
  );

  const [solution, setSolution] = useState<string[][]>([]);
  const [shuffledSolution, setShuffledSolution] = useState<string[]>();

  const guesses = useFourStore((s) => s.guesses);
  const resetGuesses = useFourStore((s) => s.resetGuesses);

  const [correctGuesses, setCorrectGuesses] = useState<string[][]>([]);
  const [attempts, setAttempts] = useState(4);

  const handleSubmit = (guesses: string[], solution: string[][]) => {
    const stringifiedSolution = solution.map((s) => s.join(""));
    const stringifiedGuess = guesses.sort().join("");

    if (stringifiedSolution.includes(stringifiedGuess)) {
      setShuffledSolution((old) => old?.filter((o) => !guesses.includes(o)));
      setCorrectGuesses((o) => [...o, guesses]);
      resetGuesses();

      const container = document.getElementById("container");
      const children = container && container.children;
      if (!children) return;

      for (let i = 0; i < children.length; i++) {
        let child = children[i] as HTMLElement;
        child.style.removeProperty("background-color");
        child.style.removeProperty("color");
        // child.classList.add("animate-fadeInUp");
      }
    } else {
      for (let i = 0; i < 4; i++) {
        const tile = document.getElementById(guesses[i]);
        if (!tile) break;
        tile.style.animation = "wrongAnimation 0.4s";
      }
      setAttempts((attempt) => attempt - 1);
    }
  };

  const [asyncOnce, setAsyncOnce] = useState(false);
  const [isDoneSolution, setIsDoneSolution] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      setAsyncOnce(true);
      const unsolved = _.differenceWith(solution, correctGuesses, _.isEqual);

      for (let i = 0; i < unsolved.length; i++) {
        await timer(300);
        setCorrectGuesses((old) => [...old, unsolved[i]]);
        setShuffledSolution((old) => [
          ..._.differenceWith(old, unsolved[i], _.isEqual),
        ]);
        resetGuesses();
        const container = document.getElementById("container");
        const children = container && container.children;
        if (!children) return;

        for (let i = 0; i < children.length; i++) {
          let child = children[i] as HTMLElement;
          child.style.removeProperty("background-color");
          child.style.removeProperty("color");
        }

        await timer(1500);
        if (i === unsolved.length - 1) setIsDoneSolution(true);
      }
    };

    if (!asyncOnce && !attempts) {
      asyncFunc();
      setIsGameOver(true);
    }
  }, [attempts, solution, correctGuesses, guesses, asyncOnce]);

  useEffect(() => {
    for (let i = 0; i < 4; i++) {
      const tile = document.getElementById(String(i));
      if (!tile) return;
      tile.style.backgroundColor = colors[i];
    }
  }, [shuffledSolution]);

  useEffect(() => setSolution(JSON.parse(JSON.stringify(rawSolution))), []);

  useEffect(() => {
    solution.map((s) => {
      s.pop();
      s.sort();
    });

    setShuffledSolution(shuffleArray(solution.flat(2)));
  }, [solution]);

  return (
    <>
      <div className="mt-36">
        <span className="flex justify-center mb-3 font-medium">
          Create four groups of fours.
        </span>
        <div
          className="grid grid-cols-4 grid-rows-4 w-[95%] m-auto gap-2 h-[300px] sm:w-[600px]"
          id="container"
        >
          <CorrectRow
            correctGuesses={correctGuesses}
            rawSolution={rawSolution}
          />
          <DefaultRow shuffledSolution={shuffledSolution} />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center mt-4">
          <span>Attempts remaining:</span>

          {Array(attempts)
            .fill("")
            .map((_, i) => (
              <GoDotFill key={i} />
            ))}
          {Array(4 - attempts)
            .fill("")
            .map((_, i) => (
              <GoDot key={i} />
            ))}
        </div>
        <div className="flex w-full justify-center items-center mt-5 gap-2">
          <Button
            disabled={
              guesses.length !== 4 || !attempts || correctGuesses.length === 4
            }
            onClick={() => {
              handleSubmit(guesses, solution);
            }}
          >
            Submit
          </Button>
          {/* <Button
            disabled={guesses.length !== 4}
            onClick={() => {
              handleRestart();
            }}
          >
            Play again
          </Button> */}
        </div>
      </div>
      {!attempts && isDoneSolution && (
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Better luck next time.</DialogTitle>
              <DialogDescription>You're noob.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      {correctGuesses.length === 4 && !isGameOver && (
        <Dialog defaultOpen>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Congratulations!</DialogTitle>
              <DialogDescription>You're a genius.</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

function shuffleArray(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default FourGame;
