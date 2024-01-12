import "./App.css";
import Hero from "./components/hero";
import Main from "./components/main";
import Footer from "./components/footer";
import Modal from "./components/modal";
import { useGlobalContext } from "./modalContext";


export default function App() {

  const { showModal } = useGlobalContext();
  console.log("Version 1.16");
  
  return (
    <main>
      <Hero />
      <Main />
      <Footer />
      {showModal && <Modal />}
    </main>
  );
}