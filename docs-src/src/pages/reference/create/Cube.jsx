import Container from "react-bootstrap/Container";
import CodeBlock from "../../../components/CodeBlock";


export default function Reference_Create_Cube() {
  return (
    <Container className="pt-4 pb-5">
      <h1>create.cube</h1>

      <h2>コードの例</h2>
      <CodeBlock>
        {`create.cube()`}
      </CodeBlock>
    </Container>
  )
}