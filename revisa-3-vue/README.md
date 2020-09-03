# revisa3-vuetify

## Sobre o projeto
```
O projeto está todo compartimentalizado e cada pasta contém seus respectivos e corretos tipos de arquivos. O código está sendo regido pelo eslint para garantir normas de Clean Code.

A estrutura é a seguinte:
src >> 
    assets + components + pages + plugins + routes + sass + main.js

    assets >>
        icon + ilustrativo + img 
        icon >> contém apenas ícones da interface
        ilustrativo >> contém ilustrações
        img >> imagens gerais

    components >> contém elementos da interface que são utilizados em diversas páginas 

    pages >> contém páginas da aplicação que podem fazer uso dos componentes, mas não se limitam somente a eles

    plugins >> vuetify e plugins adicionais
        vuetify.js >> estilização dos temas do vuetify

    routes >> contém o router.js e controla toda a navegação dentro da aplicação

    sass >> todos os styles da aplicação e usa apenas scss 
        custom.scss >> classes customizadas e atômicas
        main.scss >> classes de componentes principais
        variables.scss >> todas as variáveis do sistema

    main.js >> importa e exporta novas instâncias das views e novos componentes
        
```

## Nunca mudar o arquivo .eslintrc.json
```
As regras de codificação estão sendo implementadas por ele para garantir a manutenção do código
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
