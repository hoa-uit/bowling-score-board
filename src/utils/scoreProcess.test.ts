import { describe, expect, it } from 'vitest';
import ScoreProcess, { scoreFromPins, ScoreListToScore } from './scoreProcess';

describe('scoreFromPins', () => {
  it('should calculate the score correctly for a normal game', () => {
    const pins = [1, 4, 4, 5, 6, 4, 5, 5, 10, 0, 1, 7, 3, 6, 4, 10, 2, 8, 6];
    const nbOfPins = 10;
    const nbOfFrames = 10;
    const result = scoreFromPins(pins, nbOfPins, nbOfFrames);
    expect(result).toEqual([5, 14, 29, 49, 60, 61, 77, 97, 117, 133]);
  });

  it('should handle a perfect game', () => {
    const pins = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    const nbOfPins = 10;
    const nbOfFrames = 10;
    const result = scoreFromPins(pins, nbOfPins, nbOfFrames);
    expect(result).toEqual([30, 60, 90, 120, 150, 180, 210, 240, 270, 300]);
  });
});

describe('ScoreListToScore', () => {
  it('should convert a score list to pins correctly', () => {
    const scoreList = [
      'X',
      '7',
      '/',
      '9',
      '0',
      'X',
      '0',
      '8',
      '8',
      '/',
      '0',
      '6',
      'X',
      'X',
      'X',
      '8',
      '1',
    ];
    const pinNumber = 10;
    const result = ScoreListToScore(scoreList, pinNumber);
    expect(result).toEqual([10, 7, 3, 9, 0, 10, 0, 8, 8, 2, 0, 6, 10, 10, 10, 8, 1]);
  });
});

describe('ScoreProcess', () => {
  it('should process the score correctly for a normal game', () => {
    const scoreList = [
      '1',
      '4',
      '4',
      '5',
      '6',
      '/',
      '5',
      '/',
      'X',
      '0',
      '1',
      '7',
      '/',
      '6',
      '/',
      'X',
      '2',
      '/',
      '6',
    ];
    const pinNumber = 10;
    const roundNumber = 10;
    const result = ScoreProcess(scoreList, pinNumber, roundNumber);
    expect(result).toBe(133);
  });

  it('should process the score correctly for a perfect game', () => {
    const scoreList = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    const pinNumber = 10;
    const roundNumber = 10;
    const result = ScoreProcess(scoreList, pinNumber, roundNumber);
    expect(result).toBe(300);
  });
});
