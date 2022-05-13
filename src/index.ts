//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!

import { helloWorld, Beispiel } from "./myModule";
import { alertMe } from "./myOtherModule";
import { flipCard } from "./app";

console.log(helloWorld);
customElements.define("my-beispiel", Beispiel);

alertMe();
flipCard();
const myInputValue = document.querySelector<HTMLInputElement>("#myInput");

const myInputValueAlternate = document.querySelector(
  "#myInput"
) as HTMLInputElement;

document
  .querySelector<HTMLInputElement>("#myInput")
  ?.addEventListener("focus", doSmth);

function doSmth(e: UIEvent) {
  const val = e.target as HTMLInputElement;
  console.log(e, val.value);
}
