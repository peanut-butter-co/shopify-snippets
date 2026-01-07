## Descripción
`product-badges.liquid` es un snippet que muestra **insignias de producto personalizadas** (por ejemplo, “BEST SELLER”, “EXCLUSIVO ONLINE”) en la tarjeta o página de producto, usando un metaobject para definir el texto y los colores de cada insignia.

Las insignias:
- Se obtienen desde un metafield de producto de tipo **lista de metaobjects**.
- Usan los campos del metaobject **Product badges** para definir texto, color de fondo, color de borde y color de texto.
- Respetan una jerarquía numérica para decidir el orden/prioridad.
- Siguen mostrando la insignia de **“Sold out”** con máxima prioridad si el producto no está disponible.

## Cómo usarlo
- **1. Copiar el snippet en tu tema de Shopify**
  - Copia el archivo `snippets/product-badges.liquid` de este repositorio dentro de la carpeta `snippets` de tu tema de Shopify.

- **2. Copiar la configuración de badges (opcional)**
  - Si quieres usar las mismas claves de traducción/configuración que este snippet espera, copia el contenido de `config/settings_schema.json` de este repo y fusiónalo con el `settings_schema.json` de tu tema (o añade el bloque `badges` equivalente).

- **3. Crear el metaobject “Product badges”**
  - Ve a **Configuración → Metafields y metaobjects → Metaobjects**.
  - Crea una nueva definición de metaobject llamada, por ejemplo, **Product badges** con **handle** `product_badges`.
  - Añade los siguientes campos (keys según las capturas que compartiste):
    - **Text** (`text`) – tipo: *Single line text* (texto que verá el usuario en la insignia).
    - **Background** (`background`) – tipo: *Color* (color de fondo de la insignia).
    - **Border color** (`border_color`) – tipo: *Color* (color del borde de la insignia).
    - **Text color** (`text_color`) – tipo: *Color* (color del texto de la insignia).
    - **Jerarquía** (`jerarquia`) – tipo: *Integer* (número para ordenar/priorizar las insignias; menor número = mayor prioridad).
  - Crea las entradas que necesites (por ejemplo “BEST SELLER”, “EXCLUSIVO ONLINE”) rellenando sus colores y jerarquía.

- **4. Crear el metafield de producto que apunta al metaobject**
  - Ve a **Configuración → Metafields y metaobjects → Metafields → Products**.
  - Crea un nuevo metafield llamado, por ejemplo, **Etiquetas de producto** con namespace y key: `custom.product_badges`.
  - Tipo: **List → Metaobject → Product badges** (lista de entradas del metaobject `product_badges`).
  - En cada producto, selecciona en **Product metafields → Etiquetas de producto** las insignias (entradas del metaobject) que quieras mostrar.

- **5. Renderizar el snippet en la plantilla de producto o tarjeta de producto**
  - En el archivo de plantilla o snippet donde se pintan las tarjetas/productos (por ejemplo `main-product.liquid`, `product-card.liquid` o similar), incluye:

```liquid
{% render 'product-badges', product: product %}
```

  - Asegúrate de llamarlo dentro del contexto donde exista el objeto `product`.

- **6. Configuración de comportamiento en el tema**
  - El snippet respeta estas configuraciones en `settings` del tema (ajusta los nombres según tu tema):
    - `settings.card_show_sold_out_badge`: si es verdadero, muestra la insignia “Sold out” cuando el producto no está disponible.
    - `settings.card_show_label`: si es verdadero, intenta mostrar las insignias personalizadas del metafield `custom.product_badges`.
  - Puedes exponer estos ajustes en el `settings_schema.json` de tu tema si aún no existen.

## Campos usados
- **Metafield de producto**: `product.metafields.custom.product_badges`
  - Tipo: lista de metaobjects `product_badges`.
- **Metaobject `Product badges`**:
  - `text` – texto de la etiqueta.
  - `background` – color de fondo.
  - `border_color` – color del borde.
  - `text_color` – color del texto.
  - `jerarquia` – entero para ordenar/filtrar por prioridad.

Con estos pasos, el snippet `product-badges.liquid` quedará listo para usarse en cualquier tema copiando/pegando los archivos de este repositorio y configurando los metafields/metaobjects indicados.