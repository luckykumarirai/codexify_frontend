import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
