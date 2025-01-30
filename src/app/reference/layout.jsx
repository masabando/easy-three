"use client";
import ReferenceDrawer from './ReferenceDrawer';
import { Layout } from 'antd';
import { useState } from "react";
import Container from "react-bootstrap/Container";
import SideMenu from './SideMenu';

const { Content, Sider } = Layout;

export default function ReferenceLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        theme="light"
        defaultCollapsed={true}
        width={200}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{
          display: "none",
        }}
        style={{
          position: "sticky",
          overflow: "auto",
          top: "64px",
          color: "#111",
          height: "calc(100svh - 64px)",
          overflow: "auto",
        }}
      >
        <SideMenu />
      </Sider>
      <Content
        style={{
          position: "relative",
          fontSize: "16px",
        }}
      >
        {children}
      </Content>
      <ReferenceDrawer />
    </Layout>
  );
}