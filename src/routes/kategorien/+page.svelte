<script>
    export let data;
    let kategorien = data.kategorien;

    async function handleDelete(id) {
        if (confirm("Möchten Sie diese Kategorie wirklich löschen?")) {
            try {
                const response = await fetch(`/kategorien/${id}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    kategorien = kategorien.filter((k) => k._id !== id);
                } else {
                    throw new Error("Fehler beim Löschen");
                }
            } catch (error) {
                alert("Fehler beim Löschen der Kategorie");
            }
        }
    }
</script>

<h1>Alle Kategorien</h1>

<div class="kategorien-grid">
    {#each kategorien as kategorie}
        <div class="kategorie-card">
            <div class="kategorie-content">
                <h2>{kategorie.name}</h2>
                <p>{kategorie.beschreibung}</p>
            </div>
            <button
                class="btn btn-danger"
                on:click={() => handleDelete(kategorie._id)}
            >
                Löschen
            </button>
        </div>
    {/each}
</div>

<style>
    .kategorien-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }

    .kategorie-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .kategorie-content {
        margin-bottom: 1rem;
    }

    .kategorie-card h2 {
        font-size: 1.2rem;
        margin: 0.5rem 0;
        color: #333;
    }

    .kategorie-card p {
        font-size: 0.9rem;
        color: #666;
        margin: 0;
    }

    .btn {
        width: 100%;
    }
</style>
