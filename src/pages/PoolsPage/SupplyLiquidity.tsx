import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { ReactComponent as SettingsIcon } from 'assets/images/SettingsIcon.svg';
import { AddLiquidity, QuestionHelper, SettingsModal } from 'components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useCurrency } from 'hooks/Tokens';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  headingItem: {
    cursor: 'pointer',
    display: 'flex',
  },
}));

const SupplyLiquidity: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { palette } = useTheme();
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const parsedQuery = useParsedQueryString();
  const qCurrency0 = useCurrency(
    parsedQuery && parsedQuery.currency0
      ? (parsedQuery.currency0 as string)
      : undefined,
  );
  const qCurrency1 = useCurrency(
    parsedQuery && parsedQuery.currency1
      ? (parsedQuery.currency1 as string)
      : undefined,
  );

  return (
    <>
      {openSettingsModal && (
        <SettingsModal
          open={openSettingsModal}
          onClose={() => setOpenSettingsModal(false)}
        />
      )}
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='body1' style={{ fontWeight: 600 }}>
          {t('supplyLiquidity')}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Box className={classes.headingItem}>
            <QuestionHelper
              size={24}
              color={palette.text.secondary}
              text={t('supplyLiquidityHelp')}
            />
          </Box>
          <Box className={classes.headingItem}>
            <SettingsIcon onClick={() => setOpenSettingsModal(true)} />
          </Box>
        </Box>
      </Box>
      <Box mt={2.5}>
        <AddLiquidity
          currency0={qCurrency0 ?? undefined}
          currency1={qCurrency1 ?? undefined}
        />
      </Box>
    </>
  );
};

export default SupplyLiquidity;
