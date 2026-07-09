# Progetto Finale

## Descrizione

L’obiettivo di questo progetto è creare un sito web completo che tratti di un argomento a vostra scelta.\
Esso dovrà avere back-office in Laravel (area admin) e un front-office in React (area guest) per gestire e visualizzare l'insieme dei dati.

### Parte 1: Backoffice in Laravel

Il vostro compito è sviluppare un backoffice completo per la gestione dei contenuti del sito.

#### 🔒 Autenticazione e Accesso

L'intero pannello deve essere protetto da autenticazione gestita tramite Laravel Breeze. Una volta effettuato il login, l'utente avrà accesso alla gestione delle entità.

#### 📦 Gestione Entità (CRUD)

Potete scegliere l'argomento che preferite per il vostro database. Spazio alla fantasia! Alcuni esempi:

Videogiochi 🎮

Film 🎬

Album musicali 💿

Libri o Fumetti 📚

...o qualsiasi altra entità vi venga in mente!

**_Requisiti minimi:_**

**Entità Principale:** Implementazione completa di tutte le operazioni CRUD (Creazione, Lettura, Aggiornamento, Eliminazione).

**Relazioni:** Deve esserci almeno una seconda entità collegata alla prima con relazione 1-N o N-N.

**Gestione Secondaria:** Anche per la seconda entità (e le successive) dovrete realizzare le interfacce CRUD per permettere di amministrare tutti i contenuti del sito.

#### 🖼️ Upload Media

Dovrete implementare una meccanica di upload file come visto a lezione (es. locandine, copertine di libri/videogames, foto d'esempio, ecc.).

#### 💡 Esempi di Struttura

**Livello Base (2 entità):** Se scegliete i Film, potreste collegarli ai Generi cinematografici (Azione, Commedia, Horror).

**Livello Pro (3+ entità):** Se scegliete i Videogiochi, potreste gestire sia le Console su cui è disponibile (PS5, Xbox, Switch), sia il Genere (Avventura, GDR, ecc.).\
Tornando all'esempio dei Film invece, potreste arricchire il progetto aggiungendo la relazione ai Registi, oppure agli Attori!\
Più relazioni implementate, più completo sarà il vostro gestionale!

#### 💻 Note Tecniche

**Template Engine:** Tutto il backoffice deve essere realizzato usando Blade.

**Frontend:** Potete aiutarvi con JS per eventuali necessità di logiche frontend e siete liberi di usare librerie esterne se vi torna comodo.

### Parte 2: Sito guest in React

Per i visitatori non autenticati (guest) dovrete creare un'app in React che permetta di:

✅ Visualizzare la lista degli elementi (videogiochi, film, ecc.)\
✅ Vedere i dettagli di un singolo elemento\
✅ Mostrare anche le informazioni collegate (es. le categorie di appartenenza)

Questa app dovrà comunicare con il backend tramite chiamate AJAX ad API REST, quindi nel backend dovrete creare un set di endpoint API per recuperare i dati.

#### 🎯Obiettivo

Alla fine di questo progetto avrete realizzato un’app completa con:

✅ Un backoffice in Laravel con autenticazione e gestione CRUD\
✅ Un frontend in React che mostra i dati in modo chiaro e interattivo\
✅ Relazioni tra le entità per una gestione più realistica delle informazioni

#### 💡 Consigli

- Strutturate bene le relazioni nel database prima di partire.
- Usate Postman o strumenti simili per testare le API.
- Curate l’UI del frontend per rendere la navigazione intuitiva.
  #### Buon lavoro! 🚀
