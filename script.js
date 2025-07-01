// Script per il carosello di immagini

let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.querySelectorAll('.slides'); 
    
    
    // Nasconde tutte le immagini
    slides.forEach(slide => {
        slide.style.display = 'none'; 
    });
    
    // Incrementa l'indice del carosello
    slideIndex++;
    
    // Se l'indice supera il numero di immagini, torna alla prima
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    
    // Mostra l'immagine corrente
    slides[slideIndex - 1].style.display = 'block'; 
    
    // Cambia immagine ogni 5 secondi
    setTimeout(showSlides, 5000); 
}




document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Aggiungi la classe 'visible'
            }
        });

    });

    const animatedSections = document.querySelectorAll('.contenthome2');
    animatedSections.forEach(section => {
        observer.observe(section); // Osserva ogni sezione animata
    });
});





document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Aggiungi la classe 'visible'
            }
        });
        threshold: 0.4 // L'animazione parte quando il 50% della sezione è visibile

    });

    const animatedSections = document.querySelectorAll('.contenthome');
    animatedSections.forEach(section => {
        observer.observe(section); // Osserva ogni sezione animata
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const circles = document.querySelectorAll('.circle');
    const percentages = document.querySelectorAll('.percentage');

    circles.forEach((circle, index) => {
        let percentage = parseInt(circle.getAttribute('stroke-dasharray').split(',')[0]);
        let current = 0;
        let interval = setInterval(() => {
            if (current <= percentage) {
                circle.style.strokeDasharray = `${current}, 100`;
                current++;
            } else {
                clearInterval(interval);
            }
        }, 10); // Velocità dell'animazione
    });
});
