import Container from "@/components/Container";
import H1 from "@/components/H1";

export const metadata = {
  title: "Examples",
  description: "easy-threeのサンプルを紹介します。",
};

function ExampleLink({ name, dir, creator }) {
  return (
    <div className="w-40 shadow-lg bg-gray-800">
      <a
        href={`/easy-three/page/examples/${dir}/index.html`}
        className="block w-full h-40 overflow-hidden"
      >
        <img
          src={`/easy-three/page/examples/${dir}/display.jpg`}
          alt={name}
          className="object-cover"
        />
      </a>
      <div className="bg-gray-800 text-white p-2 text-sm">
        <div className="text-lg">{name}</div>
        {creator && <div>by {creator}</div>}
        <div className="mt-2">
          <a
            className="btn btn-primary btn-sm btn-soft"
            href={`https://github.com/masabando/easy-three/blob/dev/public/page/examples/${dir}/index.html`}
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Container>
      <H1>Examples</H1>

      <div className="flex justify-start flex-wrap gap-4 mt-5">
        <ExampleLink dir="signalgarden" name="Signal Garden" creator="Codex" />
        <ExampleLink dir="pulsefield" name="Pulsefield" creator="masabando" />
        <ExampleLink dir="dice" name="Dice" creator="KUTC-KaedeYuto" />
        <ExampleLink dir="events" name="Events" creator="KUTC-KaedeYuto" />
      </div>
    </Container>
  );
}
