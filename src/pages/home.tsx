import { H1 } from "~/layout/header";

export default function Home() {
  return (
    <>
      <H1>Synchronous Home Page</H1>
      <p>This page is a sync home without any data loading nor any code splitting.</p>
    </>
  );
}
