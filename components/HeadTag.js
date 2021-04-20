import Head from "next/head";

const HeadTag = ({ page }) => {
  return (
    <Head>
      <meta name="author" content="Panda Chat" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Panda Chat - Don't be racist, be like Panda"
      />
      <meta
        name="keywords"
        content="chat, panda, pandachat, masfik, fun, message, nextjs, webarebears"
      />
      <meta itemprop="name" content="Panda Chat" />
      <meta
        itemprop="description"
        content="Panda Chat - Don't be racist, be like Panda"
      />
      <meta itemprop="image" content="https://i.ibb.co/WcwcVdk/featured.png" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Panda Chat" />
      <meta property="og:url" content="https://panda-chat.vercel.app/" />
      <meta
        property="og:description"
        content="Panda Chat - Don't be racist, be like Panda"
      />
      <meta
        property="og:image"
        content="https://i.ibb.co/WcwcVdk/featured.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Panda Chat" />
      <meta
        name="twitter:description"
        content="Panda Chat - Don't be racist, be like Panda"
      />
      <meta
        name="twitter:image"
        content="https://i.ibb.co/WcwcVdk/featured.png"
      />

      <title>Panda Chat - {page}</title>
      <link rel="icon" href="/logo.ico" />
    </Head>
  );
};

export default HeadTag;
