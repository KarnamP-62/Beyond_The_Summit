import { createContext, useContext } from 'react'
import { useData as useDataHook } from '../hooks/useData'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const { data, loading, error } = useDataHook()

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
