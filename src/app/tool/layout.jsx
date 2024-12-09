"use client"
import Container from "react-bootstrap/Container";

export default function Layout({ children }) {
  return (
    <Container className="pt-4 pb-5">
      {children}
    </Container>
  );
}