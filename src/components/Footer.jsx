import { Link } from "@/components/BaseKit";
import T from "./Lang";

function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="underline"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className={`bg-gray-800 text-white pt-10`}>
      <div className="flex flex-wrap justify-around">
        <div>
          <h4 className="text-2xl mb-4">Docs</h4>
          <div className="flex flex-col gap-2">
            <FooterLink href="/getting-started">
              <T>
                <>Getting Started</>
                <>使ってみる</>
              </T>
            </FooterLink>
            <FooterLink href="/examples">
              <T>
                <>Examples</>
                <>使い方の例</>
              </T>
            </FooterLink>
            <FooterLink href="/reference/base/init">
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </FooterLink>
            <FooterLink href="https://e3web-play.web.app">
              <T>
                <>Try Online</>
                <>Webで試す</>
              </T>
            </FooterLink>
            <FooterLink href="/classroom">
              <T>
                <>Educational Use Cases</>
                <>教育機関向け活用例</>
              </T>
            </FooterLink>
            <FooterLink href="/tool">
              <T>
                <>Tools</>
                <>ツール</>
              </T>
            </FooterLink>
            <FooterLink href="/llms.txt">
              llms.txt
            </FooterLink>
            <FooterLink href="/ai">
              <T>
                <>AI</>
                <>AIでの利用</>
              </T>
            </FooterLink>
          </div>
        </div>
        <div>
          <h4 className="text-2xl mb-4">More</h4>
          <div className="flex flex-col gap-2">
            <FooterLink href="https://github.com/masabando/easy-three">
              GitHub
            </FooterLink>
            <FooterLink href="https://alice.helixcode.net/~bando/Lab/">
              <T>
                <>Quant. Inf. Lab.</>
                <>量子情報研究室</>
              </T>
            </FooterLink>
          </div>
        </div>
      </div>
      <div className="text-center my-12">Copyright © 2026 masabando</div>
    </footer>
  );
}
