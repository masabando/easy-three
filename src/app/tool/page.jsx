import { Link } from "@/components/BaseKit";
import T from "@/components/Lang";
import H1 from "@/components/H1";

export default function Page() {
  return (
    <div>
      <H1>
        <T>
          <>Tools</>
          <>ツール</>
        </T>
      </H1>

      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="list-row">
          <Link
            href="/tool/model-controller"
            className="list-col-grow">
            モデルコントローラ
          </Link>
        </li>
      </ul>

    </div>
  );
}
