import { useSelector, useDispatch } from "react-redux";
import { doLogin, doRegister } from "../../redux/reducers/authSlice";

export default function Landing() {
  const dispatch = useDispatch();

  return (
    <>
      <div className="containe max-h-full">
        <div className="flex">
          <div className="flex-column">
            <div className="h-40 w-40 shadow-xl">
              <h1>hello</h1>
              <button
                type="button"
                onClick={() => dispatch(doLogin())}
                className="text-blue-700 hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-0 lg:mr-2"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => dispatch(doRegister())}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-0 lg:mr-0 hidden lg:block"
              >
                Get started
              </button>
            </div>
          </div>
          <div className="flex-column"></div>
          <div className="flex-column"></div>
        </div>
      </div>
    </>
  );
}
