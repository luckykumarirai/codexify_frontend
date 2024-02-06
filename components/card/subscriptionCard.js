import Image from "next/image";
import { doLogin, doRegister } from "../../redux/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

const SubscriptionCard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white w-11/12 mr-auto ml-auto rounded-md border p-4">
        <p className="text-medium font-semibold font-sans lh-tight mb-4 text-center">
          Codex: Subscribe & unlock a world of knowledge and inspiration!
        </p>
        <div className="flex justify-center">
          <Image src="/subscribe.png" width="100" height="100" alt="Logo" />
        </div>
        <button
          type="button"
          onClick={() => dispatch(doRegister())}
          className="w-full text-blue-900 hover:text-white font-medium hover:bg-blue-600 rounded-lg px-3 py-2 text-center mb-3 lg:block border border-blue-800 border-x-1 border-y-1"
        >
          Subscribe
        </button>
      </div>
    </>
  );
};
export default SubscriptionCard;
