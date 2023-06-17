"use client";
import CategorieSection, {
  Categorie,
} from "@/components/admin/CategorieSection";
import SiteSection from "@/components/admin/SiteSection";
import ThemeSection, { Theme } from "@/components/admin/ThemeSection";

import { useState } from "react";

export default function AdminPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  return (
    <>
      <CategorieSection categories={categories} setCategories={setCategories} />
      <ThemeSection themes={themes} setThemes={setThemes} />
      <SiteSection categories={categories} themes={themes}/>
    </>
  );
}
