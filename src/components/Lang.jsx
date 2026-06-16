"use client";
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
    // <label className="swap">
    //   <input type="checkbox"
    //     defaultChecked={config.lang === "en"}
    //     onChange={(e) => {
    //       setConfig({
    //         ...config,
    //         lang: e.target.checked ? "en" : "ja",
    //       });
    //     }}
    //   />
    //   <div className="swap-on">Eng</div>
    //   <div className="swap-off">日本語</div>
    // </label>
    <div role="tablist" className="tabs tabs-box tabs-sm bg-base-300">
      <a
        role="tab"
        className={`tab ${config.lang === "en" ? "tab-active" : ""}`}
        onClick={() => {
          setConfig({
            ...config,
            lang: "en",
          });
        }}
      >
        Eng
      </a>
      <a
        role="tab"
        className={`tab ${config.lang === "ja" ? "tab-active" : ""}`}
        onClick={() => {
          setConfig({
            ...config,
            lang: "ja",
          });
        }}
      >
        日本語
      </a>
    </div>
  );
}

export default function T({ children }) {
  const { config } = useContext(UserContext);
  return (
    <>{config.lang === "en" ? children[0] : (children[1] ?? children[0])}</>
  );
}
