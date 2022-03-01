import { useHooks } from "@components/providers/web3"
const enhanceHook = (swrResponse) => {
    return {
        ...swrResponse,
        hasInitialResponse: swrResponse.data || swrResponse.error
    }
}

export const useNetwork = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network : swrRes
    }
}

export const useAccount = () => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useAccount)())
    return {
        account : swrRes
    }
}

export const useOwnedCourses = () => {
    const res = useHooks(hooks => hooks.useOwnedCourses)()

    return {
        ownedCourses: {data: res}
    }
}

export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()

    return {
        account,
        network,
        canPurchaseCourse: !!(account.data && network.isSupported)
    }
}