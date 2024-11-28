import { ConfigProvider, Flex, Popover } from "antd";
import { BsCopy } from "react-icons/bs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import T from "./Lang";

export default function CodeBlock({
  language = "javascript",
  filename,
  children,
}) {
  return (
    <div className="my-3">
      {filename && (
        <Flex
          justify="space-between"
          className="bg-secondary text-white px-3 py-2 rounded-top"
          style={{
            fontSize: "90%",
          }}
        >
          {filename}
          <ConfigProvider
            theme={{
              components: {
                Popover: {
                  titleMinWidth: 10,
                },
              },
            }}
          >
            <Popover
              content={
                <div>
                  <T>
                    <>copied to clipboard!</>
                    <>クリップボードにコピーしました！</>
                  </T>
                </div>
              }
              title=""
              trigger="click"
            >
              <div>
                <BsCopy
                  className="ms-auto"
                  onClick={() => {
                    navigator.clipboard.writeText(children);
                  }}
                />
              </div>
            </Popover>
          </ConfigProvider>
        </Flex>
      )}
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        className="rounded-bottom p-3"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
