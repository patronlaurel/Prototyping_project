<script>
  import { goto } from "$app/navigation";

  let error = null;
  let newRecipe = {
    name: "",
    beschreibung: "",
    zutaten: "",
    zubereitung: "",
    kochzeit: "",
    schwierigkeitsgrad: "Einfach",
  };

  async function handleSubmit() {
    try {
      const response = await fetch("/rezepte/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Erstellen des Rezepts.");
      }

      alert("Rezept erfolgreich erstellt!");
      goto("/rezepte");
    } catch (err) {
      error = err.message;
      console.error("Error:", err);
    }
  }
</script>

<div>
  <h1>Neues Rezept erstellen</h1>
  {#if error}
    <p style="color: red;">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <label for="name">Name:</label>
    <input id="name" type="text" bind:value={newRecipe.name} required />

    <label for="beschreibung">Beschreibung:</label>
    <textarea id="beschreibung" bind:value={newRecipe.beschreibung} required
    ></textarea>

    <label for="zutaten">Zutaten:</label>
    <textarea id="zutaten" bind:value={newRecipe.zutaten} required></textarea>

    <label for="zubereitung">Zubereitung:</label>
    <textarea id="zubereitung" bind:value={newRecipe.zubereitung} required
    ></textarea>

    <label for="kochzeit">Kochzeit (Minuten):</label>
    <input
      id="kochzeit"
      type="number"
      bind:value={newRecipe.kochzeit}
      required
    />

    <label for="schwierigkeitsgrad">Schwierigkeitsgrad:</label>
    <select
      id="schwierigkeitsgrad"
      bind:value={newRecipe.schwierigkeitsgrad}
      required
    >
      <option value="Einfach">Einfach</option>
      <option value="Mittel">Mittel</option>
      <option value="Schwer">Schwer</option>
    </select>

    <button type="submit">Rezept erstellen</button>
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
  textarea,
  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

  textarea {
    min-height: 100px;
  }
</style>
