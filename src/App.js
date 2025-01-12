import Hero from "./components/hero";
import Main from "./components/main";
import Footer from "./components/footer";
import Modal from "./components/modal";
import { useGlobalContext } from "./modalContext";


export default function App() {

  const { showModal } = useGlobalContext();
  console.log("Version 1.8");
  
  return (
    <main className="bg-gray-100 font-poppins">
      <Hero />
      <Main />
      <Footer />
      {showModal && <Modal />}
    </main>
  );
}
