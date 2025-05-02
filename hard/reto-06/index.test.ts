import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

const cases = [
  ["16:9", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F09%2FBest-Beautiful-Images-For-Desktop-Nature.png&f=1&nofb=1&ipt=458d9ccff22cdfa2b2e5220192bb6fde767d5a66ed4d47ce86600e4a352bf03c"],
  ["4:3", "https://wallpapercave.com/wp/wp6058379.png"],
  ["1:1", "https://images.unsplash.com/photo-1594476664296-8c552053aef3?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
];

describe("Reto 06: ASPECT RATIO DE UNA IMAGEN", () => {
  for (const [expected, url] of cases) {
    it(`should return ${expected}`, async () => {
      const result = await solve(url);
      expect(result).toEqual(expected);
    });
  }

  it("should handle error on invalid url", async () => {
    const result = await solve("https://example.com/image404.jpg");
    expect(result).toEqual("Error");
  });
});
