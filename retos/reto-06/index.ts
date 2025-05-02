// HARD
// Reto 06: ASPECT RATIO DE UNA IMAGEN
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

// Aspect ratio utilities
/**
 * 
 * Mientras b no sea cero:
 * Guarda b en temp
 * Calcula el residuo a % b
 * Asigna ese residuo a b, y temp (el viejo b) a a
 * Cuando b llega a 0, el valor de a será el máximo común divisor.
 * 
 * @param a 
 * @param b 
 * 
 * @returns greatest common factor of a and b
 */
function gcf(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function getAspectRatio(width: number, height: number): [number, number] {
  const factor = gcf(width, height);
  return [width / factor, height / factor];
}

async function getImage(url:string){
  const res = await fetch(url);
  const buffer = new Uint8Array(await res.arrayBuffer());
  const image = await Image.decode(buffer);
  const [w, h] = getAspectRatio(image.width, image.height);
  return  `${w}:${h}`;
}

export function solve(url: string) {
  return getImage(url)
    .then((res) => res)
    .catch((err) => {
      console.error("Error:", err);
      return "Error";
    }
    );
}

if (import.meta.main) {
  console.log(await solve("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F09%2FBest-Beautiful-Images-For-Desktop-Nature.png&f=1&nofb=1&ipt=458d9ccff22cdfa2b2e5220192bb6fde767d5a66ed4d47ce86600e4a352bf03c")); // 16:9
}

/*
 * Crea un programa que se encargue de calcular el aspect ratio de una
 * imagen a partir de una url.
 * - Url de ejemplo:
 *   https://raw.githubusercontent.com/mouredevmouredev/master/mouredev_github_profile.png
 * - Por ratio hacemos referencia por ejemplo a los "16:9" de una
 *   imagen de 1920*1080px.
 */

