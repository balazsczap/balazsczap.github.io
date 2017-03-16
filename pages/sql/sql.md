# SQL gyorstalpaló

## Használat

A kulcsszavaknál fel van sorolva minden amit érdemes tudni.
Ha részletezve vagy rá kiváncsi, rákeresel, és elolvasod a részletes leírást :D.

# Kulcsszavak

```sql
SELECT: Vetítés, oszlopok kiválasztása
AS: El/átnevezés
FROM: Tábla kiválasztása
WHERE: Szűrés, sorok szűrése egy bizonyos szempont szerint
ORDER BY: Rendezés, valamilyen oszlop szerint
INNER JOIN: Illesztés, két tábla sorainak illesztése közös érték szerint
AVG(), MIN(), MAX(), SUM(), COUNT(): Oszlopfüggvények, a tábla sorainak összevonása egy sorrá, valamilyen műveletet végezve közben
GROUP BY: Csoportosítás, oszlopfüggvény használatakor valamilyen oszlop szerint csoportokba szedhetjük a sorokat, és ezekre a csoportokra futtatjuk az oszlopfüggvényt
HAVING: Oszlopfüggvény szűrése: oszlopfüggvény használatakor a kapott értéket szűrhetjük
```
___

A feladat során használt táblák:

Ember:

| ID     | Név           | Kor      |
| ------ |:-------------:| -----:   |
| 0      | Kiss János    | 29       |
| 1      | Bakó Ernő     | 25       |
| 2      | Nagy Zoltán   | 17       |

Macska:

| ID     | Név           | Kor      | GazdaID |
| ------ |:-------------:| --------:|:-------:|
| 0      | Cirmi         | 2        |0        |
| 1      | Pötyi         | 5        |1        |
| 2      | Folti         | 3        |1        |
| 2      | Karom         | 10       |2        |

A macska táblában tehát idegen kulcs az GazdaID oszlop.

# Lekérdezések

## Vetítés:
```sql
SELECT <oszlopnevek>
FROM <tábla>
```
= "Válaszd ki az `<oszlopnevek>`-et a `<tábla>`-ból"
Fogja a táblát, és azokat az oszlopokat visszaadja, amiket megadtál.

Pl: visszaadja az összes ember nevét és korát.
```sql
SELECT Név, Kor
FROM Ember
```

Speciális eset: a tábla összes oszlopának lekérdezése
```sql
SELECT *
FROM <tábla>
```

## Átnevezés:

Az eredménytábla oszlopai szabadon átnevezhetők, illetve a lekérdezésen belüli táblák is, a könnyebb leírhatóság érdekében.

```sql
SELECT <oszlopnév1> <újnév1>, <oszlopnév2> <újnév2> ......
FROM <tábla> AS <rövidítés>
```

Például:

```sql
SELECT ID AS Azonosító, Név
FROM Ember
```


## Szűrés:

```sql
SELECT <oszlopnevek>
FROM <tábla>
WHERE <logikai kifejezés>
```
Csak azokat a sorokat adja vissza eredményként, ahol a logikai kifejezés értéke igaz.

Például a felnőtt emberek kilistázása:
```sql
SELECT Név, Kor
FROM Ember
WHERE Kor >= 18
```

### `<Logikai kifejezés>` lehet:

##### Relációk:
(<, <=, =, <>, >=, >);
```sql
<oszlopnév> >= szám
```

Például a felnőtt emberek kilistázása:
```sql
SELECT Név, Kor
FROM Ember
WHERE Kor >= 18
```

##### Intervallumba tartozás:
```sql
<oszlopnév> BETWEEN ... AND ... (=oszlopnév a két érték közé tartozik)
```

Például a 18 és 25 év közötti emberek kilistázása:
```sql
SELECT Név, Kor
FROM Ember
WHERE Kor BETWEEN 18 AND 25
```

##### Szövegvizsgálat:
```sql
<szöveges oszlop neve> = 'szöveg' (fontos a sima aposztróf (shift+1-el írsz olyat))
```

Például a Kiss János nevű emberek:
```sql
SELECT Név, Kor
FROM Ember
WHERE Kor = 'Kiss János'
```


##### Szövegmintával összevetés:
```sql
<szöveges oszlop neve> LIKE <minta>
```

A minta egy szöveg, kiegészítve % (bármennyi karakter) és _ (egy karakter) jelekkel.

