document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // CONSTANTES Y ESTADO GLOBAL
    // ----------------------------------------------------
    const dataModules = document.querySelectorAll('.data-module');
    
    // Elementos del Modal
    const modal = document.getElementById('access-modal');
    const closeBtn = document.querySelector('.close-btn');
    const joinBtns = document.querySelectorAll('.btn-join');
    const confirmBtn = document.getElementById('confirm-access-btn');
    const formDiv = document.getElementById('payment-form');
    const statusDiv = document.getElementById('access-status');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const finalLevel = document.getElementById('final-level');

    let selectedLevel = {};

    // Diccionario de niveles para JS (datos que maneja el servidor)
    const accessLevels = {
        'access': { name: 'Access Pass', price: 19, code: 'SUPPORTER', color: 'green' },
        'founder': { name: 'Founder Pass', price: 59, code: 'FOUNDER_PREM', color: 'blue' },
        'creator': { name: 'Creator Pass', price: 129, code: 'CREATOR_LAB', color: 'purple' },
        'vip': { name: 'Inner Circle VIP', price: 329, code: 'INNER_CIRCLE', color: 'yellow' }
    };


    // ----------------------------------------------------
    // LÓGICA DE MODAL DE ACCESO
    // ----------------------------------------------------

    const toggleModal = (show = true) => {
        if (show) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            // Resetear el estado del modal cada vez que se abre
            formDiv.style.display = 'block';
            statusDiv.classList.remove('results-visible');
            statusDiv.classList.add('results-hidden');
            modalTitle.innerText = `ACTIVANDO ACCESO EXCLUSIVO`;

        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    /** Maneja la selección del nivel y muestra el modal */
    const handleJoinClick = (event) => {
        const levelKey = event.currentTarget.getAttribute('data-level');
        selectedLevel = accessLevels[levelKey];
        
        if (!selectedLevel) return;

        // Configurar el modal
        modalTitle.innerText = `ACTIVANDO: ${selectedLevel.name.toUpperCase()}`;
        modalPrice.innerText = ` - ${selectedLevel.price}€`;
        
        // Simular un estado inicial del widget
        document.getElementById('required-level').innerText = selectedLevel.code;
        
        toggleModal(true);
    };

    /** Simula la confirmación de acceso/pago con una animación JS */
    const handleConfirmAccess = () => {
        // Validación simple de formulario
        const nameInput = formDiv.querySelector('input[type="text"]').value;
        const emailInput = formDiv.querySelector('input[type="email"]').value;

        if (!nameInput || !emailInput || !emailInput.includes('@')) {
            alert('Por favor, rellena tu nombre y un email válido.');
            return;
        }

        // 1. Ocultar formulario
        formDiv.style.display = 'none';
        modalTitle.innerText = 'PROCESANDO TRANSACCIÓN CÍBER...';
        
        // 2. Simular un proceso de 2 segundos (el JS guapo!)
        setTimeout(() => {
            // 3. Mostrar estado final
            modalTitle.innerText = `ACCESO ${selectedLevel.code} CONCEDIDO.`;
            finalLevel.innerText = selectedLevel.name;
            statusDiv.classList.remove('results-hidden');
            statusDiv.classList.add('results-visible');
        }, 2000);
    };


    // ----------------------------------------------------
    // ANIMACIONES Y DINAMISMO
    // ----------------------------------------------------

    // Animación de Revelación de Módulos (Fade-in al scrollear)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
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

    dataModules.forEach(el => {
        // Se añade una clase para que el CSS sepa cuándo aplicar la animación
        el.classList.add('js-hide'); 
        scrollObserver.observe(el);
    });
    
    // NOTA: La animación CSS 'js-revealed' se añade en el styles.css
    // para que los módulos aparezcan suavemente al entrar en el viewport.


    // ----------------------------------------------------
    // LISTENERS
    // ----------------------------------------------------

    // Abrir modal al hacer clic en cualquier botón de 'Unirse'
    joinBtns.forEach(btn => {
        btn.addEventListener('click', handleJoinClick);
    });

    // Botón de Confirmar/Pagar dentro del modal
    confirmBtn.addEventListener('click', handleConfirmAccess);

    // Botón de cerrar el modal
    closeBtn.addEventListener('click', () => toggleModal(false));
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            toggleModal(false);
        }
    });
});
