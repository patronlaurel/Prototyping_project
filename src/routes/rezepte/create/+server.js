import db from '$lib/db.js';

export async function POST({ request }) {
    try {
        const recipe = await request.json();
        const id = await db.createRecipe(recipe);

        return new Response(JSON.stringify({ id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}