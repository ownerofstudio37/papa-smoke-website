import { GoogleGenAI } from "@google/genai";
import { businessInfo, siteConfig } from "@/lib/site";

export type DraftType = "blog" | "page";

export type AiDraft = {
  title: string;
  slug: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
  content: string;
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function generateAiDraft(topic: string, type: DraftType): Promise<AiDraft> {
  const prompt =
    type === "blog"
      ? `Write a local SEO blog post for Papa Smoke near Pinehurst, TX about: ${topic}.`
      : `Create a local SEO landing page for Papa Smoke near Pinehurst, TX about: ${topic}.`;
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return createDemoDraft(prompt, type);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: `${prompt}

Return only valid JSON with these keys: title, slug, excerpt, meta_title, meta_description, content.
The content value must be clean semantic HTML using h2, h3, p, ul, li, and strong tags.
Optimize for search intent, but avoid medical claims, legality claims, cannabis intoxication claims, or age-gated product guarantees.
Mention ${businessInfo.name}, ${businessInfo.city}, ${businessInfo.region}, and nearby areas naturally.
Include a soft call to action to visit the store or shop online at ${siteConfig.shopUrl}.
For ${type === "blog" ? "blog posts" : "pages"}, keep the writing helpful and locally specific.`,
    });

    const text = response.text || "{}";
    const jsonText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    const parsed = JSON.parse(jsonText);

    return {
      title: String(parsed.title || ""),
      slug: slugify(String(parsed.slug || parsed.title || "")),
      excerpt: String(parsed.excerpt || ""),
      meta_title: String(parsed.meta_title || parsed.title || ""),
      meta_description: String(parsed.meta_description || parsed.excerpt || ""),
      content: String(parsed.content || ""),
    };
  } catch (error) {
    console.error(error);
    return createDemoDraft(prompt, type);
  }
}

function createDemoDraft(prompt: string, type: DraftType): AiDraft {
  const topic = prompt
    .replace(/^.*about:\s*/i, "")
    .replace(/\.$/, "")
    .trim();
  const title =
    type === "blog"
      ? `${topic || "Papa Smoke"} Guide for Pinehurst Shoppers`
      : `${topic || "Smoke Shop Guide"} in Pinehurst and Magnolia`;
  const excerpt =
    "A helpful local guide from Papa Smoke for shoppers near Pinehurst, Magnolia, Tomball, and Montgomery County.";

  return {
    title,
    slug: slugify(title),
    excerpt,
    meta_title: title,
    meta_description: excerpt,
    content: `<h2>${title}</h2><p>Papa Smoke helps local shoppers near Pinehurst and Magnolia find glass, vapes, accessories, wraps, papers, cleaners, and everyday smoke shop essentials without making the visit complicated.</p><h3>What shoppers can expect</h3><ul><li>A clean local shop at ${businessInfo.streetAddress} in ${businessInfo.city}, ${businessInfo.region}</li><li>Helpful guidance for comparing products and accessories</li><li>Convenient access for Pinehurst, Tomball, Magnolia, and nearby Montgomery County</li></ul><p>Use this demo draft as a starting point, then add owner-approved product details, photos, and internal links before publishing.</p><p>Visit Papa Smoke in-store or use the shop online button to browse available items.</p>`,
  };
}
