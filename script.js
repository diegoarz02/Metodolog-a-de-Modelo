document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".timeline-step");

    // Lógica para que se expandan las fases de la metodología al hacer clic
    steps.forEach(step => {
        step.addEventListener("click", () => {
             // Cerrar las otras fases
             steps.forEach(s => {
                 if (s !== step) s.classList.remove('active');
             });
             // Intercambiar estado de fase actual
             step.classList.toggle('active');

             // Pequeño extra: Hacer un scroll suave a la fase que se acaba de abrir
             if (step.classList.contains('active')) {
                 setTimeout(() => {
                     step.scrollIntoView({
                         behavior: "smooth",
                         block: "center"
                     });
                 }, 300); // Dar tiempor a la expansión del CSS
             }
        });
    });
    
    // Autoabrir la primera fase para mostrarle al usuario que es interactivo
    if(steps.length > 0) {
        steps[0].classList.add('active');
    }
});
