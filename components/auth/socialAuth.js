import GithubAuth from "./githubAuth";
import GoogleAuth from "./googleAuth";

export default function SocialAuth(props) {
  return (
    <div className="flex space-x-4 my-4">
      <GoogleAuth type={props.type} />
      <GithubAuth type={props.type} />
    </div>
  );
}
