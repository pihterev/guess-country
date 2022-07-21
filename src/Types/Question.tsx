export type Question = {
  type: QuestionType,
  country: Country
}

export enum QuestionType {
  WHERE = 'where'
}

type Country = {
  value: number,
  name: string
}
