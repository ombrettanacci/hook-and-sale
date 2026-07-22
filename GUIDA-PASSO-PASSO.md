# Guida: pubblicare Hook&Sale online (per chi parte da zero)

Segui questi passaggi nell'ordine. Ci vogliono circa 30-40 minuti la prima volta.

## Passo 1 — Prendi la tua chiave API Anthropic

1. Vai su https://console.anthropic.com e crea un account (o accedi)
2. Nel menu a sinistra cerca "API Keys"
3. Clicca "Create Key", dalle un nome (es. "hooksale") e copiala subito — non la rivedrai più
4. Salvala per un attimo da qualche parte in sicurezza, tipo un file di testo sul tuo computer
5. Nella stessa dashboard, aggiungi un metodo di pagamento e ricarica un piccolo credito (anche 5-10€ bastano per iniziare, ogni generazione costa pochi centesimi)

## Passo 2 — Crea un account GitHub

1. Vai su https://github.com e crea un account gratuito
2. Una volta dentro, clicca il pulsante verde "New" per creare un nuovo repository
3. Chiamalo "hook-and-sale", lascialo pubblico o privato (indifferente), clicca "Create repository"

## Passo 3 — Carica i file su GitHub

1. Nella pagina del repository appena creato, clicca il link "uploading an existing file"
2. Trascina dentro TUTTI i file e le cartelle che trovi nel progetto che ti ho preparato (mantieni la struttura delle cartelle: `src/`, `api/`, e i file nella radice)
3. In basso scrivi un messaggio tipo "primo caricamento" e clicca "Commit changes"

## Passo 4 — Collega GitHub a Vercel

1. Vai su https://vercel.com e crea un account gratuito usando "Continue with GitHub" (così si collegano automaticamente)
2. Una volta dentro, clicca "Add New" → "Project"
3. Trovi il repository "hook-and-sale" nella lista: clicca "Import"
4. Vercel riconosce automaticamente che è un progetto Vite/React, non toccare le impostazioni

## Passo 5 — Aggiungi la tua chiave API in modo sicuro

Prima di cliccare "Deploy":

1. Nella stessa schermata, apri la sezione "Environment Variables"
2. Nel campo "Key" scrivi: `ANTHROPIC_API_KEY`
3. Nel campo "Value" incolla la chiave che hai copiato al Passo 1
4. Clicca "Add", poi clicca "Deploy"

Aspetta un minuto: Vercel costruisce e pubblica il sito.

## Passo 6 — Prendi il link della tua app

1. Quando il deploy finisce, Vercel ti mostra un link tipo `hook-and-sale.vercel.app`
2. Aprilo e prova l'app: scrivi una descrizione e clicca "Genera hook e CTA"
3. Se funziona, quel link è la tua app pubblica, pronta da collegare a Stan Store

## Passo 7 — Collega il link a Stan Store

1. Entra su Stan Store, crea il tuo prodotto "Hook&Sale"
2. Invece di caricare un file, scegli l'opzione per condividere un link (o metti il link nella descrizione/nel contenuto del prodotto, a seconda del tipo di prodotto che scegli su Stan)
3. Incolla il link `.vercel.app`

## Se qualcosa non funziona

- **L'app si apre ma dà errore quando generi**: controlla di aver scritto `ANTHROPIC_API_KEY` esattamente così, senza spazi, nelle Environment Variables su Vercel
- **Il deploy fallisce**: controlla di aver caricato su GitHub tutti i file mantenendo le cartelle `src/` e `api/`
- **Vuoi cambiare qualcosa nel testo o nei colori**: modifica il file `src/App.jsx` direttamente su GitHub (matita in alto a destra sul file), salva, e Vercel aggiorna il sito da solo in automatico dopo ogni modifica

## Un consiglio

Prima di collegarlo a Stan Store e venderlo, provalo tu per qualche giorno con 5-10 descrizioni diverse, per essere sicura che gli output ti piacciano davvero.
