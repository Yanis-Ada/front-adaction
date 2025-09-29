import { fetchExternalImage } from "next/dist/server/image-optimizer";
import Image from "next/image";

export default function Home() {
  api()
  return (
    <h1>test</h1>
  );
}

async function api(){
  const response = await fetch("http://localhost:5000/");
  const data = await response.json();
  console.log(data)
}

