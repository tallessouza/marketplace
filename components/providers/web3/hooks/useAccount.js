import { useEffect } from "react"
import useSWR from "swr"

const adminAdresses = {
    "0xbe67d7242eb0d6be54ba81329cb6527fdbe0398d68b175805b71cfae121b82d2": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [data])
  
  return { 
    data,
    isAdmin: (
    data && 
    adminAdresses[web3.utils.keccak256(data)]) ?? false,
    mutate, 
    ...rest
  }
}