type LoginRequestBody = {
  email: string;
  password: string;
};

type RegisterRequestBody = {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  password: string;
};

type AddThemeRequestBody = {
  nom: string;
};
type CategorieRequestBody = {
  nom: string;
};

type siteRequestBody = {
  nom: string;
  description: string;
  moyennes_transport: string;
  localisation: string;
  wilaya: number;
  commune: string;
  debute_access: string;
  fin_access: string;
  documentation_historique?: string;
  themeId: number;
  categorieId: number;
};

export function loginDataValidation(reqBody: LoginRequestBody) {
  if (!reqBody.email && !reqBody.password) return false;
  // more input data inspection
  return true;
}

export function registerDataValidation(reqBody: RegisterRequestBody) {
  if (!reqBody.nom && !reqBody.prenom && !reqBody.email && !reqBody.role)
    return true;
}

export function addThemeValidation(reqBody: AddThemeRequestBody) {
  if (!reqBody.nom) return false;
  return true;
}

export function addCategorieValidation(reqBody: CategorieRequestBody) {
  if (!reqBody.nom) return false;
  return true;
}

export function siteValidation(reqBody: siteRequestBody) {
  if (
    !reqBody.nom &&
    !reqBody.description &&
    !reqBody.moyennes_transport &&
    !reqBody.localisation &&
    !reqBody.wilaya &&
    !reqBody.commune &&
    !reqBody.debute_access &&
    !reqBody.fin_access &&
    !reqBody.themeId &&
    !reqBody.categorieId
  )
    return false;

  return true;
}
