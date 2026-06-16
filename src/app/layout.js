import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/components/Lang";
import Footer from "@/components/Footer";
import { Noto_Sans_JP } from "next/font/google";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: {
    default: "easy-three",
    template: "%s | easy-three",
  },
  description:
    "Three.jsを初心者向けにシンプルに使えるJavaScriptライブラリです。",
  openGraph: {
    title: "easy-three",
    description:
      "Three.jsを初心者向けにシンプルに使えるJavaScriptライブラリです。",
    url: "https://masabando.github.io/easy-three/",
    siteName: "easy-three",
    images: [
      {
        url: "https://masabando.github.io/easy-three/easy-three.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "easy-three",
    description:
      "Three.jsを初心者向けにシンプルに使えるJavaScriptライブラリです。",
    images: ["https://masabando.github.io/easy-three/easy-three.png"],
  },
};

export const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--noto",
});

export default function RootLayout({ children }) {

  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        {/* <link rel="icon" type="image/svg+xml" href="/vite.svg" /> */}
        <meta name="description" content="シンプルなコードで、魅力的な3Dを。" />
        <meta name="keywords" content="three.js, 3D, JavaScript, 簡単, React, VRM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta property="og:type" content="website" />
        <meta property="og:title" content="easy-three" />
        <meta property="og:site_name" content="easy-three" /> */}
        {/* <meta
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
        <title>easy-three</title> */}
        <meta name="google-site-verification" content="iQGhuU5kkC7bB-ZirajQdV8C5IaySFzn12_FnAAAjyM" />
      </head>

      <body className={noto.className}>
        <UserProvider>
          <Navbar />
          <div className="drawer md:drawer-open">
            <input id="menuSidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen max-w-full">
              <div className="grow max-w-full">{children}</div>
              <Footer />
            </div>
            <div className="drawer-side z-50">
              <label htmlFor="menuSidebar" aria-label="close sidebar" className="drawer-overlay"></label>
              <Sidebar />
            </div>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
