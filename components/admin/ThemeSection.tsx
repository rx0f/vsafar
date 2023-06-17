"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type Theme = {
  id: number;
  nom: string;
  createdAt: string;
};

export default function ThemeSection() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [nom, setNom] = useState<string>("");

  const getThemes = () => {
    axios
      .get("/api/admin/theme")
      .then((res) => {
        if (res?.data?.success) setThemes(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const addTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .post("/api/admin/theme", { nom: nom })
      .then((res) => {
        console.log(res);
        getThemes();
      })
      .catch((err) => console.log(err));
  };

  const deleteCategorie = (id: number) => {
    axios
      .delete(`/api/admin/theme/${id}`)
      .then((res) => {
        getThemes();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getThemes();
  }, []);

  return (
    <section className="section-layout text-sm md:text-base space-y-8">
      <h1 className="text-center text-4xl font-semibold">Themes</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="flex items-center">
          <form className="flex flex-col space-y-4 p-4 border rounded-lg border-gray-400 w-full">
            <h2 className="text-xl text-center md:text-2xl">
              Ajouter un theme
            </h2>
            <input
              type="text"
              name="nom"
              onChange={getNom}
              placeholder="Enter le nom du theme"
              className="p-2 md:p-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              onClick={addTheme}
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Ajouter
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 rounded-lg overflow-hidden shadow-md border border-gray-300 overflow-x-scroll md:overflow-auto">
          <table className="w-full mx-auto border border-gray-300 bg-white">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="p-4 border-b border-gray-300 bg-blue-500 text-white font-semibold uppercase"
                >
                  Themes
                </th>
              </tr>
            </thead>
            <tbody>
              {themes &&
                themes.map((theme) => (
                  <tr key={theme.id}>
                    <td className="p-4 border-b border-gray-300">
                      {theme.nom}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      <div className="flex justify-end">
                        <button
                          onClick={() => deleteCategorie(theme.id)}
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
