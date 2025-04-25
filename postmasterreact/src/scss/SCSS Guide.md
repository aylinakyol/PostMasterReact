# Index

* [CSS Property Rules](#css-property-rules)

    * [All CSS Properties and Abbreviations](#all-css-properties-and-abbreviations)

        * [Display Related](#display-related)

        * [Height Padding Related](#height-padding-related)

        * [Background Related](#background-related)

        * [Text Related](#text-related)

        * [Border Related](#border-related)

* [CSS Values Rules](#css-values-rules)

    * [All CSS Values and Abbreviations](#all-css-values-and-abbreviations)

* [CSS Actions Rules](#css-actions-rules)

    * [All CSS Actions and Abbreviations](#all-css-actions-and-abbreviations)

* [CSS Number Value Rules](#css-number-value-rules)

    * [Example CSS Number Values and Abbreviations](#example-css-number-values-and-abbreviations)

* [CSS Unit Rules](#css-unit-rules)

    * [All CSS Units and Abbreviations](#all-css-units-and-abbreviations)

* [CSS Property'leri, Value'ları Action'ları, Unit'leri ve Number Value'ları Birleştirme Kuralları](#css-propertyleri-valueları-actionları-unitleri-ve-number-valueları-birleştirme-kuralları)


# CSS Property Rules

Should represent by 2 or 4 letters,

4 Letters ones only for words seperated with "-" sign (like flex-direction), first 2 letters will taken from first part and other 2 letters will taken from second part. (fxdr)

Exception for z-index which is first part is only 1 letter.

## All CSS Properties and Abbreviations

Not: Orders are important.

### Display Related

`display: dp`

`flex-direction: fxdr`

`justify-content: jscn`

`align-items: alit`

`flex-wrap: fxwr`

`flex-grow: fxgr`

`gap: gp`

`row-gap: rwgp`

`column-gap: cogp`

### Height Padding Related

`height: hg`

`width: wd`

`max-width: mxwd`

`min-height: mnhg`

`min-width: mnwd`

`padding: pd`

`padding-top: pdtp`

`padding-right: pdrt`

`padding-bottom: pdbt`

`padding-left: pdlt`

`margin: mr`

`margin-bottom: mrbt`

`box-sizing: bxsz`

`overflow: ov`

`position: ps`

`z-index: zix`

`top: tp`

`left: lt`

`right: rt`

### Background Related

`fill: fl`

`background-color: bgcl`

`background-image: bgim`

`opacity: op`

### Text Related

`color: cl`

`font-size: fosz`

`line-height: lnhg`

`font-family: fofa`

`font-weight: fowe`

`text-decoration: txdc`

`word-wrap: wowr`

`text-align: txal`

### Border Related

`box-shadow: bxsd`

`border: br` // Bunu olabildiğince kullanmayacağız.

`border-width: brwd`

`border-style: brst`

`border-color: brcl`

`border-radius: brrd`

`outline: ou`

`cursor: cr`

# CSS Values Rules

CSS Values'ların kısaltması, CSS Property'deki kelimeyle bire bir aynı kelime olmadığı sürece (left, right gibi) CSS Property ya da CSS Unit Rules için belirlenen bir kısaltmayla aynı olamaz.

Should represent by 2 or 4 letters,

4 Letters ones only for words seperated with "-" sign (like space-around), first 2 letters will taken from first part and other 2 letters will taken from second part. (spar)

Exception for z-index which is first part is only 1 letter.

## All CSS Values and Abbreviations

`block: bl`

`none: nn`

`flex: fx`

`column: co`

`row: rw`

`space-around: spar`

`space-between: spbe`

`center: ct`

`flex-start: fxst`

`flex-end: fxen`

`wrap: wr`

`transparent: tr`

`cover: cv`

`underline: un`

`right: rt`

`left: lt`

`solid: sl`

`pointer: pt`

`inherit: in`

# CSS Actions Rules

CSS Actions'ların kısaltması, CSS Property'deki ya da CSS Values'deki bir kelimeyle bire bir aynı kelime olmadığı sürece (left, right gibi) CSS Property, CSS Unit ya da CSS Values için belirlenen bir kısaltmayla aynı olamaz.

Should represent by 2 letters,

## All CSS Actions and Abbreviations

`:hover -> hv`

`:placeholder -> pl`

`:focus -> fc`

# CSS Number Value Rules

Önce rakam sonra varsa araya - koyularak küsürat değeri yazılır.

Örneğin,

## Example CSS Number Values and Abbreviations

`2`

`2-5`

`0-75`

# CSS Unit Rules

## All CSS Units and Abbreviations

`pixel: px`

`rem: rm`

`percent: pc`

`vh: vh`

# CSS Property'leri, Value'ları Action'ları, Unit'leri ve Number Value'ları Birleştirme Kuralları

Öncelikle ilgili CSS Property kısaltması yazılır, araya "-" işareti eklenir, varsa CSS Actions kısaltması yazılır, araya "-" işareti eklenir, varsa CSS Unit cinsi yazılır, araya "-" işareti eklenip en son varsa CSS Unit'in değeri olan rakam (CSS Number) yazılır.

```
<css-property-abbreviation>-<css-value-abbreviation>-<css-action-abbreviation>-<css-unit-abbreviation>-<css-number-values>
```

Örneğin 

`brrd-hv-rm-0-5`

`bgcl-hv-cl-black`

`cl-cl-black`

# CSS Dosyalarını Karşılaştırma

code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/_helpers.scss ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/_helpers.scss
code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/_reset.scss ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/_reset.scss
code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/_template.scss ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/_template.scss
code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/_variables.scss ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/_variables.scss
code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/style.scss ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/style.scss
code -d ~/Projects/Common/CSSBase/ExampleFiles/scss/SCSS\ Guide.md ~/Projects/TrackSpendings/TrackSpendingsReact/trackspendingsreact/src/scss/SCSS\ Guide.md