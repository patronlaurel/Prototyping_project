<script>
  import { goto } from "$app/navigation";
  export let data;
  let rezepte = data.rezepte;
  let kategorien = data.kategorien;
  let selectedCategory = "all";

  $: filteredRezepte =
    selectedCategory === "all"
      ? rezepte
      : rezepte.filter(
          (rezept) => rezept.kategorieID === parseInt(selectedCategory),
        );

  async function handleDelete(id) {
    if (confirm("Möchten Sie dieses Rezept wirklich löschen?")) {
      try {
        const response = await fetch(`/rezepte/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          rezepte = rezepte.filter((r) => r._id !== id);
        } else {
          throw new Error("Fehler beim Löschen");
        }
      } catch (error) {
        alert("Fehler beim Löschen des Rezepts");
      }
    }
  }
</script>

<h1>Alle Rezepte</h1>

<div class="filter-section mb-4">
  <select
    class="form-select"
    bind:value={selectedCategory}
    style="max-width: 300px;"
  >
    <option value="all">Alle Kategorien</option>
    {#each kategorien as kategorie}
      <option value={kategorie._id}>{kategorie.name}</option>
    {/each}
  </select>
</div>

<div class="rezepte-grid">
  {#each filteredRezepte as rezept}
    <div class="rezept-card">
      <button class="btn" on:click={() => goto(`/rezepte/${rezept._id}`)}>
        <img src={rezept.bild} alt={rezept.name} />
        <h2>{rezept.name}</h2>
        <p>{rezept.beschreibung}</p>
      </button>
      <button class="btn btn-danger" on:click={() => handleDelete(rezept._id)}>
        Löschen
      </button>
    </div>
  {/each}
</div>

<style>
  .rezepte-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .rezept-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .rezept-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  .rezept-card img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  .rezept-card h2 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  .rezept-card p {
    font-size: 0.9rem;
    color: #666;
  }

  .filter-section {
    margin: 20px 0;
  }
</style>
