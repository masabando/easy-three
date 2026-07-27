import CodeBlock from "@/components/CodeBlock";
import ReferenceContent from "@/components/ReferenceContent";
import { Note, Link } from "@/components/BaseKit";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import H3 from "@/components/H3";
import { Ex1, Ex2 } from "./Codes";

export const metadata = {
  title: "create.audio",
};


export default function Page() {
  return (
    <div>
      <H1>create.audio</H1>

      <ReferenceContent
        name="create.audio"
        args="audioFileURL, props : Object"
        returnObject="{ Audio, AudioAnalyser }"
        argsInfo={
          <>
            <div>
              <span>audioFileURL</span> - サウンドファイルのURL。
            </div>
            <div>
              <span>props</span> - 設定オブジェクト。
              <ul className="list-disc list-inside ml-4">
                <li>loop (Boolean) : ループ再生設定 (デフォルト : true)。</li>
                <li>volume (Number) : 音量 (デフォルト : 0.5)。</li>
                <li>
                  target (Object) : サウンドを再生する対象のオブジェクト
                  (デフォルト : camera)。
                </li>
                <li>
                  fftSize (Number) : AudioAnalyser の fftSize (デフォルト :
                  128)。
                </li>
                <li>
                  onLoad (Function) :
                  サウンドのロード完了時に呼ばれるコールバック関数。
                </li>
                <li>
                  onError (Function) :
                  サウンドのロードエラー時に呼ばれるコールバック関数。
                </li>
                <li>
                  onProgress (Function) :
                  サウンドのロード進捗時に呼ばれるコールバック関数。
                </li>
              </ul>
            </div>
          </>
        }
      >
        <p>サウンドを再生するためのオーディオオブジェクトを作成します。</p>
      </ReferenceContent>

      <div className="mt-5 alert alert-info alert-soft">
        <p>
          サウンドを再生するには、ユーザーの操作が必要です。
          <br />
          そのため、サウンドのロード完了時に自動で再生することはできません。
          <br />
          サウンドを再生するには、ユーザーの操作 (クリックやタップなど)
          をトリガーとして、<code>Audio.play()</code>{" "}
          メソッドを呼び出す必要があります。
        </p>
      </div>

      <p className="mt-5">
        React で利用する際は、useEffect の戻り値で Audio
        オブジェクトを破棄するようにしてください。
        <br />
        そのために <code>audio.destroy()</code> が用意されています。
      </p>

      <H2 className="mt-14">コードの例</H2>
      <H3>サウンドを再生する</H3>
      <p className="mt-4">
        以下のコードは、サウンドを再生するための基本的な例です。
        <br />
        サウンドのロード完了時に、ユーザーの操作 (クリックやタップなど)
        をトリガーとして、<code>Audio.play()</code>{" "}
        メソッドを呼び出すことで、サウンドを再生することができます。
      </p>
      <Ex1
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, animate } = init()
camera.position.set(0, 0, 3);

create.ambientLight();
create.directionalLight();
create.sky()
const box = create.box();

// free sound (Neon Eternity) by mxNeko
const { audio } = create.audio("/easy-three/sound/neon_eternity.mp3")

animate(({ delta }) => {
  if (audio.isPlaying) {
    box.rotation.x += delta;
    box.rotation.y += delta;
  }
});

document.querySelector(".playButton").addEventListener("click", () => {
  if (audio.isPlaying) {
    audio.stop()
  } else {
    audio.play()
  }
})`}
      </CodeBlock>

      <H3 className="mt-14">周波数データを使う</H3>
      <p className="mt-4">
        analyser.getFrequencyData()
        メソッドを使うことで、サウンドの周波数データを取得することができます。
        <br />
        取得した周波数データを使って、オブジェクトのスケールや色を変化させることができます。
      </p>
      <p className="mt-4">
        以下のコードは、サウンドの周波数データを使って、複数の立方体のスケールと色を変化させる例です。
      </p>
      <Ex2
        className="border mt-4"
        style={{
          width: "240px",
          height: "240px",
        }}
      />
      <CodeBlock>
        {`const { camera, create, controls, animate } = init()
camera.position.set(0, 0, 3);
controls.connect();

create.ambientLight();
create.directionalLight();
create.sky()

const fftSize = 128;
// free sound (Neon Eternity) by mxNeko
const { audio, analyser } = create.audio("/easy-three/sound/neon_eternity.mp3", {
  fftSize: fftSize,
});

const cubeSize = 0.05;
const soundCubes = create.instances(
  create.cube({ size: cubeSize }),
  fftSize / 2,
  {
    position: [-(cubeSize*1.4) * fftSize / 4, 0, 0],
    offset: [(cubeSize*1.4), 0, 0]
  }
)

animate(({ delta }) => {
  if (audio.isPlaying) {
    for (let i = 0; i < soundCubes.count; i++) {
      const cube = soundCubes.at(i);
      const scale = analyser.getFrequencyData()[i] / 10;
      cube.scale.set(1, Math.max(scale, 0.01), 1);
      const position = cube.position.get();
      cube.position.set(
        position.x,
        cubeSize * scale / 2 - cubeSize / 2,
        position.z
      );
    }
  }
});

document.querySelector(".playButton").addEventListener("click", () => {
  if (audio.isPlaying) {
    audio.stop()
  } else {
    audio.play()
  }
})`}
      </CodeBlock>
    </div>
  );
}
