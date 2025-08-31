# Aplikacja Katalogu Produktów

Nowoczesna aplikacja katalogu produktów zbudowana w oparciu o backend Symfony oraz frontend React, z obsługą zarządzania rabatami i synchronizacją z zewnętrznym API.

## Stack technologiczny

### Backend

- **Symfony 6.3** – framework PHP
    
- **PostgreSQL** – baza danych
    
- **Doctrine ORM** – warstwa abstrakcji bazy danych
    
- **Wzorzec Strategia** – obliczanie rabatów
    

### Frontend

- **React 18** – framework UI
    
- **Vite** – narzędzie do budowania aplikacji
    
- **Material-UI (MUI)** – biblioteka komponentów
    
- **Tailwind CSS** – biblioteka stylów typu utility-first
    
- **React Router** – nawigacja
    
- **Redux Toolkit** – zarządzanie stanem
    
- **React Query** – zarządzanie stanem zapytań api
    

### Infrastruktura

- **Docker & Docker Compose** – konteneryzacja
    
- **Nginx** – reverse proxy
    
- **PHP-FPM** – menedżer procesów PHP
    

## Funkcjonalności

### Backend API

- `GET /api/products` – lista produktów z filtrowaniem i sortowaniem
    
- `POST /api/products` – dodawanie nowych produktów z walidacją
    
- `GET /api/products/{id}/price` – pobieranie ceny końcowej z uwzględnieniem rabatu
    
- Komenda: `app:sync-products` – synchronizacja produktów z API DummyJSON
    

### Frontend

- **Lista produktów** – przeglądanie, filtrowanie po kategorii, sortowanie po cenie
    
- **Dodawanie produktu** – formularz z walidacją i obsługą błędów
    
- **Podgląd ceny** – wyświetlanie ceny końcowej z detalami rabatów
    
- **Zarządzanie kategoriami** – filtrowanie kategorii obsługiwane przez Redux z zachowaniem stanu
    
- **Responsywny design** – interfejs przyjazny urządzeniom mobilnym
    

### Logika domenowa

- **Wzorzec Strategia** do obliczania rabatów
    
- **Zasady SOLID**
    
- **Serwisy domenowe** oddzielone od kontrolerów
    
- **Zarządzanie stanem Redux** dla kategorii
    
- **Testy jednostkowe** dla kalkulatora cen
    

## Szybki start

### Wymagania

- Docker & Docker Compose
    
- Git
    

### Instrukcja uruchomienia

1. **Sklonuj repozytorium i skonfiguruj środowisko**
    
    ```bash
    git clone <repository-url>
    cd test-wb2b-2
    cp .env.example backend/.env
    ```
    
2. **Uruchom aplikację**
    
    ```bash
    docker compose up -d --build
    ```
    
3. **Zainicjuj bazę danych**
    
    ```bash
    docker compose exec api composer install
    docker compose exec api php bin/console doctrine:migrations:migrate --no-interaction
    ```
    
4. **Zsynchronizuj produkty z DummyJSON**
    
    ```bash
    docker compose exec api php bin/console app:sync-products
    ```
    
