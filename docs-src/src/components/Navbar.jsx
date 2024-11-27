import RBNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import T, { LangSwitcher } from './Lang';

export default function Navbar() {
  return (
    <RBNavbar
      expand="lg"
      data-bs-theme="dark"
      className="bg-body-tertiary sticky-top"
    >
      <Container fluid>
        <RBNavbar.Brand as={Link} to="/">
          easy-three
        </RBNavbar.Brand>
        <Nav>
          <Nav.Link
            className="py-0"
            href="https://github.com/masabando/easy-three"
          >
            <BsGithub style={{ fontSize: "180%" }} />
          </Nav.Link>
        </Nav>
        <div>
          <LangSwitcher />
          <RBNavbar.Toggle className="ms-3" aria-controls="basic-navbar-nav" />
        </div>
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/getting-started">
              <T>
                <>Getting Started</>
                <>使ってみる</>
              </T>
            </Nav.Link>
            <Nav.Link as={Link} to="/examples">
              <T>
                <>Examples</>
                <>使い方の例</>
              </T>
            </Nav.Link>
            <Nav.Link as={Link} to="/reference">
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}
