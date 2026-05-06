// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react'
import { API_STATUS } from '../utils/constants'

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null)
  const [apiStatus, setApiStatus] = useState(API_STATUS.INITIAL)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setApiStatus(API_STATUS.LOADING)
    setError(null)
    try {
      const result = await fetchFn()
      setData(result)
      setApiStatus(API_STATUS.SUCCESS)
    } catch (err) {
      setError(err.message)
      setApiStatus(API_STATUS.FAILURE)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, apiStatus, error, refetch: fetchData }
}

export default useFetch
