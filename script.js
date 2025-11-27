// Elementos del DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const linkOption = document.getElementById('link-option');
const uploadOption = document.getElementById('upload-option');
const linkInputContainer = document.querySelector('.link-input-container');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const resultsContainer = document.getElementById('results-container');

// Menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Opción de enlace
linkOption.addEventListener('click', () => {
    // Si ya está activo, no hacer nada
    if (!linkInputContainer.classList.contains('hidden')) return;
    
    // Activar esta opción
    linkInputContainer.classList.remove('hidden');
    uploadArea.classList.add('hidden');
    
    // Desactivar la otra opción si está activa
    if (!uploadArea.classList.contains('hidden')) {
        uploadArea.classList.add('hidden');
    }
});

// Opción de subir archivo
uploadOption.addEventListener('click', () => {
    // Si ya está activo, no hacer nada
    if (!uploadArea.classList.contains('hidden')) return;
    
    // Activar esta opción
    uploadArea.classList.remove('hidden');
    linkInputContainer.classList.add('hidden');
    
    // Desactivar la otra opción si está activa
    if (!linkInputContainer.classList.contains('hidden')) {
        linkInputContainer.classList.add('hidden');
    }
});

// Subir archivo al hacer clic en el área de carga
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Manejar la selección de archivo
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
            <p>Archivo seleccionado: <strong>${fileName}</strong></p>
            <button class="btn btn-outline" style="margin-top: 10px;">Cambiar archivo</button>
        `;
        
        // Procesar el archivo después de un breve retraso
        setTimeout(processAudio, 1000);
    }
});

// Función para simular el procesamiento de audio
function processAudio() {
    // Mostrar barra de progreso
    progressContainer.classList.remove('hidden');
    
    // Simular progreso
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Actualizar texto
            progressText.textContent = "¡Procesamiento completado!";
            
            // Mostrar resultados después de un breve retraso
            setTimeout(() => {
                progressContainer.classList.add('hidden');
                resultsContainer.classList.remove('hidden');
                
                // Desplazarse suavemente a los resultados
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
        
        // Actualizar barra de progreso
        progressFill.style.width = `${progress}%`;
        
        // Actualizar texto según el progreso
        if (progress < 30) {
            progressText.textContent = "Analizando estructura musical...";
        } else if (progress < 60) {
            progressText.textContent = "Separando instrumentos...";
        } else if (progress < 90) {
            progressText.textContent = "Generando partituras...";
        } else {
            progressText.textContent = "Finalizando...";
        }
    }, 500);
}

// Animación de las tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas de características
document.querySelectorAll('.feature-card, .option-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Efecto de escritura en el título
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        heroTitle.textContent = originalText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Iniciar efecto de escritura cuando la página cargue
window.addEventListener('load', () => {
    heroTitle.textContent = '';
    setTimeout(typeWriter, 500);
});

// Simular carga de partituras al hacer clic en "Ver partitura"
document.querySelectorAll('.instrument-card .btn-outline').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const instrumentName = e.target.closest('.instrument-card').querySelector('h4').textContent;
        
        // Mostrar mensaje de carga
        const originalText = e.target.textContent;
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
        e.target.disabled = true;
        
        // Simular carga
        setTimeout(() => {
            alert(`Aquí se mostraría la partitura para ${instrumentName}. En una implementación real, esto abriría un visor de partituras.`);
            e.target.innerHTML = originalText;
            e.target.disabled = false;
        }, 1500);
    });
});

// Descargar PDF
document.querySelector('.download-actions .btn-primary').addEventListener('click', () => {
    // Simular descarga
    const button = document.querySelector('.download-actions .btn-primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando PDF...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('PDF descargado exitosamente. En una implementación real, se desc
