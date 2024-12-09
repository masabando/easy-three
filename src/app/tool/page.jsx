"use client"
import { Link } from "@/components/BaseKit";
import T from "@/components/Lang";
import ListGroup from "react-bootstrap/ListGroup";

export default function Page() {
  return (
    <div className="mt-5">
      <title>ツール | easy-three</title>
      <h1>
        <T>
          <>Tools</>
          <>ツール</>
        </T>
      </h1>

      <ListGroup>
        <ListGroup.Item action as={Link} href="/tool/model-controller">
          モデルコントローラ
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
