import React from 'react';
import { useRouter } from 'next/router';
import { Button, Box } from '@mui/material';
import { Skeleton } from '@mui/lab';
import { useIsSupportedNetwork } from 'utils';
import { useActiveWeb3React } from 'hooks';
import {
  useWalletModalToggle,
  useNetworkSelectionModalToggle,
} from 'state/application/hooks';
import { useTranslation } from 'next-i18next';
import styles from 'styles/pages/Home.module.scss';
import { ChainId } from '@uniswap/sdk';
import { getConfig } from 'config';

const HeroSection: React.FC<{ globalData: any; v3GlobalData: any }> = ({
  globalData,
  v3GlobalData,
}) => {
  const router = useRouter();
  const isSupportedNetwork = useIsSupportedNetwork();
  const { chainId, account } = useActiveWeb3React();
  const chainIdToUse = chainId ?? ChainId.MATIC;
  const toggleWalletModal = useWalletModalToggle();
  const toggleNetworkSelectionModal = useNetworkSelectionModalToggle();
  const { t } = useTranslation();
  const config = getConfig(chainIdToUse);
  const v2 = config['v2'];
  const v3 = config['v3'];

  return (
    <Box className={styles.heroSection}>
      <small className='text-bold'>{t('totalValueLocked')}</small>
      {(v2 ? globalData : true) && (v3 ? v3GlobalData : true) ? (
        <Box display='flex' pt='5px'>
          <h3>$</h3>
          <h1>
            {(
              (v2 ? Number(globalData.totalLiquidityUSD) : 0) +
              (v3 ? Number(v3GlobalData.totalLiquidityUSD) : 0)
            ).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </h1>
        </Box>
      ) : (
        <Box my={1}>
          <Skeleton variant='rectangular' width={400} height={72} />
        </Box>
      )}
      <h5>{t('topAssetExchange')}</h5>
      <Button
        fullWidth
        size='large'
        variant='contained'
        onClick={() => {
          !isSupportedNetwork
            ? toggleNetworkSelectionModal()
            : account
            ? router.push('/swap')
            : toggleWalletModal();
        }}
      >
        {!isSupportedNetwork
          ? t('switchNetwork')
          : account
          ? t('enterApp')
          : t('connectWallet')}
      </Button>
    </Box>
  );
};

export default HeroSection;
