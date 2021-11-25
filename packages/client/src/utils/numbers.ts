import { assoc, chain, times } from 'ramda'

type RandomNumberProps = {
  'from-to': [number, number]
  length: number
}

export const random = chain(
  assoc('collect'),
  ({'from-to': fromTo, length}: RandomNumberProps)=> times(
    ()=>Math.ceil(Math.random() * (fromTo[1] - fromTo[0]) + fromTo[0]),
    length
  )
)