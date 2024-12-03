import Container from 'react-bootstrap/Container';

export default function Layout({ children }) {
  return (
    <Container className="pt-4 pb-5">
      <h1>教育機関向け活用例</h1>
      {children}
    </Container>
  );
}
