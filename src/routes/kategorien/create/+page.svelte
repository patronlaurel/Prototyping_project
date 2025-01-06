<script>
    import { goto } from "$app/navigation";

    let error = null;
    let newCategory = {
        name: "",
        beschreibung: "",
    };

    async function handleSubmit() {
        try {
            const response = await fetch("/kategorien/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Fehler beim Erstellen der Kategorie.",
                );
            }

            alert("Kategorie erfolgreich erstellt!");
            goto("/kategorien");
        } catch (err) {
            error = err.message;
            console.error("Error:", err);
        }
    }
</script>

<div>
    <h1>Neue Kategorie erstellen</h1>

    {#if error}
        <p style="color: red;">{error}</p>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={newCategory.name} required />

        <label for="beschreibung">Beschreibung:</label>
        <textarea
            id="beschreibung"
            bind:value={newCategory.beschreibung}
            required
        ></textarea>

        <button type="submit" class="btn btn-primary"
            >Kategorie erstellen</button
        >
    </form>
</div>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    label {
        font-weight: bold;
    }

    input,
    textarea {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
    }

    textarea {
        min-height: 100px;
    }
</style>
