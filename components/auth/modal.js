import Login from "./login";
import Register from "./register";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/reducers/authSlice";

export default function AuthModal() {
  const dispatch = useDispatch();
  const authVar = useSelector((state) => state.auth.authVar);

  return (
    <>
      <div className="fixed w-full p-4 lg:inset-0 h-full flex items-center justify-center backdrop-opacity-20 backdrop-invert z-10">
        <div className="relative w-full h-full max-w-md lg:h-auto">
          <div className=" bg-white rounded-lg shadow self-center">
            <button
              onClick={() => dispatch(closeModal())}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            {authVar == 1 ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </>
  );
}
