# FilmInPocket

**FilmInPocket** nasce da un’idea semplice: unire gli amanti del cinema con il piacere della collezione.

Volevo creare un luogo digitale dove i grandi registi, gli attori indimenticabili e i capolavori del cinema potessero vivere in forma di carte collezionabili. Non solo per i cinefili più accaniti, ma anche per chi è curioso, per chi ama scoprire nuovi film, o semplicemente per chi colleziona con passione.

Perché sì, io amo il cinema.  
E questa app è la mia piccola dedica a tutto quello che il cinema rappresenta.

## Cos'è FilmInPocket?

È una web app dove puoi:

- **aprire pacchetti** come in un gioco di carte,
- **collezionare** film, attori e registi leggendari,
- **costruire mazzi** personalizzati,
- **gestire il tuo profilo** con foto, email e password,
- e, se sei admin... anche **creare o modificare le carte**!

## Le tecnologie scelte

Per realizzare questo progetto mi sono affidato a **React**, un framework moderno, veloce e flessibile.

Ho integrato:

- **React Router** per gestire la navigazione tra le pagine,
- **React-Bootstrap** per avere componenti già pronti e responsive,
- **Context API** per la gestione dell'autenticazione JWT,
- e un pizzico di **Bootstrap Icons** per dare stile e identità alle interfacce.

## Funzionalità principali

- Login e registrazione con token JWT
- Apertura pacchetti con animazione personalizzata
- Visualizzazione dinamica delle carte (film, attori, registi)
- Filtri su collezione (per rarità, genere, tipo, anno)
- Gestione profilo utente (foto, email, password)
- Sezione Admin per creare/modificare/eliminare carte
- Creazione, modifica e gestione dei mazzi

## Struttura del progetto

src/
components/ # Card, Navbar, Toast, Form ecc.
pages/ # Home, Collezione, Mazzi, Profilo, Admin,NotFound
context/ # AuthContext (login/logout/token)
styles/ # CSS modulari
App.jsx # Entry point delle route
main.jsx # Bootstrap dell'app con React Router
apiConfig.js # Config API centralizzato

## Accesso protetto

- Le rotte sono protette da un sistema di autenticazione JWT.
- Solo gli utenti con ruolo `ROLE_ADMIN` possono accedere al pannello di amministrazione.

## Backend

Il frontend comunica con un backend in **Spring Boot**, che gestisce:

- autenticazione e registrazione utenti,
- salvataggio carte e mazzi su database PostgreSQL,
- caricamento immagini su **Cloudinary**,
- ricarica ticket ogni 12 ore per aprire nuovi pacchetti.

## L'autore

Mi chiamo **Lucio Giocondo**, e FilmInPocket è il mio modo di **unire codice studiato in questi mesi e passione cinematografica**.

## Avvio del progetto

Non avete bisogno di scaricare nulla poichè è deployato ed online
qui vi lascio il link : **https://frontendfilminpocket.vercel.app**.

## Prossime feature

Come accennato nella mail, l’idea iniziale era quella di trasformare le card in vere carte da gioco ispirate allo stile di Yu-Gi-Oh!: un sistema completo con punti attacco/difesa, effetti e sfide.
Con il progredire dello sviluppo ho capito che, per questioni di tempo e complessità, non sarebbe stato realizzabile in queste quattro settimane. Ma il progetto è tutt’altro che fermo.

Il mio obiettivo è ora espandere FilmInPocket verso una dimensione più sociale:
Vorrei creare una sezione Community, dove ogni utente possa:
condividere le proprie card preferite,mostrare la propria collezione,commentare e interagire con altri collezionisti.
In altre parole: trasformare l'app in un piccolo social network per cinefili e non, dove la passione per il cinema diventa e la scoperta di questo sia il vero motore per le interazioni.
Grazie ancora per l'attenzione e per il percorso.
