"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Theme } from "./ThemeSection";
import { Categorie } from "./CategorieSection";

type Media = {
  id: number;
  media_type: string;
  media_lien: string;
  siteId: number;
};

type Site = {
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
  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [moyennes_transport, setMoyennes_transport] = useState<string>("");
  const [localisation, setLocalisation] = useState<string>("");
  const [wilaya, setWilaya] = useState<number>(0);
  const [commune, setCommune] = useState<string>("");
  const [debute_access, setDebute_access] = useState<number>(0);
  const [fin_access, setFin_access] = useState<number>(0);
  const [theme, setTheme] = useState<number>(0);
  const [categorie, setCategorie] = useState<number>(0);

  const getNom = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNom(event.target.value);

  const getDescription = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value);

  const getMoyennesTransport = (event: React.ChangeEvent<HTMLInputElement>) =>
    setMoyennes_transport(event.target.value);

  const getLocalisation = (event: React.ChangeEvent<HTMLInputElement>) =>
    setLocalisation(event.target.value);

  const getWilaya = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWilaya(parseInt(event.target.value));

  const getCommune = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCommune(event.target.value);

  const getDebutAccess = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDebute_access(parseInt(event.target.value));

  const getFinAccess = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFin_access(parseInt(event.target.value));

  const getTheme = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTheme(parseInt(event.target.value));
  const getCategorie = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCategorie(parseInt(event.target.value));

  const getSites = () => {
    axios
      .get("/api/admin/site")
      .then((res) => {
        if (res?.data?.success) setSites(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const addSite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .post("/api/admin/site", {
        nom,
        description,
        debute_access,
        fin_access,
        commune,
        wilaya,
        localisation,
        moyennes_transport,
        themeId: theme,
        categorieId: categorie,
      })
      .then((res) => {
        console.log(res);
        getSites();
      })
      .catch((err) => console.log(err));
  };

  const deleteSite = (id: number) => {
    axios
      .delete(`/api/admin/site/${id}`)
      .then((res) => {
        getSites();
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
          <form className="flex flex-col space-y-4 p-4 border rounded-lg border-gray-400">
            <h2 className="text-xl text-center md:text-2xl">Ajouter un site</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div className="col-span-1 space-y-2">
                <input
                  type="text"
                  onChange={getNom}
                  placeholder="Enter le nom du site"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getDescription}
                  placeholder="Enter la description du site"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getMoyennesTransport}
                  placeholder="Enter les moyennes du site"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getLocalisation}
                  placeholder="Localisation du site"
                  className="input-style"
                />
                <select className="input-style" onChange={getCategorie}>
                  <option selected={true} disabled={true}>
                    Categorie
                  </option>
                  {categories &&
                    categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.nom}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-span-1 space-y-2">
                <input
                  type="text"
                  onChange={getWilaya}
                  placeholder="N° wilaya"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getCommune}
                  placeholder="Commune"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getDebutAccess}
                  placeholder="Heure du début d'accès"
                  className="input-style"
                />
                <input
                  type="text"
                  onChange={getFinAccess}
                  placeholder="Heure de la fin d'accès"
                  className="input-style"
                />
                <select className="input-style" onChange={getTheme}>
                  <option selected={true} disabled={true}>
                    Theme
                  </option>
                  {themes &&
                    themes.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.nom}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={addSite}
            >
              Ajouter
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md border border-gray-300 overflow-x-scroll md:overflow-auto">
          <table className="w-full mx-auto border border-gray-300 bg-white">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase">
                  Site
                </th>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase w-48">
                  Image
                </th>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase">
                  Description
                </th>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase">
                  Moyenns de transport
                </th>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase">
                  Commune
                </th>
                <th className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {sites &&
                sites.map((site) => (
                  <tr key={site.id}>
                    <td className="p-4 border-b border-gray-300">{site.nom}</td>
                    <td className="p-4 border-b border-gray-300 w-48">
                      {site?.medias[0]?.media_lien ? (
                        <img
                          className="w-full h-auto object-cover"
                          src={site.medias[0].media_lien}
                          alt={site.nom}
                        />
                      ) : (
                        <img
                          className="w-full h-auto object-cover"
                          src="https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8="
                          alt={site.nom}
                        />
                      )}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      <p className="max-h-20 text-sm overflow-y-scroll">
                        {site.description}
                      </p>
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      {site.moyennes_transport}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      {site.commune}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteSite(site.id)}
                          className="border-blue-500 border rounded-md px-4 py-2 text-blue-500"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
