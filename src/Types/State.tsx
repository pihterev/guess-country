export type UserState = {
  level: number,
  attempts: number,
  number_correct_answers: number
  game_state: GameState
  opened_countries: number[]
};

export enum GameState {
  START = 'start',
  PROCESS = 'process',
  PAUSE = 'pause',
  END = 'end'
}
