"use client";
import Container from "react-bootstrap/Container";
import { Flex } from "antd";
import Nav from "react-bootstrap/Nav";
import { Link } from "@/components/BaseKit";
import styles from "./Footer.module.scss";
import T from "./Lang";
import { Anchor } from "react-bootstrap";

function FooterLink({ to, children }) {
  return (
    <Nav.Link
      as={Link}
      href={to}
      className="text-decoration-underline text-light"
    >
      {children}
    </Nav.Link>
  );
}

function FooterLinkA({ href, children }) {
  return (
    <Nav.Link as={Anchor} href={href} className="text-decoration-underline text-light">
      {children}
    </Nav.Link>
  );
}

export default function Footer() {
  return (
    <footer className={`${styles.footer} text-light pt-5`}>
      <Container>
        <Flex justify="space-between">
          <div className="w-100">
            <h4>Docs</h4>
            <Nav className="flex-column">
              <FooterLink to="/getting-started">
                <T>
                  <>Getting Started</>
                  <>使ってみる</>
                </T>
              </FooterLink>
              <FooterLink to="/examples">
                <T>
                  <>Examples</>
                  <>使い方の例</>
                </T>
              </FooterLink>
              <FooterLink to="/reference">
                <T>
                  <>Reference</>
                  <>ドキュメント</>
                </T>
              </FooterLink>
              <FooterLink to="/classroom">
                <T>
                  <>Educational Use Cases</>
                  <>教育機関向け活用例</>
                </T>
              </FooterLink>
              <FooterLink to="/tool">
                <T>
                  <>Tools</>
                  <>ツール</>
                </T>
              </FooterLink>
            </Nav>
          </div>
          <div className="w-100">
            <h4>More</h4>
            <Nav className="flex-column">
              <FooterLinkA href="https://github.com/masabando/easy-three">
                GitHub
              </FooterLinkA>
              <FooterLinkA href="https://alice.helixcode.net/~bando/Lab/">
                <T>
                  <>Quant. Inf. Lab.</>
                  <>量子情報研究室</>
                </T>
              </FooterLinkA>
            </Nav>
          </div>
        </Flex>
        <div className="text-center my-5">Copyright © 2024 masabando</div>
      </Container>
    </footer>
  );
}
