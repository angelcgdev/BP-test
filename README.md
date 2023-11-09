# BP Test

## Requerimientos
- Android studio
- variable de entorno ANDROID HOME o configurar el archivo local.properties con la ruta al sdk (sdk.dir)
- XCode (for ios)
- emulador configurado o un dispositivo con depuración USB habilitada

## Paso 1: Descarga los complementos

Antes de ejecutar la app se deben instalar las dependencias de terceros.
```bash
# using npm
npm i
```

## Paso 2: Iniciar la app

ubicate en la raiz del proyecto y ejecuta lo siguientes comandos.

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

## Tests

ubicate en la raiz del proyecto y ejecuta lo siguientes comandos.

```bash
# using npm
npm run test
```