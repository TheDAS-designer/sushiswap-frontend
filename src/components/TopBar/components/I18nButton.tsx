import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import Spacer from '../../Spacer'
import { useI18n, setLang  } from 'use-i18n';

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const t = useI18n();
  const [lang, setNewLang] = setLang();
  const change = (l: string) => {
    setNewLang(l);
  }

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])


//<Button onClick={handleUnlockClick} size="sm" text="Unlock Wallet" />
//<Button onClick={onPresentAccountModal} size="sm" text="My Wallet" />
  return (
    <StyledI18nButton>
      <Button onClick={()=> {change('en')}} size="sm" text='EN' disabled={(lang === 'en') ? true : false} />
      <Button onClick={()=> {change('zh-CN')}} size="sm" text='中' disabled={(lang === 'zh-CN') ? true : false} />
    </StyledI18nButton>

  )
}

const StyledI18nButton = styled.div`
  display: flex;
  justify-content: space-between;
  color: #aa9584;
  width: 20%;
  line-height: 32px;
  font-size: 10px;
  text-align: center;
`

export default AccountButton