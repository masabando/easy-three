import { ConfigProvider, Segmented } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

const initialConfig = {
  lang: "en",
  setLang: () => {},
};

// eslint-disable-next-line
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [config, setConfig] = useState(initialConfig);
  return (
    <UserContext.Provider
      value={{
        config,
        setConfig,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function LangSwitcher() {
  const { config, setConfig } = useContext(UserContext);
  useEffect(() => {
    const storedConfig = localStorage.getItem("config");
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: "#1890ff",
          },
        },
      }}
    >
      <Segmented
        className="mx-1"
        size="small"
        options={[
          { label: "Eng", value: "en" },
          { label: "日本語", value: "ja" },
        ]}
        value={config.lang}
        onChange={(value) => setConfig({ ...config, lang: value })}
      />
    </ConfigProvider>
  );
}

export default function T({ children }) {
  const { config } = useContext(UserContext);
  return <>{config.lang === "en" ? children[0] : children[1] ?? children[0]}</>;
}
