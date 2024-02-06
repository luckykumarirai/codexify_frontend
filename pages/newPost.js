import Editor from "../components/richEditor/editor";
import Title from "../components/layout/title";

export default function NewPost() {
  return (
    <div className="p-8 w-full flex justify-center">
      <Title title="Write NewPost" description="Codex-write the new post" />
      <Editor />
    </div>
  );
}
