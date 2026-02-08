# Guide : Rendre un Site Responsive

Voici les étapes clés pour transformer n'importe quel site web en une expérience fluide sur mobile, tablette et ordinateur.

## 1. La Base Absolue : Le Viewport
C'est la première étape indispensable. Sans cela, les mobiles afficheront une version "dézoomée" de votre site desktop.

Ajoutez cette ligne dans la section `<head>` de votre fichier HTML :
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 2. Unités Relatives vs Fixes
Abandonnez les pixels pour la structure principale. Pensez en pourcentages.

*   ❌ **À éviter :** `width: 1000px;` (Force le scroll horizontal sur petits écrans)
*   ✅ **À faire :** `width: 100%;` ou `max-width: 1000px;`
    *   *Astuce :* `max-width` permet au bloc de grandir jusqu'à une limite, puis de rétrécir si l'écran est plus petit.

## 3. Mise en Page Flexible (Flexbox & Grid)
Utilisez des conteneurs qui s'adaptent au contenu.

*   **Flexbox (`display: flex`)** : Idéal pour les barres de menu ou aligner des éléments.
    *   Utilisez `flex-wrap: wrap;` pour que les éléments passent à la ligne automatiquement si l'espace manque.
*   **CSS Grid (`display: grid`)** : Puissant pour les grilles complexes (cartes, galeries).
    *   Exemple de grille auto-adaptative :
    ```css
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    ```

## 4. Les Media Queries (Points de Rupture)
C'est ici que la magie opère. Vous définissez des règles CSS spécifiques selon la taille de l'écran.

### Structure type dans `style.css` :

```css
/* --- Style par défaut (Mobile First ou Desktop) --- */
.container {
    padding: 2rem;
}

/* --- Tablettes (max-width: 768px) --- */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    .menu {
        display: none; /* Cacher le menu desktop */
        /* Afficher le menu burger ici */
    }
}

/* --- Mobiles (max-width: 480px) --- */
@media (max-width: 480px) {
    h1 {
        font-size: 1.5rem; /* Réduire la taille des titres */
    }
    .colonne {
        width: 100%; /* Empiler les éléments verticalement */
        display: block;
    }
}
```

## 5. Images et Médias Fluides
Empêchez vos images de dépasser de l'écran et de créer un scroll horizontal.

Ajoutez ceci à votre CSS global :
```css
img, video, iframe {
    max-width: 100%; /* Ne dépasse jamais le conteneur */
    height: auto;    /* Conserve les proportions */
    display: block;  /* Évite les petits espaces blancs sous l'image */
}
```

## 6. Typographie Adaptative
Le texte doit rester lisible sans zoomer.

*   Utilisez **`rem`** ou **`em`** plutôt que `px` pour les tailles de police (`font-size`).
*   Ajustez la taille des titres (`h1`, `h2`) dans les media queries mobiles pour éviter qu'ils ne mangent tout l'écran.

## 7. Ergonomie Tactile (Touch Friendly)
Sur mobile, on clique avec le doigt, ce qui est moins précis qu'une souris.

*   **Taille cible :** Les boutons et liens doivent être assez gros (min 44x44px recommandés par Apple/Google).
*   **Espacement :** Ajoutez du `margin` ou `padding` pour éviter les "miss-clicks" entre deux liens proches.
