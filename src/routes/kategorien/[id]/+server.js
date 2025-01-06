import db from '$lib/db.js';

export async function DELETE({ params }) {
    try {
        await db.deleteCategory(params.id);
        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}