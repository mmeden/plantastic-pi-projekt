# 🌿 Plantastic

Web aplikacija za praćenje njege sobnih biljaka.

Izradila: Mia Meden


---
## Fakultet informatike u Puli

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

## Za izradu projekta sam koristila:
- Vue 3 – frontend framework
- Pinia – state management
- Vue Router – navigacija između stranica
- Firebase Auth – autentikacija korisnika (email/password i Google auth)
- Firebase Firestore – pohrana korisničkih podataka

---


> [Javni prototip](https://plantastic-pi-projekt.vercel.app)

---

> [Figma prototip](https://www.figma.com/proto/iAQlVu0UJCX808nikHsdcE/Untitled?node-id=0-3&p=f&t=x8kHfypeojxYHiNn-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=0%3A176)

---

## Pristupni podaci za testiranje

**Admin:**
- Email: `admin@plantastic.com`
- Lozinka: `admin123`

**Korisnik:**
- Email: `korisnik@plantastic.com`
- Lozinka: `korisnik123`

# Project Setup
 
```
git clone https://github.com/mmeden/plantastic-pi-projekt.git
cd plantastic-pi-projekt/plantastic_pro
npm install
```
 
# Compile and Hot-Reload for Development
 
```
npm run dev
```
 
Aplikacija će se otvoriti na [localhost](http://localhost:5173)
