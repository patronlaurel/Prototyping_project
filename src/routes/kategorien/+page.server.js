import db from "$lib/db.js";

export async function load() {
    try {
        const kategorien = await db.getCategories();
        return {
            kategorien,
        };
    } catch (error) {
        console.error("Fehler beim Laden der Kategorien:", error);
        return {
            kategorien: [],
            error: error.message,
        };
    }
}