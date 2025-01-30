"use client";
import { FloatButton, Drawer } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import SideMenu from "./SideMenu";

export default function ReferenceDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FloatButton
        className="d-lg-none"
        icon={<UnorderedListOutlined />}
        onClick={() => setOpen(true)}
      />
      <Drawer
        // title="Reference"
        closable={false}
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        width={200}
        style={{
          padding: "60px 0 0 0"
        }}
        styles={{
          body: {
            padding: 0
          }
        }}
      >
        <SideMenu setOpen={setOpen} />
      </Drawer>
    </>
  );
}
