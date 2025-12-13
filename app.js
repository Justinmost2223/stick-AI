document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN Y SELECTORES ---
    const dataModules = document.querySelectorAll('.data-module, .team-credits'); 
    const joinBtns = document.querySelectorAll('.btn-join');
    
    // El número de teléfono al que se enviará el mensaje (formato internacional sin signos: 34611341009)
    const WHATSAPP_NUMBER = '34611341009'; 


    // --- LÓGICA DE WHATSAPP ---

    /**
     * Genera el enlace de WhatsApp con el mensaje pre-escrito, usando el nombre del plan.
     */
    const generateWhatsAppLink = (planName) => {
        // Estructura del mensaje directo y específico
        const message = `Hola, me gustaría acceder al plan "${planName}". Por favor, indícame los pasos para confirmar mi posición de fundador.`;
        
        const encodedMessage = encodeURIComponent(message);
        
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    };

    /** Asigna el enlace de WhatsApp a cada botón */
    const initializeWhatsAppButtons = () => {
        joinBtns.forEach(btn => {
            const planName = btn.getAttribute('data-level'); // Obtiene el nombre del plan
            const waLink = generateWhatsAppLink(planName);
            btn.setAttribute('href', waLink);
        });
    };


    // --- ANIMACIONES (Scroll Reveal) ---

    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const delay = parseFloat(target.getAttribute('data-delay') || '0');
                
                setTimeout(() => {
                    target.classList.add('js-revealed');
                }, delay * 1000);
            }
        });
    }, observerOptions);

    const initializeScrollReveal = () => {
        dataModules.forEach(el => {
            scrollObserver.observe(el);
        });
    };


    // --- INICIALIZACIÓN FINAL ---

    initializeWhatsAppButtons();
    initializeScrollReveal(); 
});
