# 🌿 Plantastic

Web aplikacija za praćenje njege sobnih biljaka.

---

## Tim

| Ime i prezime | GitHub |
|---|---|
| Mia | [@mia](https://github.com) |

---

## Fakultet

[Fakultet informatike u Puli](https://fipu.unipu.hr/)

## Kolegij

[Programsko inženjerstvo](http://ntankovic.unipu.hr/pi)

## Mentor

[doc. dr. sc. Nikola Tanković](http://ntankovic.unipu.hr/)

---

## Opis aplikacije

Plantastic je web aplikacija namijenjena ljubiteljima sobnih biljaka koji žele pratiti njegu svojih biljaka na jednom mjestu.

**Glavne funkcionalnosti:**

- Registracija i prijava korisnika (email/lozinka i Google račun)
- Pretraživanje kataloga biljaka i dodavanje u osobnu kolekciju
- Pregled osobne kolekcije s mogućnošću uklanjanja biljaka
- Evidencija zalijevanja po biljci s automatskim izračunom sljedećeg termina
- Prikaz statusa zalijevanja ("Za X dana", "Zalij danas!", "Kasni X dana")
- Pregled povijesti zalijevanja
- Admin panel za dodavanje, uređivanje i brisanje vrsta biljaka iz kataloga

**Tehnologije:**

- Vue 3 (Composition API)
- Vue Router 5
- Pinia (state management)
- Firebase Authentication
- localStorage (pohrana podataka)
- Vite

---

## Javni prototip

> Link na prototip: _u izradi_

---

## Zaduženja

### Mia

- Dizajn i implementacija korisničkog sučelja (sve Vue komponente i view-ovi)
- Postavljanje Vue Router-a i zaštita ruta
- Implementacija Pinia store-ova (`biljke.js`, `auth.js`)
- Integracija Firebase Authentication (email/lozinka, Google prijava)
- Implementacija logike zalijevanja i automatskog izračuna statusa
- Admin panel (dodavanje, uređivanje, brisanje vrsta biljaka)
- Postavljanje Firebase projekta

---

## Pristupni podaci za testiranje

**Admin:**
- Email: `admin@plantastic.com`
- Lozinka: `admin123`

**Korisnik:**
- Email: `korisnik@plantastic.com`
- Lozinka: `korisnik123`
