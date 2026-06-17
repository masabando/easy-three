import { Link, Note } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";

export const metadata = {
  title: "教育機関向け活用例",
  description: "easy-threeは、3Dグラフィックスの基本を簡単に学ぶためのツールです。特別な知識がなくても、数行のコードで立方体や球体を表示したり、照明効果を使ったリアルな表現ができます。",
};

function List({ children }) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-w-[300px]">
      {children}
    </ul>
  )
}

function ListItem({ href="", children }) {
  return (
    <li className="list-row">
      <Link className="list-col-grow" href={href}>{children}</Link>
    </li>
  )
}

export default function Page() {
  return (
    <div>
      <H1>教育機関向け活用例</H1>
      <p>
        easy-threeは、
        <Note>3Dグラフィックスの基本を簡単に学ぶためのツール</Note>です。
      </p>

      <p className="mt-4">
        特別な知識がなくても、数行のコードで立方体や球体を表示したり、照明効果を使ったリアルな表現ができます。
      </p>
      <p className="mt-4">
        <Note>
          中学や高校の授業で、プログラミングや3Dデザインを取り入れたいと考えている先生方に最適
        </Note>
        です。
        <br />
        学生たちが楽しみながら学べるよう設計されており、創造力を引き出す手助けをします。
      </p>

      <H2 className="mt-10">授業での準備と活用例</H2>

      <p className="mt-4">
        教員が事前に準備する内容は、非常にシンプルです。例えば、事前に用意したコードを学生に配布し、
        その内容をもとに改変や拡張を行うことで、プログラミングの基礎と創造力を同時に育むことができます。
      </p>

      <p className="mt-4">
        <Note>
          例として、以下のような活動を授業に取り入れることができます。
        </Note>
      </p>

      <ul className="list-disc list-inside ml-4">
        <li>簡単な3Dモデル（立方体や球体）の描画と配置</li>
        <li>照明や影を利用したリアルな表現の演習</li>
        <li>色や形を変化させるインタラクティブなプログラムの作成</li>
        <li>複数のオブジェクトを組み合わせたシーンのデザイン</li>
      </ul>

      <p className="mt-4">
        <Note>
          これらの活動を通じて、学生はプログラミングスキルだけでなく、論理的思考力やデザイン感覚を養うことができます。
        </Note>
        また、教員は必要に応じて簡単にスクリプトをカスタマイズできるため、授業の進行に合わせた柔軟な対応が可能です。
      </p>

      <H2 className="mt-10">具体例</H2>
      <p className="mt-4">ここでは、具体的な活用例を紹介します。</p>
      <H3 className="mt-5">授業の前に</H3>
      <List>
        <ListItem href="/classroom/prepare">
          環境を整える
        </ListItem>
      </List>

      <H3 className="mt-10">学習内容 (基礎編)</H3>
      <List>
        <ListItem href="/classroom/basics/part1">
          1. プログラムの基礎と立方体の表示
        </ListItem>
        <ListItem href="/classroom/basics/part2">
          2. カメラコントロールとガイド
        </ListItem>
        <ListItem href="/classroom/basics/part3">
          3. 球体・平面・角丸立方体などの表示
        </ListItem>
        <ListItem href="/classroom/basics/part4">
          4. 背景とアニメーションの基礎
        </ListItem>
        <ListItem href="/classroom/basics/part5">
          5. 様々なマテリアル
        </ListItem>
        <ListItem href="/classroom/basics/part6">
          6. アニメーションと物理
        </ListItem>
        <ListItem href="/classroom/basics/part7">
          7. 3Dオブジェクトのグループ化
        </ListItem>
      </List>

      <H3 className="mt-10">学習内容 (応用編)</H3>
      <List>
        <ListItem href="/classroom/advanced/part1">
          1. 背景画像の利用と環境マップ
        </ListItem>
        <ListItem href="/classroom/advanced/part2">
          2. テクスチャの利用
        </ListItem>
        <ListItem href="/classroom/advanced/part3">
          3. GLTFモデルの利用
        </ListItem>
        <ListItem href="/classroom/advanced/part4">
          4. VRMモデルを用いたアバターの表示
        </ListItem>
        <ListItem href="/classroom/advanced/part5">
          5. VRMモデルの操作とアニメーション
        </ListItem>
        <ListItem href="/classroom/advanced/part6">
          6. 面の変形
        </ListItem>
        <ListItem href="/classroom/">
          7. イベントの利用 <span className="badge badge-sm badge-secondary ml-4">準備中</span>
        </ListItem>
      </List>
    </div>
  );
}