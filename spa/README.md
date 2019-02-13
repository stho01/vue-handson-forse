# Vue hands-on

## 0) Før vi starter

A) Installer npm pakkene ved å kjøre:

> yarn install 

B) Start opp applikasjonen med denne kommandoen:

> yarn serve

C) Bli kjent med vue filen 

```html
<template></template>
<script></script>
<style scoped><style>
```

## 1) Inhenting og utlisting av data 

**~\src\views\Products.vue**

**A)**  I metoden `create`, bruk `productApi` til å hente 
        ut listen over produkter og sett listen til en variabel, feks. _products_. 

**B)**  I template seksjonen, bruk `v-for` direktivet til å liste ut 
        Id og Navn til produktene i `table` elementet.

Resultatet bør bli noe alá dette:

| ID      | Navn        | *           
|:--------|:-----------:|----------   
| AAA123  | Melk        | Legg til     
| AAA126  | Brød        | Legg til
| AAA128  | Ketchup     | Legg til
| Nytt produkt ||

**C)**  Det er et problem at det tar litt tid før listen over produktene vises.
        Bruk _Wait_ komponenten til å vise en spinner før produktlisten er klar.

**D)**  Bruk `v-if` direktivet til å vise/skjule _Wait_ komponentet dersom listen er tom.

**E)**  Legg merke til at den tomme tabellen forstatt er synlig, vi kan skjule den med `v-else`
        direktivet.
    
```
<wait v-if="conditional"></wait>
<div v-else></div>
```

## 2) router-link

**A)**  Wrap id feltet i en `router-link` og pek lenken mot ruten _product_. 
        _Tips: Du kan bruke RouteNames konstantene (~\src\router\index.ts) for å hente opp navn på rutene som finnes._ 

Legg merke til at url ikke blir er riktig når man navigerer seg inn på et produkt. 
I ~\src\router\index.ts ser du oppsettet for alle ruter i prosjeketet. 
Problemet er at ruten _product_ krever en id for at den skal matche. 

**B)**  Gå tilbake i _Products.vue_ komponentet og legg til en _id_ parameter på lenken og
        prøv på nytt.
 
```
<route-link :to={ ..., params: { id: <produkt_id> } }>Id</route-link>
```

## 3) Redigering av data

**A)**  Ta i mot id'en ved å sette opp en `prop` i _~\src\views\Product.vue_. 
        Propertien må ha navnet _id_.
    
**B)**  Bruk id'en til å hente ned produktet fra `productApi` og sett produktet til 
        _product_ variabelen.

**C)**  I malen til Product.vue: bytt ut one-way bindings med two-way bindings for navn og vekt.
    
**D)**  Legg til en _lagre_ knapp som sender produktet til "serveren" med `productApi`. 
        
**E)**  Legg til en tilbake knapp som navigerer til forrige side. _Tips: kan bruke BackButton.vue_ 

## 4) Kort om v-model modifiers + litt om watchers.
    
```
// Legg merke til at weight er av typen number. 
interface IProduct {
    id: string;
    name: string;
    weight: number;
}
```

**A)**  Lag en watcher som lytter til endringer på `product.weight` variabelen, logg ut `typeof this.project.weight` i watchern.  
        Gjør en endring i inputfeltet til weight og se i console i nettleseren. Hva har ser du?
        
**B)** Fiks det med number modifier!   
  
        
## 5) ProductEditor.vue - Data flyt opp og ned fra komponenter

**A)**  I _Products.vue_ er det satt opp en knapp som med teksten _Nytt Produkt_.
        Legg til en _click handler_ som navigerer brukeren til _NewProduct.vue_ med ruten 
        `RouteNames.NEW_PRODUCT`. Bruk `$router` APIet.
    
**B)**  Lag en ny vue fil: `~\src\components\product\ProductEditor.vue`.

Kopier malen under og lim inn i det nye komponentet. 
```
<template>
    <table></table>
</template>
<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    
    @Component
    export default class ProductEditor extends Vue { }
</script>
```

**C)**  Kopier tabellen i Product.vue og lim den inn i malen til det nye komponentet. Fjern
        v-else direktivet fra table tag'en.
    
**D)**  Sett opp en `prop` som tar i mot et produkt. 

**E)**  Legg til en _click handler_ på lagre knappen og bruk `$emit(event: string, ...args:any[])` for å sende ut en 
        "save" event med produktet som er endret. 

**F)**  Bytt ut tabellen i _Product.vue_ og _NewProduct.vue_ med _ProductEditor_ komponentet. 
        Legg til handlere for save og lagre produktet med `productApi`.
    
## 6) Eventer på tvers av komponenter

Det hadde vært fint vise notifikasjoner når brukeren gjør noe av betynding, feks lagrer et produkt. 

**A)**  Sjekk ut `IEventBus` interfacet i _~\src\EventBus.ts_.

**B)**  Instansier en ny Vue instans i filen IEventBus.ts og eksporter den som en konstant "EventBus" av typen IEventBus.

**C)**  Bruk provide/inject for å eksponere EventBus'en ned til barne-komponenter av App.vue. Bruk @Provide(key: string) dekoratoren for å eksponere instansen til EventBus'en ned til under komponenter.
    
**D)**  I `~\src\components\notification\NotificationPopupList.vue` burk @Inject istedet for @Prop for å injisere eventBus 
        fra App.vue.
    
**E)**  Inject EventBus til NewProduct.vue og fyr av en DISPLAY_NOTIFICATION event når et nytt 
        produkt er opprettet og lagret. (Bruk `productApi` for lagring)   
    
## 7) Simpel store, handlekurv eksempel. 

**A)**  Se på `~\src\store\Store.ts`

**B)**  Se på ~\src\main.ts på linje 14,
        `Vue.use(<plugin_function>)`.

**C)**  Åpne fila `~\src\components\shop\MiniCart.vue`,
        bruk `$store` til å hente antall produkter det er i handlekurven.
    
**D)**  Legg til en _click handler_ på _legg til_ knappene i `~\src\views\Products.vue` og legg til 
        produktet i `$store.shoppingList`.
 
**E)**  Åpne fila `~\src\views\ShoppingCart.vue`,
        bruk `$store` til å liste ut alle produkter som er lagt til 

**F)**  Implementer `removeEntry(entry: IShoppingEntry): Promise<void>` metoden `~\src\views\ShoppingCart.vue`. 


## 8) Gjør appen fin :-) 