"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Theme } from "./ThemeSection";
import { Categorie } from "./CategorieSection";
import SiteForm from "./SiteForm";
import SitesTable from "./SitesTable";

type Media = {
  id: number;
  media_type: string;
  media_lien: string;
  siteId: number;
};

export type Site = {
  id: number;
  nom: string;
  description: string;
  moyennes_transport: string;
  localisation: string;
  wilaya: number;
  commune: string;
  debute_access: number;
  fin_access: number;
  documentation_historique: any;
  createdAt: string;
  updatedAt: string;
  themeId: 1;
  categorieId: 4;
  theme: Theme;
  categorie: Categorie;
  commentaires: string[];
  medias: Media[];
};

type propsType = {
  categories: Categorie[];
  themes: Theme[];
};

export default function SiteSection({ categories, themes }: propsType) {
  const [sites, setSites] = useState<Site[]>([]);

  const getSites = () => {
    axios
      .get("/api/admin/site")
      .then((res) => {
        if (res?.data?.success) setSites(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSites();
    console.log(sites);
  }, []);

  return (
    <section className="section-layout text-sm md:text-base space-y-8">
      <h1 className="text-center text-4xl font-semibold">Sites</h1>
      <div className="grid grid-cols-1 gap-4 md:gap-8">
        <div className="flex justify-center">
          <SiteForm
            categories={categories}
            themes={themes}
            getSites={getSites}
          />
        </div>
        <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md border border-gray-300 overflow-x-scroll md:overflow-auto">
          <SitesTable sites={sites} getSites={getSites} />
        </div>
      </div>
    </section>
  );
}
