import db from "$lib/db.js";

export async function load() {
  try {
    const [rezepte, kategorien] = await Promise.all([
      db.getRecipes(),
      db.getCategories()
    ]);
    return {
      rezepte,
      kategorien
    };
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
    return {
      rezepte: [],
      kategorien: [],
      error: error.message,
    };
  }
}