const nodeData = {
    1: { title: "Fase 1: Comprensión del Negocio", obj: "Entender la necesidad real corporativa. ¿Qué estamos intentando predecir o clasificar?", act: "Definir objetivos de proyecto, métricas de éxito del caso de uso (KPIs) y comprender las limitaciones." },
    2: { title: "Fase 2: Comprensión de los Datos", obj: "Adquirir los datos y familiarizarse fuertemente con ellos desde la base.", act: "Extracción (DB, CSV, APIs) y realización de un Análisis Exploratorio (EDA) para identificar calidad." },
    3: { title: "Fase 3: Preparación de Datos", obj: "Obtener el dataset final curado. Esta es la fase principal.", act: "Limpieza (imputación de nulos, outliers), normalización, Feature Engineering y separación Train/Test." },
    4: { title: "Fase 4: Modelado", obj: "Entrenar algoritmos de IA y/o Data Mining.", act: "Crear un baseline, para luego probar e iterar algoritmos avanzados optimizando sus hiperparámetros." },
    5: { title: "Fase 5: Evaluación", obj: "Calificar el desempeño del modelo para asegurar generalización y evitar sobreajustes.", act: "Evaluación de métricas (Accuracy, Recall, MSE, Función de pérdida, Curvas de Error). Revisión con Negocio." },
    6: { title: "Fase 6: Despliegue (Deployment)", obj: "Hacer que el modelo preste servicio real al usuario final.", act: "Empaquetar modelo (.pkl. h5) y desarrollar API REST (FastAPI) para consumir las predicciones." },
    7: { title: "Fase 7: Monitoreo", obj: "Vigilar y conservar el modelo a lo largo de su vida útil operativa.", act: "Monitoreo continuo de Concept/Data Drift. Retornar hacia fases pasadas si requiere iteración." }
};

document.addEventListener("DOMContentLoaded", () => {
    // Interfaz Modal
    const modal = document.getElementById("info-modal");
    const overlay = document.getElementById("modal-overlay");
    const closeBtn = document.getElementById("close-modal");

    const tTitle = document.getElementById("modal-title");
    const tObj = document.getElementById("modal-obj");
    const tAct = document.getElementById("modal-act");

    const openModal = (step) => {
        const data = nodeData[step];
        tTitle.textContent = data.title;
        tObj.textContent = data.obj;
        tAct.textContent = data.act;
        // Asignar color dinámico al titulo del modal
        const matchingNode = document.querySelector(`.crisp-node[data-step="${step}"] .ring`);
        if(matchingNode) {
            tTitle.style.color = getComputedStyle(matchingNode).getPropertyValue('--color').trim();
        }
        
        modal.classList.add("active");
        overlay.classList.add("active");
    };

    const closeModal = () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
    };

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);

    // Click Events Nodes
    const nodes = document.querySelectorAll(".crisp-node");
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const step = node.getAttribute("data-step");
            openModal(step);
        });
    });

    // Lógica para Dibujar Flechas de Flujo (Curvas de Bezier)
    const svg = document.getElementById("crisp-arrows");
    const container = document.getElementById("nodes-container");

    const drawLines = () => {
        if(!svg || !container) return;
        svg.setAttribute("width", container.offsetWidth);
        svg.setAttribute("height", container.offsetHeight);
        
        // Mantener <defs> pero limpiar previas rutas (paths)
        const defs = svg.querySelector('defs').outerHTML;
        svg.innerHTML = defs;

        const getCenter = (el) => {
            const rect = el.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            return {
                x: (rect.left - containerRect.left) + rect.width / 2,
                y: (rect.top - containerRect.top) + rect.height / 2
            };
        };

        const nodeElements = Array.from(document.querySelectorAll('.crisp-node'));

        nodeElements.forEach((node, index) => {
            const center = getCenter(node);
            const nextNode = nodeElements[(index + 1) % nodeElements.length];
            const nextCenter = getCenter(nextNode);
            
            // Calculo para que las flechas salgan con una curva externa para orbitar "DATOS"
            const dx = nextCenter.x - center.x;
            const dy = nextCenter.y - center.y;
            
            const cx = container.offsetWidth / 2;
            const cy = container.offsetHeight / 2;
            
            const midX = center.x + dx / 2;
            const midY = center.y + dy / 2;
            
            const vecX = midX - cx;
            const vecY = midY - cy;
            
            const len = Math.sqrt(vecX*vecX + vecY*vecY);
            
            // "Arco" hacia afuera de la curva (Curva Bezier)
            const bow = 70; // Intensidad de la curva de la flecha
            const controlX = midX + (vecX/len) * bow;
            const controlY = midY + (vecY/len) * bow;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${center.x} ${center.y} Q ${controlX} ${controlY} ${nextCenter.x} ${nextCenter.y}`;
            
            path.setAttribute('d', d);
            
            // Setear currentColor desde la variable CSS para que el marcador flecha herede el color
            const ring = node.querySelector('.ring');
            const color = getComputedStyle(ring).getPropertyValue('--color').trim();
            if (color) {
                path.style.stroke = color;
                path.style.color = color;
            }
            
            path.setAttribute('marker-end', 'url(#arrow)');
            path.classList.add('conn-line');
            
            svg.appendChild(path);
        });
    };

    drawLines();
    window.addEventListener('resize', drawLines);
});
