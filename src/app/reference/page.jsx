"use client";
import Container from "react-bootstrap/Container";
import styles from "./Reference.module.scss";
import { Link } from "@/components/BaseKit";
import Accordion from "react-bootstrap/Accordion";


export default function Page() {
  return (
    <Container className="pt-4 pb-5">
      <title>Reference | easy-three</title>
      <h1>Reference</h1>

      <p className="mt-5">
        左のメニューから easy-three の機能を参照できます。<br />
        スマートフォンの場合は、右下のメニューボタンをタップしてください。
      </p>

      <h2>コンセプト</h2>
      <p>
        easy-three は、Three.js を簡単に利用できるラッパーライブラリです。
        <br />
        Three.js の基本的な機能を簡略化し、より直感的に利用できるようにしました。
      </p>
      <p>
        一方で、THREE オブジェクトを直接利用することで、Three.js の機能をそのまま利用することも可能です。
      </p>
    </Container>
  );
}
