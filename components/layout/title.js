import Head from "next/head";

export default function Title({
  title = "Codex",
  description = "Codex-Read & Learn",
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="canonical"
          href="https://codex-frontend-snowy.vercel.app/"
          key="canonical"
        />
        <meta name={title} content={description} />
        <meta name="description" content={description} />
        <meta property="og:title" content="Codex-Read & Learn" />
        <meta
          property="og:description"
          content="Codex plateform | write blog here! | Read & Learn"
        />
        <meta property="og:image" content="../logo.png" />
      </Head>
    </>
  );
}
