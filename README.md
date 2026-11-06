# Pizza Design Pattern

Projet TypeScript illustrant les design patterns appliqués à un système de commande de pizzas.

## Prérequis

- Node.js v22+
- npm v10+

## Installation

```bash
npm install
```

## Lancer le serveur

```bash
# Mode développement (hot reload)
npm run dev

# Mode production
npm run build && node dist/src/api/server.js
```

Le serveur écoute sur `http://localhost:3000`.

---

## Routes de l'API

### Client

| Méthode | Route | Description | Body |
|---------|-------|-------------|------|
| `POST` | `/clients` | Créer un client | `{ "name": string }` |
| `GET` | `/clients/:clientId/orders` | Historique des commandes | — |

### Menu

| Méthode | Route | Description | Body |
|---------|-------|-------------|------|
| `GET` | `/menu/:restaurant` | Menu complet d'un restaurant | — |

Restaurants disponibles : `damichele`, `rossopomodoro`, `pizzium`

### Panier

| Méthode | Route | Description | Body |
|---------|-------|-------------|------|
| `POST` | `/cart` | Créer un panier | — |
| `GET` | `/cart/:id` | Consulter un panier | — |
| `POST` | `/cart/:id/pizza/premade` | Ajouter une pizza du menu | `{ "restaurant": string, "type": string, "size": string }` |
| `POST` | `/cart/:id/pizza/custom` | Ajouter une pizza custom | `{ "restaurant": string, "size": string, "base"?: string, "ingredients": string[] }` |
| `POST` | `/cart/:id/undo` | Annuler le dernier ajout | — |

### Commande

| Méthode | Route | Description | Body |
|---------|-------|-------------|------|
| `POST` | `/orders` | Créer une commande | `{ "cartId": string, "clientId": string, "restaurant": string, "deliveryAddress": string, "discount"?: { "type": string, "value"?: number } }` |
| `GET` | `/orders/:orderId` | Consulter une commande | — |
| `PATCH` | `/orders/:orderId/status` | Changer le statut | `{ "status": "PENDING" \| "CLOSE" }` |

### Validation à la création d'une commande

La création d'une commande passe par une chaîne de validation (Chain of Responsibility) :

1. Le panier ne doit pas être vide
2. Le total doit être supérieur à 15€
3. Une adresse de livraison doit être fournie
4. Le restaurant doit être ouvert
5. Les ingrédients des pizzas doivent être en stock

En cas d'échec, la route retourne `400` avec `{ "error": "Order validation failed" }`.

---

## Tester avec Bruno

### 1. Ouvrir la collection

Dans Bruno : **Open Collection** → sélectionner le dossier `bruno/` à la racine du projet.

### 2. Sélectionner l'environnement

En haut à droite de Bruno, sélectionner l'environnement **local**.

### 3. Envoyer les requêtes dans l'ordre

Les variables `clientId`, `cartId` et `orderId` sont sauvegardées automatiquement après chaque création.

| Ordre | Dossier | Requête | Description |
|-------|---------|---------|-------------|
| 1 | `client` | `0-create-client` | Crée un client, sauve `clientId` |
| 2 | `cart` | `1-create-cart` | Crée un panier, sauve `cartId` |
| 3 | `cart` | `3-add-premade-pizza` | Ajoute une Napoli L (14€) — à envoyer 2 fois |
| 4 | `order` | `1-create-order` | Crée une commande, sauve `orderId` |
| 5 | `order` | `2-get-order` | Récupère le détail de la commande |
| 6 | `order` | `3-update-status` | Passe la commande en `CLOSE` |
| 7 | `client` | `1-get-client-orders` | Historique des commandes du client |

> Le minimum de commande est 15€. Envoyer `3-add-premade-pizza` deux fois suffit (2 × 14€ = 28€).

---

## Tester avec curl

### Créer un client

```bash
curl -X POST http://localhost:3000/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'
```

```json
{ "clientId": "uuid", "name": "Alice" }
```

### Créer un panier

```bash
curl -X POST http://localhost:3000/cart
```

```json
{ "cartId": "uuid" }
```

### Consulter le menu

```bash
curl http://localhost:3000/menu/damichele
# Autres restaurants : rossopomodoro, pizzium
```

### Ajouter une pizza premade

```bash
curl -X POST http://localhost:3000/cart/{cartId}/pizza/premade \
  -H "Content-Type: application/json" \
  -d '{"restaurant": "damichele", "type": "Napoli", "size": "L"}'
```

Types disponibles : `Margherita`, `Napoli`, `Diavola`, `Funghi`, `Marinara`
Tailles DaMichele : `S`, `L`, `XL`

### Ajouter une pizza custom

```bash
curl -X POST http://localhost:3000/cart/{cartId}/pizza/custom \
  -H "Content-Type: application/json" \
  -d '{
    "restaurant": "damichele",
    "size": "L",
    "base": "Tomato",
    "ingredients": ["Mozarella", "Pepperoni"]
  }'
```

Bases : `Tomato`, `Cream`
Ingrédients : `Mozarella`, `Pepperoni`, `Ham`, `Mushrooms`, `Olives`, `Gorgonzola`

### Annuler le dernier ajout (Memento)

```bash
curl -X POST http://localhost:3000/cart/{cartId}/undo
```

### Consulter le panier

```bash
curl http://localhost:3000/cart/{cartId}
```

### Créer une commande

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "cartId": "{cartId}",
    "clientId": "{clientId}",
    "restaurant": "damichele",
    "deliveryAddress": "12 rue de la Pizza, Paris",
    "discount": { "type": "happy_hour" }
  }'
```

Types de discount : `standard`, `happy_hour` (-20%), `loyalty` (-10%), `promotion_code` (taux libre avec `"value": 0.15`)

### Consulter une commande

```bash
curl http://localhost:3000/orders/{orderId}
```

### Changer le statut d'une commande

```bash
curl -X PATCH http://localhost:3000/orders/{orderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CLOSE"}'
```

Statuts disponibles : `PENDING`, `CLOSE`

> Le changement de statut déclenche l'Observer — les listeners Email et SMS affichent une notification dans les logs du serveur.

### Historique des commandes d'un client

```bash
curl http://localhost:3000/clients/{clientId}/orders
```

---

## Design Patterns implémentés

| Pattern | Où |
|---|---|
| Factory | `pizza.factory.ts` — une factory par enseigne |
| Builder | `pizza.builder.ts` — construction de pizzas custom |
| Strategy | `pizza.price.ts` — calcul de prix par type (additif / multiplicatif) |
| Strategy | `order.discount.ts` — remises sur commande |
| Observer | `observer.ts` + `order.event.ts` — notifications Email/SMS au changement de statut |
| Memento | `cart.memento.ts` + `cart.history.ts` — historique et undo du panier |
| Chain of Responsibility | `order.validator/` — validation de commande en chaîne |
| Adapter | `client.payment.ts` — PayPal, Stripe, CB |
| Repository | `order.repository.ts` — accès aux données des commandes |

## Lancer les tests

```bash
npm test
```
