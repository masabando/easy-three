"use client";
import RBNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsGithub } from "react-icons/bs";
import { Link } from "@/components/BaseKit";
import T, { LangSwitcher } from "./Lang";
import { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

export default function Navbar() {
  const [show, setShow] = useState(false);
  function NavLink({ to, children }) {
    return (
      <Nav.Link
        className="my-1"
        as={Link}
        href={to}
        onClick={() => {
          setShow(false);
        }}
      >
        {children}
      </Nav.Link>
    );
  }
  return (
    <RBNavbar
      expand={false}
      data-bs-theme="dark"
      className="bg-body-tertiary sticky-top"
    >
      <Container fluid>
        <div className="d-flex align-items-center">
          <RBNavbar.Brand as={Link} href="/">
            easy-three
          </RBNavbar.Brand>
          <Nav className="d-none d-md-flex flex-row align-items-center column-gap-3">
            <Nav.Link
              as={Link}
              className="py-0"
              href="https://github.com/masabando/easy-three"
            >
              <BsGithub style={{ fontSize: "180%" }} />
            </Nav.Link>
            <NavLink to="/getting-started">
              <T>
                <>Getting Started</>
                <>使ってみる</>
              </T>
            </NavLink>
            <NavLink to="/examples">
              <T>
                <>Examples</>
                <>使い方の例</>
              </T>
            </NavLink>
            <NavLink to="/reference">
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </NavLink>
          </Nav>
        </div>
        <div className="d-flex flex-row align-items-center">
          <LangSwitcher />
          {/* <RBNavbar.Toggle
            className="ms-3 px-1 py-0"
            // aria-controls="basic-navbar-nav"
            onClick={() => setShow(true)}
          /> */}
          <div
            className="text-white d-flex align-items-center ms-3"
            onClick={() => setShow(true)}
            style={{
              fontSize: "200%",
            }}
          >
            <IoMenuOutline />
          </div>
        </div>
        <Offcanvas
          show={show}
          onHide={() => setShow(false)}
          placement="end"
          className="bg-dark text-light"
          style={{ maxWidth: "60%" }}
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <RBNavbar.Collapse id="basic-navbar-nav"> */}
            <Nav className="me-auto">
              <NavLink to="/">
                <T>
                  <>home</>
                  <>ホーム</>
                </T>
              </NavLink>
              <NavLink to="/getting-started">
                <T>
                  <>Getting Started</>
                  <>使ってみる</>
                </T>
              </NavLink>
              <NavLink to="/examples">
                <T>
                  <>Examples</>
                  <>使い方の例</>
                </T>
              </NavLink>
              <NavLink to="/reference">
                <T>
                  <>Reference</>
                  <>ドキュメント</>
                </T>
              </NavLink>
            </Nav>
            {/* </RBNavbar.Collapse> */}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </RBNavbar>
  );
}
