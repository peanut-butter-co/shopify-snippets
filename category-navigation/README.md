## Descripción
Este componente de navegación de categorías utiliza un menú de navegación de Shopify para determinar la jerarquía de las categorías de la tienda. Muestra dinámicamente las subcategorías de la categoría actual, o las categorías hermanas cuando la categoría actual no tiene subcategorías.

## Funcionalidad
- **Navegación jerárquica**: Soporta hasta 4 niveles de profundidad en la estructura del menú
- **Subcategorías**: Muestra automáticamente las subcategorías de la categoría actual
- **Categorías hermanas**: Opcionalmente muestra categorías del mismo nivel cuando la categoría actual no tiene subcategorías
- **Enlace "Ver todo"**: Incluye un enlace a la categoría padre que puede posicionarse al inicio o al final de la lista
- **Imágenes**: Muestra imágenes de las colecciones o productos destacados de cada categoría

## Instalación

### 1. Copiar archivos al theme
Copia los siguientes archivos a tu theme de Shopify:

- `sections/category-navigation.liquid` → `sections/category-navigation.liquid`
- `snippets/category-navigation.liquid` → `snippets/category-navigation.liquid`
- `snippets/category-navigation-items.liquid` → `snippets/category-navigation-items.liquid`
- `locales/en.default.json` → `locales/en.default.json` (o fusiona con tu archivo existente)
- `locales/es.json` → `locales/es.json` (o fusiona con tu archivo existente)

### 2. Configurar el menú en Shopify
1. Ve a **Online Store > Navigation > Menus** en el admin de Shopify
2. Crea o selecciona un menú que represente la jerarquía de tus categorías
3. Estructura el menú con hasta 4 niveles de profundidad:
   - Nivel 1: Categorías principales
   - Nivel 2: Subcategorías
   - Nivel 3: Sub-subcategorías
   - Nivel 4: Sub-sub-subcategorías

### 3. Agregar la sección al theme
1. En el editor de temas de Shopify, ve a una página de colección (template `collection`)
2. Haz clic en **Add section** y busca **Category navigation**
3. Selecciona el menú que configuraste en el paso anterior
4. Ajusta las configuraciones según tus necesidades

**Nota importante**: Esta sección está configurada para estar disponible únicamente en templates de tipo `collection`. Si necesitas usarla en otros templates, puedes modificar o eliminar la configuración `enabled_on` en el archivo `sections/category-navigation.liquid`.

## Configuración

### Settings disponibles:
- **Menu**: El menú de navegación que define la jerarquía de categorías
- **"View all" position**: Posición del enlace "Ver todo" (First/Last)
- **Hide view all**: Oculta el enlace "Ver todo"
- **View all image**: Imagen personalizada para el enlace "Ver todo"
- **Show sibling categories**: Cuando está activado, muestra categorías del mismo nivel si la categoría actual no tiene subcategorías

## Personalización

El componente incluye estilos CSS integrados que puedes personalizar editando el bloque `{% stylesheet %}` en el archivo `snippets/category-navigation-items.liquid`.

### Clases CSS principales:
- `.c-category-nav__list`: Contenedor principal de la lista
- `.c-category-nav__item`: Cada elemento de categoría
- `.c-category-nav__link`: Enlace de cada categoría
- `.c-category-nav__image-wrapper`: Contenedor de la imagen
- `.c-category-nav__title`: Título de la categoría
- `.c-category-nav__link--active`: Estado activo del enlace

## Notas
- El componente detecta automáticamente la categoría actual basándose en la URL activa
- Las imágenes se obtienen de la imagen destacada de la colección o del primer producto con imagen
- El componente es completamente responsive y soporta preferencias de movimiento reducido