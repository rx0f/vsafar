"use client";


export function extractCategories (cards: any): string[] {
  const uniqueCategories = new Set<string>();
  cards.forEach((card:any) => {
    if (card.categorie?.nom !== undefined) {
      uniqueCategories.add(card.categorie.nom)
    }
  });
  const extractedCategories: string[] = Array.from(uniqueCategories);
  return extractedCategories;
};


export function extractThemes (cards: any): string[] {
  const uniqueThemes = new Set<string>();
  cards.forEach((card:any) => {
    if (card.theme?.nom !== undefined) {
      uniqueThemes.add(card.theme?.nom);
    }
  });

  const extractedThemes: string[] = Array.from(uniqueThemes)
  return extractedThemes;
};
