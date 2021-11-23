import { Dispatch, SetStateAction, useState } from 'react'

interface ReturnType {
  count: number
  increment: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

function useCounter(initialValue?: number): ReturnType {
  const [count, setCount] = useState(initialValue || 0)

  const increment = () => setCount(x => x + 1)
  const reset = () => setCount(initialValue || 0)

  return {
    count,
    increment,
    reset,
    setCount,
  }
}

export default useCounter