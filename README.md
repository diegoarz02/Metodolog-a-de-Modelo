# Metodología de Modelos en Machine Learning y Data Mining

**Grupo 2**

**Integrantes:**
- Araujo Diego 
- Berrospi Nicolle
- Jimenez Andres
- Grados Parrish 
- Castro Jair 
- Torres Matias 

---

## 1. ¿Qué es una Metodología de Modelo?

En el contexto de Machine Learning (ML) y Data Mining, una metodología de modelo es un marco de trabajo estructurado que define, paso a paso, cómo abordar un problema analítico desde su concepción hasta su despliegue y mantenimiento. 

Su propósito principal es brindar un orden, reducir la incertidumbre, facilitar el trabajo en equipo y asegurar que los modelos desarrollados aporten valor real y medible para resolver un problema específico. Una de las metodologías más conocidas en la industria de la cual nos podemos guiar es CRISP-DM (Cross-Industry Standard Process for Data Mining), adaptándola a un ciclo de vida moderno de MLOps.

## 2. Fases de la Metodología (Ciclo de Vida)

Para trabajar de manera eficiente, estructuraremos nuestros proyectos analíticos en las siguientes **7 fases iterativas**. Entendiendo que si hay un error en las etapas finales, es completamente normal retroceder a modificar etapas tempranas (es un proceso iterativo, no lineal).

### Fase 1: Comprensión del Problema (Business Understanding)
- **Objetivo:** Entender la necesidad real. ¿Qué estamos intentando predecir, clasificar o descubrir?
- **Acciones:** Definir los objetivos del proyecto, establecer métricas de éxito (KPIs) y comprender las limitaciones (costo computacional, recursos, ética de los datos).

### Fase 2: Comprensión de los Datos (Data Understanding)
- **Objetivo:** Adquirir los datos y familiarizarse fuertemente con ellos.
- **Acciones:** Extraer datos de las fuentes disponibles (bases de datos relacionales, archivos CSV, APIs), y realizar un Análisis Exploratorio de Datos (EDA) inicial para identificar patrones, distribuciones, relaciones lógicas y problemas de calidad.

### Fase 3: Preparación de y Limpieza de los Datos (Data Preparation)
- **Objetivo:** Obtener el dataset final curado y listo para que un algoritmo pueda interpretarlo. *Suele ser la fase que requiere más tiempo e iteraciones.*
- **Acciones:** 
  - Limpieza (imputación de valores nulos o vacíos, manejo de *outliers* o valores atípicos).
  - Transformación (normalización, estandarización, codificación de variables categóricas One-Hot o Label Encoding).
  - *Feature Engineering* (creación de nuevas variables predictivas a partir de las existentes).
  - División apropiada de los datos (Train, Validation y Test sets).

### Fase 4: Modelado (Modeling)
- **Objetivo:** Seleccionar y entrenar algoritmos de Machine Learning y Data Mining sobre los datos preparados.
- **Acciones:**
  - Diseñar una línea base (*baseline model*), es decir, un modelo simple sin optimizar para tener una referencia.
  - Seleccionar diversas técnicas candidatas (Ej: Regresión Logística, Random Forest, Redes Neuronales, SVM, XGBoost).
  - Entrenar los modelos.
  - Optimización de hiperparámetros (Grid Search, Random Search).

### Fase 5: Evaluación y Validación (Evaluation)
- **Objetivo:** Calificar rigurosamente el rendimiento del modelo en datos "no vistos" (Test set).
- **Acciones:** Evaluar según métricas técnicas y de negocio (Accuracy, Precision, Recall, F1-Score, Curva ROC, MSE). Es crucial asegurar que el modelo sea generalizable, es decir, que no sufra de *Overfitting* (sobreajuste a los datos de entrenamiento) ni *Underfitting* (falta de aprendizaje).

### Fase 6: Despliegue en Producción (Deployment)
- **Objetivo:** Hacer que el modelo sea útil para los usuarios finales o aplicaciones.
- **Acciones:** Empaquetar el modelo (por ejemplo en formatos como `.pkl` o `.h5`), contenedorizarlo si es necesario (Docker) y exponerlo mediante una API (FastAPI, Flask) o integrarlo a un flujo analítico batch.

### Fase 7: Monitoreo y Mantenimiento (Monitoring)
- **Objetivo:** Asegurar que las predicciones sigan siendo confiables en el tiempo, ya que los recabados cambian (los modelos "envejecen").
- **Acciones:** Vigilar que las distribuciones de los nuevos datos no caigan significativamente (*Data Drift*) y que la relación subyacente entre las variables predictivas y el target original se mantenga (*Concept Drift*). Reentrenar periódicamente iterando hacia la *Fase 1 o 2*.

---

## 3. ¿Cómo lo Trabajaremos como Equipo?

Desarrollar modelos no se trata solo del algoritmo, sino de trabajar cordialmente como equipo de desarrollo. Para organizarnos (Grupo 2), aplicaremos estas pautas:

1. **Control de Versiones (Git/GitHub):** Este repositorio será nuestra única "fuente de la verdad". Se mantendrá una rama `main` libre de errores. Crearemos ramas adicionales por integrante para experimentar tranquilamente antes de unificar el código (*Pull Requests*).
2. **Entornos Virtuales:** Para no generar conflictos de herramientas (versiones de Python, librerías como Pandas, Scikit-Learn o TensorFlow), se generará y respetará un archivo `requirements.txt`.
3. **Comunicación Activa:** Compartir rápidamente los hallazgos en la parte del *Análisis Exploratorio y Limpieza*, ya que influyen enormemente en qué modelos seleccionaremos después.
4. **Comentarios y Orden:** Todo Notebook (`.ipynb`) utilizado para prototipar debe tener celdas de Markdown documentando el "porqué" de las decisiones, no solo celdas de código.
