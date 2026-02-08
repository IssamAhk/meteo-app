# 🌦️ Projet Météo - Plan d'Action (Mis à jour)

## ✅ Phase 1 : Le Cerveau des Données (Terminé)
- [x] **Tâche 1.1** : Analyse de `dt_txt`.
- [x] **Tâche 1.2** : Filtrage des heures stratégiques (`00, 09, 15, 21`).
- [x] **Tâche 1.3** : Sécurité pour le Jour J (injection de la météo actuelle).
- [x] **Tâche 1.4** : Unification de la boucle d'affichage.

---

## 📱 Phase 2 : Mobile First & Structure Visuelle
*Objectif : Préparer le terrain pour un design responsive et intuitif.*

### ⏱️ Tâche 2.1 : Design Mobile First (20 min)
- [ ] Modifier `style.css` pour que l'affichage par défaut soit optimisé pour smartphone.
- [ ] Utiliser des unités relatives (`em`, `rem`, `%`) et Flexbox.

### ⏱️ Tâche 2.2 : Les Libellés Temporels (15 min)
- [ ] Créer une fonction (ou un objet de correspondance) pour transformer les heures en mots :
    * `00h -> Nuit`
    * `09h -> Matin`
    * `15h -> Après-midi`
    * `21h -> Soir`
- [ ] Afficher ce libellé au-dessus de chaque carte ou dans la carte.

---

## 🎡 Phase 3 : Le Carrousel Dynamique
*Objectif : Naviguer entre les jours de façon fluide.*

### ⏱️ Tâche 3.1 : Groupement des données par jour (30 min)
- [ ] Modifier la logique JS pour regrouper les prévisions dans un objet : `{"Lundi": [previsions], "Mardi": [previsions], ...}`.
- [ ] Cela permettra de générer une "diapositive" par jour.

### ⏱️ Tâche 3.2 : Structure du Carrousel (HTML/CSS) (20 min)
- [ ] Créer un conteneur parent `carousel-container` avec `overflow: hidden`.
- [ ] Prévoir les boutons "Précédent" / "Suivant" (ou swipes).

### ⏱️ Tâche 3.3 : Animation et Navigation (JS) (30 min)
- [ ] Coder la logique pour faire défiler le carrousel au clic sur les futurs boutons (3, 5, 7 jours).
- [ ] Ajouter une transition fluide pour l'effet "diapositive".

---

## 💻 Phase 4 : Adaptabilité PC & Finitions
*Objectif : Que le site soit aussi beau sur grand écran.*

- [ ] **Tâche 4.1** : Media Queries pour transformer le carrousel en grille ou liste sur Desktop.
- [ ] **Tâche 4.2** : Optimisation des icônes et des couleurs (Glassmorphism ?).
- [ ] **Tâche 4.3** : Gestion des erreurs (Ville introuvable, problème réseau).

---

## 📝 Notes & Astuces
- **Mobile First** : Ne commence pas par les Media Queries ! Écris ton CSS normal pour le mobile, et utilise les `@media` uniquement pour agrandir/réorganiser sur PC.
- **Carousel** : Pour le carrousel, l'astuce est souvent de mettre toutes les diapositives sur une seule ligne très longue et de déplacer cette ligne vers la gauche ou la droite.
- **Données** : Garde bien ton `console.log(data)` pour vérifier que ton groupement par jour fonctionne bien.
