<script>
  export let data;
  let recipe = data.recipe;

  function goBack() {
    history.back(); 
  }

  async function handleDelete() {
    if (confirm("Möchten Sie dieses Rezept wirklich löschen?")) {
      try {
        const response = await fetch(`/rezepte/${recipe._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          goto("/rezepte");
        } else {
          throw new Error("Fehler beim Löschen");
        }
      } catch (error) {
        alert("Fehler beim Löschen des Rezepts");
      }
    }
  }
</script>

<div class="detail-page">
  {#if recipe}
    <button class="back-button" on:click={goBack}>⬅ Zurück</button>
    <div class="detail-container">
      <img src={recipe.bild} alt={recipe.name} />
      <h1>{recipe.name}</h1>
      <p><strong>Beschreibung:</strong> {recipe.beschreibung}</p>
      <p><strong>Zutaten:</strong> {recipe.zutaten}</p>
      <p><strong>Zubereitung:</strong> {recipe.zubereitung}</p>
      <p><strong>Kochzeit:</strong> {recipe.kochzeit} Minuten</p>
      <p><strong>Schwierigkeitsgrad:</strong> {recipe.schwierigkeitsgrad}</p>
      <button class="btn btn-danger" on:click={handleDelete}
        >Rezept löschen</button
      >
    </div>
  {:else}
    <p>Das Rezept konnte nicht geladen werden.</p>
  {/if}
</div>

<style>
  .detail-page {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .detail-container img {
    max-width: 400px;  
    max-height: 300px; 
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .back-button {
    display: inline-block;
    margin-bottom: 1.5rem;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;
  }

  .back-button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  .back-button:active {
    background-color: #003f8a;
    transform: translateY(0);
  }

  .detail-container {
    text-align: center;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    margin: 0.5rem 0;
    color: #666;
  }

  strong {
    color: #333;
  }
</style>
