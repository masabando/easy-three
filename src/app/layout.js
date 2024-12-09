"use client";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/components/Lang";
import Footer from "@/components/Footer";
import { Noto_Sans_JP } from "next/font/google";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="easy-three" />
        <meta property="og:site_name" content="easy-three" />
        <meta
          property="og:description"
          content="シンプルなコードで、魅力的な3Dを。"
        />
        <meta
          property="og:image"
          content="https://masabando.github.io/easy-three/easy-three.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://masabando.github.io/easy-three/easy-three.png"
        />
        <title>easy-three</title>
      </head>

      <body className={noto.className}>
        <AntdRegistry>
          <UserProvider>
            <div className="App mw-100">
              <Navbar />
              <div className="flex-grow-1 mw-100">{children}</div>
              <Footer />
            </div>
          </UserProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
