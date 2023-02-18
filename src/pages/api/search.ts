// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import wordDetail from '../../words/WordDetail.json'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {query: { searchType }} = req;

    if(searchType == "singleValueNumeric"){
        const {query:{scoreToMatch}}  = req
        res.status(200).json((wordDetail as any).filter((item: any) => {
          return item.score == scoreToMatch
       }).map((item:any) => item.word))
    }
  res.status(200)
}
