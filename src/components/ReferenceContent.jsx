"use client"
import Link from "next/link";
import styles from "@/components/ReferenceContent.module.scss";

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
      <h3>
        {href ? <Link href={href}>{name}</Link> : name}({args}) :{" "}
        <span>{returnObject}</span>
      </h3>
      <div>
        <div>{argsInfo}</div>
        {children}
      </div>
    </div>
  );
}
