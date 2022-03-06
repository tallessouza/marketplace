import { useEffect } from "react"
import useSWR from "swr"

const adminAdresses = {
    "0xffbb06a41245503fd50d7dea49a74f7eaf1e54bd8c906b7597ee94764874d5d5": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if(!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }
      return account
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [data, mutate])
  
  return { 
    data,
    isAdmin: (
    data && 
    adminAdresses[web3.utils.keccak256(data)]) ?? false,
    mutate, 
    ...rest
  }
}