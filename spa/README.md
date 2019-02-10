# Vue hands-on

## 0) Før vi starter

A) Installer npm pakkene ved å kjøre:

> yarn install 

B) Start opp applikasjonen med denne kommandoen:

> yarn serve

C) Bli kjent med vue filen 

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
| Nytt produkt ||

D)  Det er et problem at det tar litt tid før listen over produktene vises.
    Bruk _Wait_ komponenten til å vise en spinner før produktlisten er klar.

E)  Bruk `v-if` direktivet til å vise/skjule _Wait_ komponentet dersom listen er tom.

F)  Legg merke til at den tomme tabellen forstatt er synlig, vi kan skjule den med `v-else`
    direktivet.
    
```
<wait v-if="conditional"></wait>
<div v-else></div>
```

## 2) router-link

A)  Wrap id feltet i en `router-link` og pek lenken mot ruten _product_. 
    _Tips: Du kan bruke RouteNames konstantene (~\src\router\index.ts) for å hente opp navn på rutene som finnes._ 

Legg merke til at url ikke blir er riktig når man navigerer seg inn på et produkt. 
I ~\src\router\index.ts ser du oppsettet for alle ruter i prosjeketet. 
Problemet er at ruten _product_ krever en id for at den skal matche. 

B)  Gå tilbake i _Products.vue_ komponentet og legg til en _id_ parameter på lenken og
    prøv på nytt.
 
```
<route-link :to={ ..., params: { id: <produkt_id> } }>Id</route-link>
```

## 3) Redigering av data

A)  Ta i mot id'en ved å sette opp en `prop` i _~\src\views\Product.vue_. 
    Propertien må ha navnet _id_.
    
B)  Bruk id'en til å hente ned produktet fra `productApi` og sett produktet til 
    _product_ variabelen.

C)  I _Product.vue_ malen: bytt ut {{product.name}} og {{product.weight}} bindings med input 
    felter. Benytt two-way binding.
    
D)  Legg til en _click handler_ på _lagre_ knappen og lagre produktet med `productApi`. 

E)  Legg til en tilbake knapp som navigerer til forrige side.
    _Tips: kan bruke BackButton.vue_ 

**Ekstra oppgave)**

Dersom produktet med id'en ikke finnes kastes det en exception fra APIet, men bruker vil bare
en loader som aldri blir borte. 
Bruk ~\src\components\shared\Error.vue komponentet til å vise feilmelding til bruker dersom produkt med id ikke finnes.

## 4) Kort om v-model modifiers

I forrige oppgave satte vi opp input felter for product.name og product.weight. 
problemet her er at weight og name er to forskjellige data typer. 
v-model hånderer alt som strings dersom man gir indikasjon på noe annet.
    
```
interface IProduct {
    id: string;
    name: string;
    weight: number;
}
```

A)  Bruk number modifier på product.weight `v-model` bindinga for å fortelle Vue 
    at dette feltet skal være av typen number.

## 5) ProductEditor.vue - Data flyt opp og ned fra komponenter

A)  I _Products.vue_ er det satt opp en knapp som med teksten _Nytt Produkt_.
    Legg til en _click handler_ som navigerer brukeren til _NewProduct.vue_ med ruten 
    `RouteNames.NEW_PRODUCT`. Bruk `$router` APIet.
        
    Note: Legg merke til at malen til NewProduct.vue er veldig lik malen vi 
    satte opp i Product.vue
        
B)  Lag en ny fil for komponentet ProductEditor.vue. feks: `~\src\components\product\ProductEditor.vue`

Kopier malen under og lim inn i den nye komponentet. 
```
<template>
    <table></table>
</template>
<scripts lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    
    @Component
    export default class ProductEditor extends Vue { }
</scripts>
```

C)  Kopier tabellen i NewProduct.vue og lim den inn i malen til det nye komponentet. Fjern
    v-else direktivet fra table tag'en.
    
D)  Sett opp en `prop` som skal ta i mot et produkt. 

E)  Legg til en _click handler_ på lagre knappen og bruk `$emit(event: string, ...args:any[])` for å sende ut en 
    "save" event med produktet som er endret. 

F)  Bytt ut tabellen i _Product.vue_ og _NewProduct.vue_ med _ProductEditor_ komponentet. 
    Legg til handlere for save og lagre produktet med `productApi`.