5. **Uzyskaj dostęp do aplikacji**
    
    - Frontend: [http://localhost:8080](http://localhost:8080/)
        
    - API: [http://localhost:8080/api/products](http://localhost:8080/api/products)
        

## Struktura projektu

```
├── backend/                 # Symfony API
│   ├── src/
│   │   ├── Entity/          # Encje: Product, DiscountRule
│   │   ├── Controller/      # Kontrolery API
│   │   ├── Service/         # Serwisy domenowe i strategie
│   │   └── Command/         # Komendy konsolowe
│   ├── tests/               # Testy jednostkowe
│   └── migrations/          # Migracje bazy danych
├── frontend/                # Aplikacja React
│   ├── src/
│   │   ├── components/      # Komponenty React
│   │   ├── hooks/           # Customowe hooki
│   │   ├── store/           # Store i slice'y Redux
│   │   ├── lib/             # Biblioteki pomocnicze
│   │   └── App.jsx          # Główna aplikacja
│   └── package.json         # Zależności
├── nginx/                   # Konfiguracja Nginx
└── docker-compose.yml       # Orkiestracja kontenerów
```

## Dokumentacja API

### GET /api/products

Zwraca listę produktów z opcjonalnym filtrowaniem i sortowaniem.

**Parametry zapytania:**

- `category` – filtruj po kategorii
    
- `sort` – sortowanie po cenie (`asc` lub `desc`)
    

**Odpowiedź:**

```json
[
  {
    "id": 1,
    "externalId": "1",
    "name": "iPhone 9",
    "category": "smartphones",
    "priceGross": "549.00",
    "currency": "USD",
    "createdAt": "2024-08-30 00:00:00"
  }
]
```

### POST /api/products

Dodaj nowy produkt.

**Body:**

```json
{
  "name": "Product Name",
  "category": "electronics",
  "priceGross": "99.99",
  "currency": "PLN",
  "externalId": "optional-id"
}
```

### GET /api/products/{id}/price

Pobierz cenę końcową z uwzględnieniem rabatu.

**Odpowiedź:**

```json
{
  "productId": 1,
  "originalPrice": "100.00",
  "finalPrice": "90.00",
  "currency": "USD",
  "discountApplied": true,
  "discountType": "PERCENT",
  "discountValue": "10.00"
}
```

## Development

### Uruchamianie testów

```bash
docker compose exec api php bin/phpunit
```

### Komendy bazy danych

```bash
# Utwórz migrację
docker compose exec api php bin/console make:migration

# Uruchom migracje
docker compose exec api php bin/console doctrine:migrations:migrate

# Resetuj bazę danych
docker compose exec api php bin/console doctrine:database:drop --force
docker compose exec api php bin/console doctrine:database:create
docker compose exec api php bin/console doctrine:migrations:migrate
```

### Frontend Development

```bash
# Instalacja zależności
docker compose exec frontend npm install

# Tryb developerski
docker compose exec frontend npm run dev
```

## Kluczowe elementy architektury

### Wzorzec Strategia dla rabatów

Aplikacja implementuje wzorzec Strategia do obliczania rabatów:

```php
interface DiscountStrategyInterface
{
    public function calculate(string $originalPrice, DiscountRule $discountRule): string;
    public function supports(string $discountType): bool;
}
```

### Serwis domenowy

Serwis `FinalPriceCalculator` odpowiada za kalkulację ceny końcowej z użyciem odpowiedniej strategii rabatowej:

```php
public function calculateFinalPrice(Product $product, ?DiscountRule $discountRule = null): string
```

### Zarządzanie stanem w Redux

Zarządzanie kategoriami odbywa się przez Redux z automatyczną synchronizacją:

```javascript
// Kategorie są inicjalizowane i aktualizowane automatycznie
const { categories, isInitialized, actions } = useCategories()

// Dostępne akcje:
// - initializeCategories(products) – ustaw kategorie początkowe
// - addCategory(category) – dodaj nową kategorię
// - updateFromProducts(products) – synchronizuj z produktami
```

### Zasady SOLID

- **Single Responsibility** – każda klasa ma tylko jedną odpowiedzialność
    
- **Open/Closed** – nowe typy rabatów można dodać bez modyfikacji istniejącego kodu
    
- **Dependency Inversion** – kontrolery zależą od abstrakcji, nie od implementacji
    

## Debugowanie

### Najczęstsze błędy

1. **Konflikt portów** – upewnij się, że porty 80, 5432, 5173, 9000 są wolne
    
2. **Problemy z uprawnieniami** – uruchom `chmod +x backend/bin/console`
    
3. **Połączenie z bazą danych** – sprawdź dane w pliku `.env`
    
4. **Frontend nie działa** – upewnij się, że serwer Vite działa na porcie 5173
    

### Logi

```bash
# Wszystkie logi
docker compose logs

# Logi konkretnej usługi
docker compose logs api
docker compose logs frontend
docker compose logs nginx
```
