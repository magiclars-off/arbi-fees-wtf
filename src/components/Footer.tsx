import { memo } from 'react';
import { BsTwitter } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 text-xs md:text-base w-full">
      <div className="flex justify-between items-center w-full px-[10vw] py-4 bg-[rgb(38,38,58)] text-white">
        <p>@ earthcore</p>

        <ul className="flex gap-4">
          <li>
            <a role="button" target="_blank" href="https://twitter.com/magiclars/" rel="noopener noreferrer">
              <span className="flex text-sm gap-2 items-center">
                dev
                <BsTwitter />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default memo(Footer);
