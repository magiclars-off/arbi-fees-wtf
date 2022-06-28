import { useState, useEffect } from 'react';
import { useBlockNumber } from 'wagmi';

export const useCoingeckoPrice = (base: string, quote = 'usd'): string | undefined => {
  const [price, setPrice] = useState<string | undefined>(undefined);
  const blockNo = useBlockNumber();

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoPrice(base, quote);
      setPrice(tokenPrice);
    }

    getPrice();
  }, [base, quote, blockNo]);

  return price;
};

const getCoingeckoSimplePriceUri = (baseId: string, quoteId: string) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${baseId}&vs_currencies=${quoteId}`;

const fetchCoingeckoPrice = (fetchFunction: any) => async (base: string, quote: string) => {
  try {
    const baseId = base.toLowerCase();
    const quoteId = quote.toLowerCase();
    const url = getCoingeckoSimplePriceUri(baseId, quoteId);
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'public, s-maxage=300',
        'Content-Type': 'application/json',
      },
    });
    const result = await data.json();
    const price = result[baseId][quoteId];
    return price ? price + '' : undefined;
  } catch (_) {
    return undefined;
  }
};

const getCoingeckoPrice = fetchCoingeckoPrice(typeof window !== 'undefined' && window.fetch);
