import Head from "next/head";
import Title from "../components/layout/title";
import authMiddleware from "../middleware/authMiddleware";

function About() {
  console.log("lucky");
  return (
    <>
      <Title title="About" description="Codex-about Page" />
      <h1> about page</h1>
    </>
  );
}

export default About;