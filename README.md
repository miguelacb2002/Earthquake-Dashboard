# Earthquake Dashboard

Es una aplicación web desarrollada en **Angular** con la finalidad de visualizar información geográfica de terremotos mediante un dashboard interactivo que incluye un modelo de predicción.

## Tecnologías utilizadas
* **Angular 19.0.1** (Standalone)
* **TypeScript**
* **RxJS**
* **Google Maps**
* **ApexCharts**
* **Tailwind CSS**
* **Toastr**

## Cómo ejecutar el proyecto
1. `git clone https://github.com/miguelacb2002/Earthquake-Dashboard.git`
2. `cd earthquake-info`
3. `npm install`
4. `ng serve`

## Arquitectura modular basada en funcionalidades

* **Core:** Contiene elementos globales, tipos (`models`), interacción con APIs, lógica central (`services`) y gestión de estado (`state`).
* **Features:** Contiene las funcionalidades y componentes principales de la aplicación.
* **Layout:** Contiene la vista principal de la aplicación (`dashboard`).

## Decisiones técnicas
* **Uso de RxJS como Store:** Se manejó la gestión de estado a través de RxJS para la comunicación e interacción entre componentes, logrando una separación clara entre el estado y la UI, además de centralizar la lógica de predicción.
* **Componentes Standalone:** Se implementaron como una práctica moderna para facilitar la configuración de los módulos del proyecto y mejorar la mantenibilidad.

## Posibles mejoras
* **Modelo de predicción:** El modelo actual es básico; se puede sustituir por uno más robusto de Machine Learning.
* **UI/UX:** Implementar animaciones y transiciones personalizadas en los filtros, además de mejorar la visualización en los mapas.
* **Seguridad:** Por fines prácticos, la API Key de Maps es temporal y accesible al clonar el repositorio. Para futuras versiones, se deben utilizar archivos de entorno (`environment`) y restringir las credenciales.
* **Diseño Responsivo:** Ajustar la aplicación para que sea completamente funcional en dispositivos móviles.