import db from "$lib/db.js";

export async function load({ params }) {
    try {
        const recipe = await db.getRecipe(params.id);
        return { recipe };
    } catch (error) {
        console.error("Fehler beim Laden des Rezepts:", error);
        return {
            recipe: null,
            error: error.message,
        };
    }
}
