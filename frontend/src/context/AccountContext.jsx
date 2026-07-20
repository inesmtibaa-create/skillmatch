import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'skillmatch-demo-account'
const AccountContext = createContext(null)

function readStoredAccount() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(readStoredAccount)

  const value = useMemo(() => ({
    account,
    openSession(role, profile) {
      const next = { role, profile }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setAccount(next)
    },
    closeSession() {
      sessionStorage.removeItem(STORAGE_KEY)
      setAccount(null)
    },
  }), [account])

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount() {
  return useContext(AccountContext)
}
