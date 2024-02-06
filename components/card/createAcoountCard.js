import { doLogin, doRegister } from "../../redux/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

const CreateAccountCard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="bg-white w-11/12 mr-auto ml-auto rounded-md border p-4">
        <p className="text-xl font-semibold font-sans lh-tight mb-4">
          Codex: Where brilliance meets content excellence.
        </p>
        <p className="text-slate-600 mb-4 font-sans lh-tight">
          Your words have the power to shape, innovate, and redefine the
          developer narrative
        </p>
        <button
          type="button"
          onClick={() => dispatch(doRegister())}
          className="w-full text-blue-900 hover:text-white font-medium hover:bg-blue-600 rounded-lg px-3 py-2 text-center mr-0 lg:mr-0 mb-2 lg:block border border-blue-800 border-x-1 border-y-1"
        >
          Get started
        </button>
        <button
          type="button"
          onClick={() => dispatch(doLogin())}
          className="w-full font-medium hover:bg-purple-100 hover:text-blue-800 rounded-lg px-3 py-2 text-center"
        >
          Log in
        </button>
      </div>
    </>
  );
};
export default CreateAccountCard;
