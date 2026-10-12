# Portafolio Personal

Aplicación de portafolio personal construida con React, Vite y Tailwind CSS. Esta aplicación muestra proyectos, habilidades y experiencia profesional en un formato moderno y responsive.

## Características

- Desarrollo con React 19 y TypeScript
- Estilos con Tailwind CSS v4
- Navegación por hash para vistas de proyecto
- Sistema de internacionalización (i18n)
- Carga progresiva con loader animado
- Diseño responsive
- Integración con Figma Make

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── sections/   # Secciones principales de la página
│   └── ui/         # Componentes de interfaz de usuario
├── hooks/          # Hooks personalizados
├── i18n/           # Internacionalización
├── layouts/        # Diseños de página
├── pages/          # Páginas específicas
└── utils/          # Funciones auxiliares
```

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de estilos utilitarios
- **TypeScript**: Lenguaje de programación tipado
- **Figma Make**: Integración con la plataforma Figma Make

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la aplicación construida
- `npm run format` - Formatea el código con oxfmt

## Configuración del Entorno

1. Asegúrate de tener Node.js instalado (versión recomendada en .mise.toml)
2. Instala las dependencias: `npm install`
3. Inicia el servidor de desarrollo: `npm run dev`

## Despliegue

La aplicación está configurada para ejecutarse dentro de Figma Make, pero también puede ser desplegada como una aplicación web standalone.

## Autor

Desarrollado por Lira Acedo Gijon

## Licencia

Este proyecto es de código abierto y se encuentra bajo la licencia MIT.
