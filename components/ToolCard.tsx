"use client";
import { ToolTile } from "@/components/ToolTile";
import { tools, categories } from "@/data/tools";

interface Props { name: string; slug: string; description: string; iconName: string; }

const CAT_BY_NAME: Record<string, string> = Object.fromEntries(categories.map((c) => [c.name, c.slug]));

// Used for "Related tools" and category pages. It draws the same coloured tile as the home screen,
// so a tool looks identical everywhere. The category colour comes from the tool's own data.
export default function ToolCard({ name, slug, description, iconName }: Props) {
  const category = tools.find((t) => t.slug === slug)?.category;
  const catSlug = (category && CAT_BY_NAME[category]) || categories[0].slug;
  return <ToolTile name={name} slug={slug} description={description} iconName={iconName} catSlug={catSlug} />;
}
