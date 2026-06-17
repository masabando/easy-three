"use client"
import Link from "next/link";
import styles from "@/components/ReferenceContent.module.css";
import H3 from "@/components/H3";

export default function ReferenceContent({
  name,
  args,
  returnObject,
  argsInfo,
  href,
  children,
}) {
  return (
    <div className={styles.reference}>
      <H3>
        {href ? <Link href={href}>{name}</Link> : name}({args}) :{" "}
        <span>{returnObject}</span>
      </H3>
      <div>
        <div>{argsInfo}</div>
        {children}
      </div>
    </div>
  );
}
