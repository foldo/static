import { FoldoBuilder } from 'foldo/types'

type MyOptions = {
  x: string
}

export function identity(options:MyOptions):FoldoBuilder{
  return {
    single: (id:string) => ({
      [id]: ({ contents }) => contents
    })
  }
}