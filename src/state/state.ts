export interface IndividualPlayerScore {
  readonly playerName: string;
  readonly key: string;
  readonly bid: number | null;
  readonly result: number | null;
  readonly score: number;
}

export interface PlayerScore {
  readonly cardsNumber: number;
  readonly scores: IndividualPlayerScore[];
}

export interface RoundData {
  readonly roundNumber: number;
  readonly roundStep: 'bidding' | 'results';
}

export interface State {
  readonly language: 'en' | 'ro';
  readonly numberOfPlayers: number | null;
  readonly playerNames: string[];
  readonly playerScores: PlayerScore[];
  readonly cardRounds: number[];
  readonly currentRoundData: RoundData;
  readonly startingPlayerIndex: number;
}

export const defaultState: State = {
  language: 'en',
  numberOfPlayers: null,
  playerNames: [],
  playerScores: [],
  cardRounds: [],
  currentRoundData: {
    roundNumber: 0,
    roundStep: 'bidding'
  },
  startingPlayerIndex: 0,
};
