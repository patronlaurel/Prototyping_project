<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand" href="/">Rezeptverwaltung</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Startseite</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/rezepte">Rezepte</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/kategorien">Kategorien</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/kategorien/create">Neue Kategorie</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/rezepte/create">Neues Rezept</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<main class="container mt-4">
  <slot />
</main>
