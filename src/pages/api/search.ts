// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ScoringLogic } from '@/services/ScoringLogic';
import type { NextApiRequest, NextApiResponse } from 'next'
import wordDetail from '../../words/WordDetail.json'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: { searchType } } = req;
  const scLogic = new ScoringLogic();

  if (searchType == "singleValueNumeric") {
    const { query: { matchWith } } = req
    const inputScore = /^\d+$/.test(matchWith as string) ? Number(matchWith) : scLogic.calculateBasicScore(matchWith as string)
    res.status(200).json((wordDetail as any).filter((item: any) => {
      return item.score == inputScore
    }).map((item: any) => item.word +"("+ item.score + ")"))
  }
  res.status(200)
}
