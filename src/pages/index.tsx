import { BigNumber, constants } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import { ARBISCAN_KEY } from '../config';
import { useCoingeckoPrice } from '../hooks/useCoingecko';
import { Tx } from '../model';
import { abbreviatePrice, formatPrice } from '../utils';

const Home: NextPage = () => {
  const { data: accountData } = useAccount();
  const [txs, setTxs] = useState<Tx[]>([]);
  const ethPrice = useCoingeckoPrice('ethereum', 'usd') ?? '0';

  useEffect(() => {
    if (accountData?.address) {
      fetch(
        `https://api.arbiscan.io/api?module=account&action=txlist&address=${accountData.address}&startblock=1&endblock=99999999&sort=asc&apikey=${ARBISCAN_KEY}`
      ).then((res) => res.json().then(({ result }) => setTxs(result)));
    }
  }, [accountData?.address]);

  const totals = useMemo(() => {
    return txs.reduce(
      (acc, tx: Tx) => ({
        failed: tx.isError === '1' ? acc.failed + 1 : acc.failed,
        failedGas: tx.isError === '1' ? acc.failedGas.add(BigNumber.from(tx.gasUsed).mul(tx.gasPrice)) : acc.failedGas,
        totalGas: acc.totalGas.add(tx.gasUsed),
        totalEth: acc.totalEth.add(BigNumber.from(tx.gasUsed).mul(tx.gasPrice)),
        totalPrice: acc.totalPrice.add(BigNumber.from(tx.gasPrice)),
      }),
      {
        failed: 0,
        failedGas: BigNumber.from(constants.Zero),
        totalGas: BigNumber.from(constants.Zero),
        totalEth: BigNumber.from(constants.Zero),
        totalPrice: BigNumber.from(constants.Zero),
      }
    );
  }, [txs]);

  return (
    <div className="max-w-[1200px] px-[5vw] my-[15vh]  mx-auto text-center text-4xl font-medium text-ellipsis leading-[3rem]">
      <p>
        {`You've spent `}
        <span className="highlight">
          {totals.totalEth.gt(constants.Zero) ? `Ξ${formatEther(totals.totalEth).substring(0, 7)}` : 'Ξ0'}
        </span>
        {` on gas. Right now, that's`}{' '}
        <span className="highlight">
          {totals.totalEth.gt(constants.Zero)
            ? `$${Number(formatPrice(totals.totalEth.mul(Math.round(+ethPrice * 100)).div(100))).toFixed(2)}`
            : '$0'}
        </span>
        .
      </p>
      <br />
      <p>
        You used <span className="highlight">{abbreviatePrice(totals.totalGas.toString())} </span>
        gas to send
        <span className="highlight"> {txs.length} </span>
        transactions, with an average price of
        <span className="highlight">
          {' '}
          {totals.totalPrice.gt(constants.Zero)
            ? `${Number(totals.totalPrice.div(txs.length).div('1000000')) / 1000}`
            : '0'}{' '}
        </span>{' '}
        Gwei.
      </p>
      <br />
      <p>
        <span className="highlight">{totals?.failed} </span>
        of them failed, costing you{' '}
        <span className="highlight">
          {' '}
          {totals.failedGas.gt(constants.Zero) ? `Ξ${Number(formatEther(totals.failedGas)).toFixed(5)}` : 'Ξ0'}
        </span>
        .
      </p>
    </div>
  );
};

export default Home;
