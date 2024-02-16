import { useAccount, useChains, useSymbolsInfo } from '@orderly.network/hooks';
import React from 'react';

export const SDKPage = () => {
  const { state } = useAccount();
  const [chains] = useChains();
  console.log('state', state, chains);
  return (
    <div>
      SDK Demo Page
      <div>
        <pre>{JSON.stringify(chains, null, 2)}</pre>
      </div>
    </div>
  );
};
