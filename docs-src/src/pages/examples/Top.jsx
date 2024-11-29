import Container from "react-bootstrap/Container";
import styles from "./Examples.module.scss";
import { Flex } from "antd";

function ExampleLink({ name, dir }) {
  return (
    <a
      className={styles.exampleLink}
      href={`/easy-three/page/examples/${dir}/index.html`}
    >
      <img src={`/easy-three/page/examples/${dir}.png`} alt="Dice" />
      <div>{name}</div>
    </a>
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
          name={
            <>
              Dice
              <br />
              (KUTC-KaedeYuto)
            </>
          }
        />
      </Flex>
    </Container>
  );
}
