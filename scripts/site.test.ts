import { describe, expect, test } from "bun:test";

const TARGET = "https://dmezhnov.org/";
const root = new URL("../", import.meta.url);
const read = (name: string) => Bun.file(new URL(name, root)).text();

describe("index.html", () => {
  test("redirects to dmezhnov.org by meta refresh and by script", async () => {
    const html = await read("index.html");
    expect(html).toContain(`<meta http-equiv="refresh" content="0; url=${TARGET}">`);
    expect(html).toContain(`location.replace("${TARGET}")`);
    expect(html).toContain(`<a href="${TARGET}">`);
  });
});

// privacy.html is the Privacy policy URL of the Google OAuth app «Claude Calendar MCP»:
// it must stay a readable policy on this domain, not a redirect.
describe("privacy.html", () => {
  test("is the privacy policy and does not redirect", async () => {
    const html = await read("privacy.html");
    expect(html).toContain("Privacy Policy");
    expect(html).toContain("Limited Use");
    expect(html).not.toContain("http-equiv=\"refresh\"");
    expect(html).not.toContain("location.");
  });
});
