import { describe, it, expect } from "vitest";
import { resolve, siteSearchUrl, looksUrl, parsePairs, normKey, intentUrl, composeEmailUrl, summarize, SITES, SEARCH_URLS } from "../src/lib";

describe("resolve", () => {
  it("maps a known site name to its https URL", () => {
    expect(resolve("youtube")).toBe("https://youtube.com");
    expect(resolve("github")).toBe("https://github.com");
  });
  it("normalizes a trailing .com and matches by prefix", () => {
    expect(resolve("youtube.com")).toBe("https://youtube.com");
    expect(resolve("pin")).toBe("https://pinterest.com"); // prefix of "pinterest"
  });
  it("passes through an explicit http(s) URL unchanged", () => {
    expect(resolve("https://example.com/path?q=1")).toBe("https://example.com/path?q=1");
  });
  it("prefixes https:// onto a bare domain that looks like a URL", () => {
    expect(resolve("example.com")).toBe("https://example.com");
  });
  it("falls back to a Google search for free text", () => {
    expect(resolve("hello world")).toBe("https://www.google.com/search?q=hello%20world");
  });
});

describe("siteSearchUrl", () => {
  it("uses a known site's search template", () => {
    expect(siteSearchUrl("youtube", "cats")).toBe("https://www.youtube.com/results?search_query=cats");
    expect(siteSearchUrl("amazon", "usb cable")).toBe("https://www.amazon.com/s?k=usb%20cable");
  });
  it("strips a trailing .com before looking up the template", () => {
    expect(siteSearchUrl("youtube.com", "cats")).toBe("https://www.youtube.com/results?search_query=cats");
  });
  it("falls back to Google for an unknown site", () => {
    expect(siteSearchUrl("somewhere", "cats")).toBe("https://www.google.com/search?q=somewhere%20cats");
  });
});

describe("looksUrl", () => {
  it("recognizes URLs and domains", () => {
    expect(looksUrl("https://x.com")).toBe(true);
    expect(looksUrl("example.com")).toBe(true);
    expect(looksUrl("sub.example.co.uk/path")).toBe(true);
  });
  it("rejects plain words and phrases", () => {
    expect(looksUrl("hello world")).toBe(false);
    expect(looksUrl("justoneword")).toBe(false);
  });
});

describe("parsePairs", () => {
  it("splits comma-separated key=value pairs", () => {
    expect(parsePairs("name=John, email=x")).toEqual([
      { k: "name", v: "John" },
      { k: "email", v: "x" },
    ]);
  });
  it("supports colon separators and the word 'and'", () => {
    expect(parsePairs("name: Mike and phone: 555-1234")).toEqual([
      { k: "name", v: "Mike" },
      { k: "phone", v: "555-1234" },
    ]);
  });
  it("ignores fragments without a separator", () => {
    expect(parsePairs("just some text")).toEqual([]);
  });
});

describe("normKey", () => {
  it("maps synonyms to their canonical key", () => {
    expect(normKey("e-mail")).toBe("email");
    expect(normKey("firstname")).toBe("first");
    expect(normKey("postal code")).toBe("zip");
  });
  it("returns the canonical key itself unchanged", () => {
    expect(normKey("email")).toBe("email");
  });
  it("passes unknown keys through", () => {
    expect(normKey("nickname")).toBe("nickname");
  });
});

describe("intentUrl", () => {
  it("routes 'images of X' to Google Images", () => {
    expect(intentUrl("images of cats")).toBe("https://www.google.com/search?tbm=isch&q=cats");
  });
  it("routes 'directions from A to B' to Maps directions", () => {
    expect(intentUrl("directions from Boston to Miami")).toBe("https://www.google.com/maps/dir/Boston/Miami");
  });
  it("routes 'weather X' to a weather search", () => {
    expect(intentUrl("weather Paris")).toBe("https://www.google.com/search?q=weather%20Paris");
  });
  it("routes 'videos of X' to YouTube results", () => {
    expect(intentUrl("videos of puppies")).toBe(SEARCH_URLS.youtube + "puppies");
  });
  it("routes 'wiki X' to Wikipedia", () => {
    expect(intentUrl("wiki einstein")).toBe(SEARCH_URLS.wikipedia + "einstein");
  });
  it("returns null when no intent pattern matches", () => {
    expect(intentUrl("qwerty zxcv")).toBeNull();
  });
});

describe("composeEmailUrl", () => {
  it("builds a Gmail compose URL with encoded fields", () => {
    expect(composeEmailUrl("a@b.com", "Hi there", "Body text")).toBe("https://mail.google.com/mail/?view=cm&fs=1&to=a%40b.com&su=Hi%20there&body=Body%20text");
  });
  it("uses empty strings for missing fields", () => {
    expect(composeEmailUrl(undefined, undefined, undefined)).toBe("https://mail.google.com/mail/?view=cm&fs=1&to=&su=&body=");
  });
});

describe("summarize", () => {
  const text =
    "Solar panels convert sunlight into electricity. " +
    "The panels are made from silicon cells. " +
    "Silicon cells absorb photons from sunlight. " +
    "Electricity produced can power a home. " +
    "Many homes now use solar panels for electricity. " +
    "Installers mount the panels on the roof. " +
    "The roof must face the sun for best results. " +
    "Battery storage keeps the electricity for night use.";

  it("returns no more than N sentences", () => {
    const out = summarize(text, 3);
    expect(out.length).toBeLessThanOrEqual(3);
    expect(out.length).toBeGreaterThan(0);
  });
  it("returns every sentence when the count is already <= N", () => {
    const short = "One sentence here that is long enough. Another sentence that is also long enough here.";
    const out = summarize(short, 6);
    expect(out.length).toBe(2);
  });
  it("keeps sentences in their original document order", () => {
    const out = summarize(text, 4);
    const indices = out.map((s) => text.indexOf(s));
    const sorted = [...indices].sort((a, b) => a - b);
    expect(indices).toEqual(sorted);
  });
  it("favors keyword-heavy lead content (mentions the dominant topic)", () => {
    const out = summarize(text, 2).join(" ").toLowerCase();
    expect(out).toContain("solar");
  });
});

describe("data tables", () => {
  it("SITES and SEARCH_URLS expose expected entries", () => {
    expect(SITES.github).toBe("github.com");
    expect(SEARCH_URLS.amazon).toBe("https://www.amazon.com/s?k=");
  });
});
