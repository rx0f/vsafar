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
