import Container from "react-bootstrap/Container";
import styles from "./Examples.module.scss";
import { Flex } from "antd";

function ExampleLink({ name, dir, creator }) {
  return (
    <div className={styles.exampleLink}>
      <a href={`/easy-three/page/examples/${dir}/index.html`}>
        <img src={`/easy-three/page/examples/${dir}.png`} alt="Dice" />
      </a>
      <div className="bg-dark">
        <div>{name}</div>
        {creator && <div>by {creator}</div>}
        <a
          href={`https://github.com/masabando/easy-three/blob/dev/docs/page/examples/${dir}/index.html`}
        >
          View Code
        </a>
      </div>
    </div>
  );
}

export default function Examples() {
  return (
    <Container className="pt-4 pb-5">
      <title>Examples | easy-three</title>
      <h1>Examples</h1>

      <Flex justify="start" wrap gap={20} className="mt-5">
        <ExampleLink
          dir="dice"
          name="Dice"
          creator="KUTC-KaedeYuto"
        />
      </Flex>
    </Container>
  );
}
