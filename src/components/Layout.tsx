import '@rainbow-me/rainbowkit/styles.css';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
