import axios from "axios";
import { Site } from "./SiteSection";

type PropsType = {
  sites: Site[];
  getSites: Function;
};

export default function SitesTable({ sites, getSites }: PropsType) {
  const deleteSite = (id: number) => {
    axios
      .delete(`/api/admin/site/${id}`)
      .then((res) => {
        getSites();
      })
      .catch((err) => console.log(err));
  };

  return (
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
              <td className="p-4 border-b border-gray-300">{site.commune}</td>
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
  );
}
