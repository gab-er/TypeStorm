import TypeBox from "./components/TypeBox/TypeBox";
import TypingTip from "./components/TypingTip/TypingTip";
import { ToastContainer, Bounce } from "react-toastify";

export const metadata = {
  title: "TypeStorm",
  description: "Improve your typing skills with our website!",
};

export default async function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute flex mt-5 translate-x-[-55px] justify-center w-full">
          <TypingTip isCycling={true} />
        </div>
      </div>
      <div className="mt-36 flex justify-center">
        <TypeBox />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
        toastStyle={{ backgroundColor: "#161821" }}
      />
    </>
  );
}
