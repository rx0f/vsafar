import TextInput from "../shared/TextInput";
import NumberInput from "../shared/NumberInput";
import { useState } from "react";
import axios from "axios";
import { Categorie } from "./CategorieSection";
import { Theme } from "./ThemeSection";

type PropsType = {
  categories: Categorie[];
  themes: Theme[];
  getSites: Function;
};

export default function SiteForm({ categories, themes, getSites }: PropsType) {
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

  const getTheme = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTheme(parseInt(event.target.value));
  const getCategorie = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCategorie(parseInt(event.target.value));

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

  return (
    <form className="flex flex-col space-y-4 p-4 border rounded-lg border-gray-400">
      <h2 className="text-xl text-center md:text-2xl">Ajouter un site</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        <div className="col-span-1 space-y-2">
          <TextInput placeholder="Nom du site" setValue={setNom} />
          <TextInput
            placeholder="Description du site"
            setValue={setDescription}
          />
          <TextInput
            placeholder="Moyennes du site séparés par une virgule"
            setValue={setMoyennes_transport}
          />
          <TextInput
            placeholder="Localisation du site"
            setValue={setLocalisation}
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
          <NumberInput placeholder="N° wilaya" setValue={setWilaya} />
          <TextInput placeholder="Commune" setValue={setCommune} />
          <NumberInput
            placeholder="Heure début accès"
            setValue={setDebute_access}
          />
          <NumberInput placeholder="Heure fin accès" setValue={setFin_access} />
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
  );
}