Például a N-vel kezdődő nevű emberek listázása:
```sql
SELECT Név, Kor
FROM Ember
WHERE Kor LIKE 'N%'
```

Létezik ennek a negálása is:

Például azok az emberek, akinek a neve nem N-el kezdődik:

```sql
SELECT Név, Kor
FROM Ember
WHERE Kor NOT LIKE 'N%'
```

## Rendezés:

```sql
SELECT <oszlopnevek>
FROM <tábla>
WHERE <logikai kifejezés>
ORDER BY <oszlopnevek> <sorrend>
```

Sorrend helyére ASC (=növekvő) és DESC (=csökkenő) írható, ha nem írsz oda semmit, ASC az alapértelmezett.
Lehet több oszlop szerint is rendezni.

Például az emberek rendezése Kor szerint növekvő, majd név szerint csökkenő sorrendben:
(Először a legfiatalabbak, fordított névsor szerint)

```sql
SELECT *
FROM Ember
...(mehet ide szűrés)
ORDER BY Kor, Név DESC
```

## Illesztés:

Két vagy több tábla soraiból új sorokat akarunk létrehozni, a sorok bizonyos mezőjének egyezése alapján. (Ez általában az egyik táblában idegen kulcs, a másik táblában kulcs.)

```sql
SELECT <oszlopnevek>
FROM <tábla>
INNER JOIN <másik tábla> ON <tábla>.<oszlop> = <másik tábla>.<oszlop>
... (mehet ide szűrés, rendezés)
```

Például a gazdanevek, és a macskanevek összerendelelése:

```sql
SELECT Gazda.Név AS Gazda, Macska.Név AS Macska (az AS utáni megadott néven fog szerepelni az oszlop az eredménytáblában)
FROM Gazda
INNER JOIN Macska ON Gazda.ID = Macska.GazdaID
```

## Oszlopfüggvények:

Egy tábla egy oszlopán értelmezzük, és egy értékket ad.
Sokféle van, leginkább számot tartalmazó oszlopokra:

* AVG() : az oszlop összes értékének az átlagát veszi
* COUNT() az oszlopban található sorok száma (azaz a tábla sorainak száma)
* FIRST(): az oszlop első értéke
* LAST(): az oszlop utolsó értéke
* MAX(): az oszlop legnagyobb értéke
* MIN(): az oszlop legkisebb értéke
* SUM(): az oszlop értékeinek az összege

Használat:
```sql
SELECT <oszlopfüggvény>(<oszlopnév>)
FROM <tábla>
... (mehet ide illesztés, szűrés, rendezés...)
```

Például a macskák átlagéletkora:

```sql
SELECT AVG(Kor)
FROM Macska
```

### Csoportosítás:

Igény lehet arra, hogy a sorokat valamilyen szempont szerint csoportosítsuk, és ezekre a csoportokra futtassuk le az oszlopfüggvényeket.
Csak oszlopfüggvény használatakor lehet használni:

```sql
SELECT <oszlopfüggvény>(<oszlopnév>)
FROM <tábla>
... (mehet ide illesztés, szűrés, rendezés...)
GROUP BY <oszlopnév>
```

Például, hogy megkapjuk gazdák szerint csoportosítva a macskákik életkorát:

```sql
SELECT AVG(Kor)
FROM Macska
GROUP BY GazdaID
```

(Ez csak a GazdaID szerint csoportosít, itt lehetne illeszteni még a Gazda táblára, hogy a nevüket is megkapjuk.)


#### Oszlopfüggvények szűrése:

Ha oszlopfüggvényt használsz, és csoportosítasz, akkor lehet vagy az oszlopfüggvény, vagy a csoportosítás szerint szűrni:

```sql
SELECT <oszlopfüggvény>(<oszlopnév>)
FROM <tábla>
... (mehet ide illesztés, szűrés, rendezés...)
GROUP BY <oszlopnév>
HAVING <oszlopfüggvény>(<oszlopnév>) <logikai kifejezés>
```

Például gazdák szerint csoportosítva a macskákik átlagéletkora, de csak azokra vagyunk kiváncsiak  ha az átlagéletkoruk nagyobb 3 évnél:

```sql
SELECT AVG(Kor)
FROM Macska
HAVING AVG(Kor) > 3
```
