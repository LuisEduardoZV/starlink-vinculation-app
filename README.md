# Starlink Vinculation App

Starlink Vinculation App es una aplicación para Super Usuarios y Usuarios Administradores donde se podrá tener una colección de clientes, a los cuales les podremos crear usuarios y vincular antenas (en este caso antenas Starlink). También se podrán ver reportes de consumo de datos de cualquier antena seleccionada.

Esta aplicación está pensada para empresas que renten equipos o antenas y necesiten una administracion de los clientes así como de los equipos.

## Tabla de Contenidos

- [Pre-requisitos](#pre-requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración-)
- [Despliegue](#despliegue-)
- [Dependencias](#dependencias-)
- [Autores](#autores-)

## Pre-requisitos📋

Para el funcionamiento del proyecto es necesario tener instalado Node.js, por favor siga la guía de instalación de su página oficial en caso de no tenerlo instalado:

[Como instalar Node.js][1]
[Link directo de descarga][2]

## Instalación🔧

1. Descargue el código fuente
   ```bash
   $ git clone https://github.com/LuisEduardoZV/starlink-vinculation-app
   ```
1. Dirigase a la carpeta raíz
   ```bash
    $ cd starlink-vinculation-app/
   ```
1. Instalar dependencias 
   ```bash
    $ npm install
   ```
1. Ejecutar
    ```bash
    $ npm run dev
    ```

## Configuración ⚙

El proyecto cuenta con un archivo de configuración *[config.js](doc:config.js)* en donde podrá cambiar la path base del proyecto, así como link principal para las consultas a nuestra API.

Dentro del archivo se tiene el siguiente objeto el cual le ayudará a personalizar un poco la página a su gusto: 

```json
    {
        fontFamily: "'Roboto', sans-serif",
        borderRadius: 8,
        outlinedFilled: true,
        navType: 'light' // o dark
    }
```

Para por visulizar las ventanas con mapa, es necesario que coloque su llave personal de Google Maps en la variable *GOOGLE_MAP_KEY*

## Despliegue 📦

Para desplegar como una página estática, ejecute:

1. 
   ```bash
   $ npm run build
   ```
1. Terminado el proceso, podrá encontrar los archivos resultantes en la carpeta */dist*
   ```bash
    $ cd dist/
   ```

## Dependencias 🛠

* [React.js](https://react.dev/reference/react) - Framework web usado
* [Mui - Material UI](https://mui.com/material-ui/getting-started/) - Componentes de React utlizando Material Design de Google
* [Redux](https://redux.js.org/) - Manejador de estados
* [React Router](https://reactrouter.com/en/main) - Enrutamiento del lado del cliente

## Autores ✒

* **Belén Gudiño** - *Back-End*


[1]: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs  "Como instalar Node.js"
[2]: https://nodejs.org/en/download  "Link directo de descarga"
