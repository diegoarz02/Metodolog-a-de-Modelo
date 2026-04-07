// Base de datos de nuestros Nodos Metodológicos
const nodeData = {
    1: { 
        title: "Fase 1: Comprensión del Problema", 
        obj: "Entender la necesidad real. ¿Qué estamos intentando predecir, clasificar o descubrir?", 
        act: "Definir los objetivos del proyecto, métricas de éxito (KPIs) y comprender las limitaciones." 
    },
    2: { 
        title: "Fase 2: Comprensión de los Datos", 
        obj: "Adquirir los datos y familiarizarse fuertemente con ellos.", 
        act: "Extraer datos (Bases de datos, CSV, APIs) y realizar un Análisis Exploratorio (EDA) para identificar patrones y calidad inicial de la información." 
    },
    3: { 
        title: "Fase 3: Preparación de y Limpieza", 
        obj: "Obtener el dataset final curado. Esta es la fase que más tiempo tomará del proyecto entero.", 
        act: "Limpieza (imputación de valores nulos o vacíos, manejo de outliers), transformación, normalización, Feature Engineering y separación de datos de Train/Test." 
    },
    4: { 
        title: "Fase 4: Modelado", 
        obj: "Entrenar algoritmos de Machine Learning y Data Mining sobre datos procesados.", 
        act: "Crear un modelo baseline. Probar algoritmos más complejos (XGBoost, RandomForest, Redes Neuronales LSTM/CNN) y optimizar hiperparámetros como Learning Rate y Neuronas." 
    },
    5: { 
        title: "Fase 5: Evaluación y Validación", 
        obj: "Calificar el rendimiento en datos no vistos (Test set) asegurando generalización del conocimiento de la IA.", 
        act: "Evaluación de métricas técnicas (Accuracy, Precisión, Recall, MAE, MSE, Curva ROC). Detectar y evitar Overfitting y Underfitting." 
    },
    6: { 
        title: "Fase 6: Despliegue en Producción", 
        obj: "Hacer que el modelo sea útil en el entorno real y aplicable a los objetivos de negocio.", 
        act: "Empaquetar el modelo guardándolo en `.pkl` o `.onnx`, desarrollar una API REST mediante FastAPI o Flask y opcionalmente crear contenedores en Docker." 
    },
    7: { 
        title: "Fase 7: Monitoreo Continuo", 
        obj: "Prevenir que el modelo se degrade por cambios en las variables mundiales con el paso del tiempo.", 
        act: "Vigilar problemas de distribución de la data (Data Drift / Concept Drift). Re-entrenar periódicamente volviendo a la Fase 1 o 2 iterando." 
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Referencias al Modal interactivo
    const modal = document.getElementById("info-modal");
    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("close-modal");

    const tTitle = document.getElementById("modal-title");
    const tObj = document.getElementById("modal-obj");
    const tAct = document.getElementById("modal-act");

    // Función para abrir la ventana con un "Boom" interactivo
    const openModal = (step) => {
        const data = nodeData[step];
        tTitle.textContent = data.title;
        tObj.textContent = data.obj;
        tAct.textContent = data.act;
        modal.classList.add("active");
        overlay.classList.add("active");
    };

    const closeModal = () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Eventos Click en los "Planetas" o Nodos del mapa mental
    const nodes = document.querySelectorAll(".map-node");
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const step = node.getAttribute("data-step");
            openModal(step);
        });
    });

    // Lógica para Dibuhar Líneas Inteligentes entre nodos con conectores SVG
    const svg = document.getElementById("connection-lines");
    const container = document.getElementById("map-container");
    const hub = document.querySelector(".center-hub");

    const drawLines = () => {
        if(!svg || !container || !hub) return;
        
        // Ajustar tamaño del Canvas SVG al contenedor actual
        svg.setAttribute("width", container.offsetWidth);
        svg.setAttribute("height", container.offsetHeight);
        
        // Limpiar trazos viejos
        svg.innerHTML = '';

        // Obtenemos centros dinámicos considerando la pantalla
        const getCenter = (el) => {
            const rect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return {
                x: (rect.left - containerRect.left) + rect.width / 2,
                y: (rect.top - containerRect.top) + rect.height / 2
            };
        };

        const hubCenter = getCenter(hub);
        const nodeElements = Array.from(document.querySelectorAll('.map-node'));

        // Dibujar ciclo exterior y líneas magnéticas al centro
        nodeElements.forEach((node, index) => {
            const center = getCenter(node);
            
            // 1. Línea apuntando al centro
            const lineToCenter = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineToCenter.setAttribute('x1', hubCenter.x);
            lineToCenter.setAttribute('y1', hubCenter.y);
            lineToCenter.setAttribute('x2', center.x);
            lineToCenter.setAttribute('y2', center.y);
            lineToCenter.classList.add('hub-line');
            svg.appendChild(lineToCenter);

            // 2. Línea apuntando al SIGUIENTE nodo (Formando un ciclo metodológico continuo)
            const nextNode = nodeElements[(index + 1) % nodeElements.length];
            const nextCenter = getCenter(nextNode);
            
            const cycleLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            cycleLine.setAttribute('x1', center.x);
            cycleLine.setAttribute('y1', center.y);
            cycleLine.setAttribute('x2', nextCenter.x);
            cycleLine.setAttribute('y2', nextCenter.y);
            cycleLine.classList.add('cycle-line');
            
            svg.appendChild(cycleLine);
        });
    };

    // Dibujar cuando la web cargue y actualizar siempre que la pantalla cambie de tamaño
    drawLines();
    window.addEventListener('resize', drawLines);
});
