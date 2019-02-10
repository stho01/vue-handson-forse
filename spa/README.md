# Vue hands-on

## 0) Før vi starter

A) Installer npm pakkene ved å kjøre:

> yarn install 

B) Start opp applikasjonen med denne kommandoen:

> yarn serve

C) Bli kjent med *.vue filen 

## 1) Inhenting og utlisting av data 

**~\src\views\Products.vue**

A) Sett opp en variabel i klassen `Products`, feks. _products_.

B) I lifecycle metoden `create`, bruk `productApi` til å hente 
ut listen over produkter og sett listen til variabelen du akkurat satte opp. 

C) I template seksjonen, bruk `v-for` direktivet til å liste ut 
Id og Navn til produktene i `table` elementet.

Resultat:

| ID      | Navn        | *           
|:--------|:-----------:|----------   
| AAA123  | Melk        | Legg til     
| AAA126  | Brød        | Legg til
| AAA128  | Ketchup     | Legg til
|         |             | Nytt produkt 

D)  Det er et problem at det tar mellom lang tid før listen over produktene vises.
    Bruk _Wait_ komponenten til å vise en spinner før produktlisten er klar.

E)  Bruk `v-if` direktivet til å vise/skjule _Wait_ komponentet dersom listen er tom.

F)  Wrap produkt id i en `router-link` og pek lenken mot ruten _product_. 
    _Note: Du kan bruke RouteNames konstantene for å hente opp navn på rutene som finnes._ 

## 2) Redigering av data 

**~\src\views\Product.vue**

A) 
