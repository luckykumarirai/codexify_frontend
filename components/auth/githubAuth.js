import { auth, githubProvider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import useAuth from "../../hooks/authHooks/useAuth";
import Image from "next/image";

export default function GithubAuth(props) {
  const { register, login } = useAuth();

  const handleGithubLogin = async () => {
    try {
      const response = await signInWithPopup(auth, githubProvider);
      if (response?.user) {
        if (props.type == "register") {
          const nameArray = response?.user?.displayName?.split(" ");
          const firstName = nameArray[0];
          const lastName = nameArray?.slice(1).join(" ");

          const randomNumber = Math.floor(1000 + Math.random() * 9000);

          register(
            firstName,
            lastName,
            firstName.toLowerCase() + randomNumber,
            response?.user?.email,
            "",
            ""
          );
        } else {
          login(response?.user?.email, "");
        }
      } else {
        alert("Somthing Went Wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleGithubLogin}
      className="flex btn space-x-2 items-center border border-gray-300 rounded-lg w-1/2 justify-center py-1"
    >
      <Image
        src="/socialMedia/github.png"
        alt="My Image"
        width={30}
        height={30}
      />
      <p className="">Github</p>
    </button>
  );
}
