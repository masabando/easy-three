import Container from "@/components/Container";
import H1 from "@/components/H1";

export const metadata = {
  title: "Examples",
  description: "easy-threeのサンプルを紹介します。",
};

function ExampleLink({ name, dir, creator }) {
  return (
    <div className="w-40 shadow-lg bg-gray-800 rounded-box overflow-hidden">
      <a
        href={`/easy-three/page/examples/${dir}/index.html`}
        className="block w-full h-40 overflow-hidden"
        style={{
          backgroundImage: `url(/easy-three/page/examples/${dir}/display.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></a>
      <div className="bg-gray-800 text-white p-2 text-sm">
        <div className="text-base">{name}</div>
        {creator && <div className="text-small">by {creator}</div>}
        <div className="mt-2">
          <a
            className="btn btn-primary btn-xs btn-soft"
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

      <div className="flex justify-around flex-wrap gap-4 mt-5">
        <ExampleLink dir="pulsefield" name="Pulsefield" creator="masabando" />
        <ExampleLink dir="nekoTower" name="Neko Tower" creator="masabando" />
        <ExampleLink dir="kinetictypography" name="Kinetic Typography" creator="Codex" />
        <ExampleLink dir="tinycity" name="Tiny City" creator="Codex" />
        <ExampleLink dir="floatinglanterns" name="Floating Lanterns" creator="Codex" />
        <ExampleLink dir="museumwall" name="Museum Wall" creator="Codex" />
        <ExampleLink dir="weathercubes" name="Weather Cubes" creator="Codex" />
        <ExampleLink dir="moonjelly" name="Moon Jelly" creator="Codex" />
        <ExampleLink dir="signalgarden" name="Signal Garden" creator="Codex" />
        <ExampleLink dir="dice" name="Dice" creator="KUTC-KaedeYuto" />
        <ExampleLink dir="events" name="Events" creator="KUTC-KaedeYuto" />
      </div>
    </Container>
  );
}
