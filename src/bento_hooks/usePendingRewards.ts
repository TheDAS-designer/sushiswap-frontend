import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBentoMinerContract, getMyUnclaimBento } from '../bento/utils'
import useBento from './useBento'
import useBlock from './useBlock'

const usePendingRewards = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bento = useBento()
  const bentoMinerContract = getBentoMinerContract(bento)
  const block = useBlock()

  const fetchUnclaimBento = useCallback(async () => {
    const balance = await getMyUnclaimBento(bento, account)
    setBalance(balance)
  }, [account, bentoMinerContract, bento])

  useEffect(() => {
    if (account && bentoMinerContract && bento) {
      fetchUnclaimBento()
    }
  }, [account, block, bentoMinerContract, setBalance, bento])

  return balance
}

export default usePendingRewards
