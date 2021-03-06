import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import chef from '../../assets/img/womenChef.png'

import {default as Button, CyberButton} from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../bento_hooks/useModal'


import Auctions from './components/Auctions'
import { useI18n  } from 'use-i18n';

const Auction: React.FC = () => {
  const t = useI18n();
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={chef} height="120" />}
                subtitle={t.auction_subtitle}
                title={t.auction_title}
              />
              <Auctions />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
          <div style={{padding: '5px'}}>
          <CyberButton
            buttonWidth={250}
            buttonHeight={100}
            onClick={onPresentWalletProviderModal}
            buttonFontSize={30}
            text={`${t.unlockWallet}`}
          />
          </div>
          </div>
        )}
      </Page>
    </Switch>
  )
}

export default Auction
