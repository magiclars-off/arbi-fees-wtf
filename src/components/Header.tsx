import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArbiscanIcon } from './Icons';

const Header = () => {
  return (
    <div className="flex w-screen justify-between px-5 sm:px-10 items-center gap-2 h-[70px] md:h-[90px] z-10 sticky top-0 bg-white dark:bg-dark">
      <div className="flex gap-4 items-center">
        <ArbiscanIcon height={40} width={40} />
        <h1 className="font-black text-3xl">WTF</h1>
      </div>
      <ConnectButton showBalance={false} />
    </div>
  );
};

export default Header;
