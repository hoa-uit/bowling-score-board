export function scoreFromPins(pins: number[], nbOfPins: number, nbOfFrames: number) {
  const score: number[] = new Array(nbOfFrames);
  let counter: number = 0;
  for (let i = 0; i + 1 < pins.length; i += 2) {
    if (counter > nbOfFrames - 1) {
      break;
    }

    if (pins[i] + pins[i + 1] < nbOfPins) {
      score[counter] = pins[i] + pins[i + 1];
      counter++;
      continue;
    }

    if (i + 2 >= pins.length) {
      break;
    }

    score[counter] = pins[i] + pins[i + 1] + pins[i + 2];
    counter += 1;

    if (pins[i] === nbOfPins) {
      i--;
    }
  }

  for (let i = 1; i < nbOfFrames; i++) {
    score[i] += score[i - 1];
  }

  return score;
}

export function ScoreListToScore(ScoreList: any, pinNumber: number) {
  const firstPass: number[] = [];
  for (let i = 0; i < ScoreList.length; i++) {
    if (ScoreList[i] === ' ') {
      firstPass.push(-1);
    } else if (ScoreList[i] === 'X' || ScoreList[i] === pinNumber) {
      firstPass.push(pinNumber);
    } else if (ScoreList[i] === '/') {
      firstPass.push(pinNumber - firstPass[firstPass.length - 1]);
    } else {
      firstPass.push(parseInt(ScoreList[i], 10));
    }
  }

  const secondPass: number[] = [];
  for (let i = 0; i < firstPass.length; i++) {
    if (firstPass[i] !== -1) {
      secondPass.push(firstPass[i]);
    }
  }

  return secondPass;
}

export default function ScoreProcess(ScoreList: any, pinNumber: number, roundNumber: number) {
  let score: number[] = new Array(10);
  const pins: number[] = ScoreListToScore(ScoreList, pinNumber);
  score = scoreFromPins(pins, pinNumber, roundNumber);
  let lastScore: number = 0;
  for (let i = 0; i < score.length; i++) {
    if (!Number.isNaN(score[i])) {
      lastScore = i;
    }
  }
  return score[lastScore];
}
