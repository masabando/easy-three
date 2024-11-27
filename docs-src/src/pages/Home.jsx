import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import T from "../components/Lang";

export default function Home() {
  return (
    <>
      <div className="bg-body-tertiary">
        <Container className="py-3">
          <title>Home | easy-three</title>
          <h1 className="headTitle mt-5 mb-4">easy-three</h1>
          <div className="headMessage">
            <T>
              <>
                <span>Turn your first line of code into a</span>
                <span className="impacted">3D</span>
                <span>masterpiece.</span>
              </>
              <>
                <span>最初の1行から、</span>
                <span className="impacted">3D</span>
                <span>の傑作を。</span>
              </>
            </T>
          </div>

          <div className="text-center my-5">
            <Button variant="primary" size="lg" as={Link} to="/getting-started">
              <T>
                <>Get Started</>
                <>使ってみる</>
              </T>
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="ms-3"
              as={Link}
              to="/reference"
            >
              <T>
                <>Reference</>
                <>ドキュメント</>
              </T>
            </Button>
          </div>
        </Container>
      </div>
      <div>
        <Container className="py-5"></Container>
      </div>
    </>
  );
}
