// js/script.js - Lógica JavaScript principal para Mayan Horizon

// --- Google Maps API Key ---
// ¡¡IMPORTANTE!! Reemplaza 'YOUR_GOOGLE_MAPS_API_KEY_HERE' con tu clave API REAL de Google Maps.
// Asegúrate de que tu clave API de Google Maps sea válida y tenga habilitada la API de Maps JavaScript.
const GOOGLEMAPSAPIKEY = 'AIzaSyBn26o76tGltWl-S_KB9aaLzzwmmbIALjY'; // Usando la clave que proporcionaste

let allPropertiesData = []; // Almacenará todos los datos de propiedades cargados
let currentMapInstances = {}; // Para guardar instancias de mini-mapas y evitar duplicados

// Variable global para controlar si la API de Google Maps ya se ha cargado.
let googleMapsApiLoaded = false;
let pendingMapInitializations = []; // Cola para mini-mapas que esperan la API

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica para el menú móvil ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('ClaseMobileNav');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileNavLinks = mobileNav.querySelectorAll('a[data-scroll], a:not([data-scroll])');

    if (menuToggle && mobileNav && closeMobileMenu && mobileNavLinks.length > 0) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('is-open');
                document.body.style.overflow = '';
                // Si es un enlace interno, hacer scroll suave
                const href = link.getAttribute('href');
                if (href && href.startsWith('index.php#')) {
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const headerOffset = document.getElementById('MainHeader').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: elementPosition - headerOffset - 20, // Ajuste extra
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }


    // --- Efecto de máquina de escribir (typewriter) ---
    function iniciarTypewriter(elemento, textoCompleto, velocidad = 30) {
        let i = 0;
        elemento.textContent = '';
        elemento.classList.add('is-typing');

        function escribir() {
            if (i < textoCompleto.length) {
                elemento.textContent += textoCompleto.charAt(i);
                i++;
                setTimeout(escribir, velocidad);
            } else {
                elemento.classList.remove('is-typing');
            }
        }
        escribir();
    }

    const typewriterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                const textoCompleto = elemento.getAttribute('data-text');
                if (textoCompleto && !elemento.dataset.typed) {
                    iniciarTypewriter(elemento, textoCompleto);
                    elemento.dataset.typed = 'true';
                    observer.unobserve(elemento); // Dejar de observar después de la primera animación
                }
            }
        });
    }, { threshold: 0.8 });

    document.querySelectorAll('.ClaseTypewriterText, .TestimonioTexto').forEach(elemento => {
        typewriterObserver.observe(elemento);
    });

    // --- Lógica del simulador de ROI (mantener si esta en index.php, sino remover) ---
    // Esta sección debería estar en script.js si el simulador está en index.php
    // Si el simulador se mueve a propiedades.php o una página aparte, mover esta lógica allá.
    if (document.getElementById('InversionSlider')) { // Comprobar si los elementos existen
        let roiChartInstance = null;
        const inversionSlider = document.getElementById('InversionSlider');
        const horizonteSlider = document.getElementById('HorizonteSlider');
        const tipoPropiedadSelect = document.getElementById('TipoPropiedadSelect');
        const inversionValor = document.getElementById('InversionValor');
        const horizonteValor = document.getElementById('HorizonteValor');
        const valorProyectadoDisplay = document.getElementById('ValorProyectado');
        const roiTotalDisplay = document.getElementById('RoiTotal');
        const ctx = document.getElementById('RoiChartCanvas').getContext('2d');

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
        };

        function calculateAndDisplayROI() {
            const inversionInicial = parseFloat(inversionSlider.value);
            const anios = parseInt(horizonteSlider.value);
            const tasaAnual = parseFloat(tipoPropiedadSelect.value);

            inversionValor.textContent = formatCurrency(inversionInicial);
            horizonteValor.textContent = `${anios} Años`;

            let proyeccionData = [];
            let labels = [];
            let valorActual = inversionInicial;

            for (let i = 0; i <= anios; i++) {
                labels.push(`Año ${i}`);
                proyeccionData.push(valorActual);
                valorActual *= tasaAnual;
            }

            const valorFinal = proyeccionData[proyeccionData.length - 1];
            const roi = ((valorFinal - inversionInicial) / inversionInicial) * 100;

            valorProyectadoDisplay.textContent = formatCurrency(valorFinal);
            roiTotalDisplay.textContent = `${roi.toFixed(2)}%`;

            updateChart(labels, proyeccionData);
        }

        function updateChart(labels, data) {
            const oroArenaColor = tailwind.config.theme.extend.colors.oroArena || '#D4A017';
            const piedraGrisColor = tailwind.config.theme.extend.colors.piedraGris || '#4B4B4B';

            if (roiChartInstance) {
                roiChartInstance.destroy();
            }
            roiChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Valor Proyectado de Inversión',
                        data: data,
                        borderColor: oroArenaColor,
                        backgroundColor: 'rgba(212, 160, 23, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: oroArenaColor,
                        pointBorderColor: oroArenaColor,
                        pointRadius: 3,
                        hoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += formatCurrency(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: piedraGrisColor
                            }
                        },
                        y: {
                            ticks: {
                                callback: function(value, index, values) {
                                    return formatCurrency(value);
                                },
                                color: piedraGrisColor
                            },
                            grid: {
                                color: 'rgba(0,0,0,0.1)'
                            }
                        }
                    }
                }
            });
        }

        inversionSlider.addEventListener('input', calculateAndDisplayROI);
        horizonteSlider.addEventListener('input', calculateAndDisplayROI);
        tipoPropiedadSelect.addEventListener('change', calculateAndDisplayROI);
        calculateAndDisplayROI();
    }

    // --- Lógica del buscador de propiedades (index.php) ---
    // Esta sección también debería estar en script.js si el buscador está en index.php
    // Si se mueve a propiedades.php o una página aparte, mover esta lógica allá.
    if (document.getElementById('SelectorPropiedad')) { // Comprobar si los elementos existen
        const selectorPropiedad = document.getElementById('SelectorPropiedad');
        const detallesPropiedadDiv = document.getElementById('DetallesPropiedad');

        const propiedadesDetalles = {
            "tulum-jungle-retreat": {
                name: "Terreno Exclusivo Tulum (Jungle Retreat)",
                location: "Tulum, Quintana Roo (Zona de la Selva)",
                price: "250,000 USD",
                area: "5,000 m²",
                features: ["Privacidad total", "Conexión a la naturaleza", "Acceso controlado", "Ideal para desarrollo ecológico"],
                photos: ["Imagenes/foto1.jpg"]
            },
            "akumal-beachfront": {
                name: "Lote Akumal (Frente de Playa)",
                location: "Akumal, Quintana Roo (Frente al Mar Caribe)",
                price: "1,200,000 USD",
                area: "1,500 m²",
                features: ["Vistas panorámicas al mar", "Acceso directo a la playa", "Potencial turístico premium", "Ideal para villa de lujo"],
                photos: ["Imagenes/foto2.jpg"]
            },
            "playa-del-carmen-downtown": {
                name: "Terreno Comercial Playa del Carmen (Centro)",
                location: "Playa del Carmen, Quintana Roo (Centro, Cerca de la 5ta Avenida)",
                price: "750,000 USD",
                area: "800 m²",
                features: ["Zona de alto tráfico peatonal", "Ideal para locales comerciales/restaurantes", "Cercano a hoteles y atracciones", "Alto retorno de inversión comercial"],
                photos: ["Imagenes/foto3.jpg"]
            }
        };

        function mostrarDetallesPropiedad(propertyId) {
            const propiedad = propiedadesDetalles[propertyId];
            if (propiedad) {
                detallesPropiedadDiv.innerHTML = `
                    <h5 class="text-xl font-bold text-oroArena mb-3">${propiedad.name}</h5>
                    <div class="flex justify-center mt-4 mb-4">
                        <img src="${propiedad.photos[0]}" alt="${propiedad.name}" class="w-full md:w-2/3 rounded-lg shadow-md">
                    </div>
                    <p class="text-piedraGris mb-2"><strong>Ubicación:</strong> ${propiedad.location}</p>
                    <p class="text-piedraGris mb-2"><strong>Precio:</strong> ${propiedad.price}</p>
                    <p class="text-piedraGris mb-4"><strong>Área:</strong> ${propiedad.area}</p>
                    <h6 class="text-lg font-semibold text-profundoAzul mb-2">Características Clave:</h6>
                    <ul class="list-disc list-inside text-piedraGris mb-4">
                        ${propiedad.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                `;
            } else {
                detallesPropiedadDiv.innerHTML = '<p class="text-center text-gray-500">Selecciona una propiedad para ver sus detalles.</p>';
            }
        }

        selectorPropiedad.addEventListener('change', (event) => {
            mostrarDetallesPropiedad(event.target.value);
        });
        mostrarDetallesPropiedad(selectorPropiedad.value);
    }
});


// --- Lógica Global de Google Maps (Index y Propiedades) ---
let mapaGooglePrincipal; // Mapa grande del index
let panoramaPrincipal; // Street View del mapa principal
let rotationIntervalPrincipal; // Intervalo de rotación del mapa principal

// Función para inicializar el mapa grande del index
async function inicializarMapaGooglePrincipal() {
    try {
        if (GOOGLEMAPSAPIKEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
            console.warn("ADVERTENCIA: Reemplaza 'YOUR_GOOGLE_MAPS_API_KEY_HERE' con tu clave API real de Google Maps para habilitar el mapa principal.");
            const mapDiv = document.getElementById('DivMapaGoogle');
            if (mapDiv) {
                mapDiv.innerHTML = '<p class="text-center text-gray-500 p-8">Por favor, inserta una clave API de Google Maps válida para ver el mapa interactivo.</p>';
                document.getElementById('DivControlesMapa').classList.add('hidden');
            }
            return;
        }

        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
        const tulumCenter = { lat: 20.2110, lng: -87.4648 };
        let infoWindowPrincipal = new google.maps.InfoWindow();

        mapaGooglePrincipal = new Map(document.getElementById("DivMapaGoogle"), {
            center: tulumCenter,
            zoom: 13,
            heading: 0,
            tilt: 45,
            mapId: "1a24d0ef8ab865bd50059e0e",
            mapTypeId: 'satellite',
            disableDefaultUI: true,
            gestureHandling: 'cooperative'
        });

        panoramaPrincipal = mapaGooglePrincipal.getStreetView();
        panoramaPrincipal.addListener('visible_changed', () => {
            const isVisible = panoramaPrincipal.getVisible();
            const controlesMapaDiv = document.getElementById('DivControlesMapa');
            if (controlesMapaDiv) { // Asegurarse de que el div exista
                if (isVisible) {
                    controlesMapaDiv.classList.add('hidden');
                    detenerRotacionAutomaticaPrincipal();
                } else {
                    controlesMapaDiv.classList.remove('hidden');
                }
                document.getElementById('BotonStreetView').classList.toggle('hidden', isVisible);
                document.getElementById('BotonSalirStreetView').classList.toggle('hidden', !isVisible);
                document.getElementById('BotonIniciarRotacion').classList.toggle('hidden', isVisible);
                document.getElementById('BotonDetenerRotacion').classList.toggle('hidden', isVisible);
            }
        });

        // Simplemente agregamos marcadores de ejemplo para demostrar
        const propiedadesMapaEjemplo = [
            { id: 1, name: 'Lote Residencial Akumal', lat: 20.2520, lng: -87.3072, description: 'Terreno ideal para construir tu hogar o rentar.' },
            { id: 2, name: 'Terreno Comercial Tulum Centro', lat: 20.2110, lng: -87.4648, description: 'Excelente para negocios, alta afluencia turística.' },
        ];

        propiedadesMapaEjemplo.forEach(prop => {
            const marker = new AdvancedMarkerElement({
                position: { lat: prop.lat, lng: prop.lng },
                map: mapaGooglePrincipal,
                title: prop.name,
            });
            marker.addListener("click", () => {
                infoWindowPrincipal.setContent(`
                    <div class="text-center font-semibold text-piedraGris">
                        <h4 class="text-lg text-oroArena">${prop.name}</h4>
                        <p>${prop.description}</p>
                    </div>
                `);
                infoWindowPrincipal.open(mapaGooglePrincipal, marker);
            });
        });

        iniciarRotacionAutomaticaPrincipal();

    } catch (error) {
        console.error("Error al inicializar Google Maps Principal:", error);
        const mapErrorMsg = document.getElementById('MapaErrorMensaje');
        if (mapErrorMsg) mapErrorMsg.classList.remove('hidden');
    }
}

// Funciones de control para el mapa principal
function iniciarRotacionAutomaticaPrincipal() {
    if (rotationIntervalPrincipal) clearInterval(rotationIntervalPrincipal);
    const btnIniciar = document.getElementById('BotonIniciarRotacion');
    const btnDetener = document.getElementById('BotonDetenerRotacion');
    if (btnIniciar) btnIniciar.classList.add('hidden');
    if (btnDetener) btnDetener.classList.remove('hidden');
    rotationIntervalPrincipal = setInterval(() => {
        let currentHeading = mapaGooglePrincipal.getHeading();
        currentHeading = (currentHeading + 0.5) % 360;
        mapaGooglePrincipal.setHeading(currentHeading);
    }, 50);
}

function detenerRotacionAutomaticaPrincipal() {
    if (rotationIntervalPrincipal) clearInterval(rotationIntervalPrincipal);
    rotationIntervalPrincipal = null;
    const btnIniciar = document.getElementById('BotonIniciarRotacion');
    const btnDetener = document.getElementById('BotonDetenerRotacion');
    if (btnIniciar) btnIniciar.classList.remove('hidden');
    if (btnDetener) btnDetener.classList.add('hidden');
}

function verStreetViewPrincipal(lat, lng) {
    const position = { lat: lat, lng: lng };
    if (panoramaPrincipal) {
        panoramaPrincipal.setPosition(position);
        panoramaPrincipal.setPov({ heading: 270, pitch: 0 });
        panoramaPrincipal.setVisible(true);
    }
}

// Asignar eventos a los botones de control de mapa principal
document.addEventListener('DOMContentLoaded', () => {
    const botonIniciar = document.getElementById('BotonIniciarRotacion');
    const botonDetener = document.getElementById('BotonDetenerRotacion');
    const botonStreetView = document.getElementById('BotonStreetView');
    const botonSalirStreetView = document.getElementById('BotonSalirStreetView');

    if (botonIniciar) botonIniciar.addEventListener('click', iniciarRotacionAutomaticaPrincipal);
    if (botonDetener) botonDetener.addEventListener('click', detenerRotacionAutomaticaPrincipal);
    if (botonStreetView) {
        botonStreetView.addEventListener('click', () => {
            if (panoramaPrincipal && mapaGooglePrincipal) {
                const currentCenter = mapaGooglePrincipal.getCenter();
                verStreetViewPrincipal(currentCenter.lat(), currentCenter.lng());
            }
        });
    }
    if (botonSalirStreetView) {
        botonSalirStreetView.addEventListener('click', () => {
            if (panoramaPrincipal) panoramaPrincipal.setVisible(false);
        });
    }
});


// --- Lógica Específica para Propiedades.php ---
// Esta lógica se ejecutará solo en la página propiedades.php
if (document.getElementById('propiedades-grid')) {
    const propiedadesGrid = document.getElementById('propiedades-grid');
    const filterType = document.getElementById('filter-type');
    const filterLocation = document.getElementById('filter-location');
    const filterPriceMin = document.getElementById('filter-price-min');
    const filterPriceMax = document.getElementById('filter-price-max');
    const filterAreaMin = document.getElementById('filter-area-min');
    const filterAreaMax = document.getElementById('filter-area-max');
    const filterTextSearch = document.getElementById('filter-text-search');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const propertyCountDisplay = document.getElementById('property-count');
    const noResultsMessage = document.getElementById('no-results-message');

    // Función para renderizar una tarjeta de propiedad
    async function renderPropertyCard(property) {
        const card = document.createElement('div');
        card.className = 'property-card';
        
        let mediaHtml = '';
        // Si hay URL de imagen, usarla
        if (property.imageUrl) {
            mediaHtml = `<img src="${property.imageUrl}" alt="${property.name}" class="w-full h-full object-cover">`;
        } else if (property.coordinates && GOOGLEMAPSAPIKEY !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
            const mapDivId = `mini-map-${property.id}`;
            mediaHtml = `<div id="${mapDivId}" class="mini-map-embed"></div>`;
            
            // Si la API de Google Maps ya está cargada, inicializar el mapa directamente.
            // Si no, agregar a la cola de inicialización.
            if (googleMapsApiLoaded) {
                // Pequeño timeout para asegurar que el div esté en el DOM
                setTimeout(async () => {
                    if (!currentMapInstances[mapDivId] && document.getElementById(mapDivId)) {
                        await initMiniMap(mapDivId, property.coordinates, property.polygonCoords, property.name);
                        currentMapInstances[mapDivId] = true;
                    }
                }, 50);
            } else {
                pendingMapInitializations.push({ mapDivId, coordinates: property.coordinates, polygonCoords: property.polygonCoords, name: property.name });
            }

        } else {
            // Fallback si no hay imagen ni mapa (ej. clave API no configurada o falta coordenadas)
            mediaHtml = `<div class="w-full h-full bg-gray-200 flex items-center justify-center text-center text-gray-500 p-4">
                            <i class="fas fa-image mr-2"></i> Imagen no disponible
                         </div>`;
        }

        card.innerHTML = `
            <div class="property-card-media">
                ${mediaHtml}
            </div>
            <div class="property-card-info">
                <h3 class="property-card-title">${property.name}</h3>
                <p class="property-card-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                <p class="property-card-area"><i class="fas fa-ruler-combined"></i> ${property.areaM2} m²</p>
                <p class="property-card-price">${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(property.priceUSD)}</p>
                <a href="propiedad_detalle.php?id=${property.id}" class="property-card-button">Ver Detalles</a>
            </div>
        `;
        propiedadesGrid.appendChild(card);
    }

    // Función para inicializar un mini-mapa de Google Maps dentro de una tarjeta
    async function initMiniMap(mapDivId, coordinates, polygonCoords = null, propertyName = '') {
        // Asegúrate de que la API de Google Maps esté completamente cargada
        if (!googleMapsApiLoaded || typeof google === 'undefined' || typeof google.maps === 'undefined') {
            console.error('initMiniMap llamado antes de que Google Maps API esté lista.');
            return;
        }

        try {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const mapElement = document.getElementById(mapDivId);
            if (!mapElement) {
                console.warn(`Elemento con ID ${mapDivId} no encontrado para inicializar el mini-mapa.`);
                return;
            }

            const miniMap = new Map(mapElement, {
                center: coordinates,
                zoom: 15,
                heading: 0,
                tilt: 45,
                mapId: "1a24d0ef8ab865bd50059e0e", // Usar el mismo ID para estilo 3D
                mapTypeId: 'satellite',
                disableDefaultUI: true,
                gestureHandling: 'none' // Deshabilitar interacción para que actúe como imagen estática
            });

            if (polygonCoords && polygonCoords.length > 0) {
                const mapaStrokeColor = tailwind.config.theme.extend.colors.mapaStroke || '#A67B5B';
                const mapaFillColor = tailwind.config.theme.extend.colors.mapaFill || 'rgba(166, 123, 91, 0.35)';
                new google.maps.Polygon({
                    paths: polygonCoords,
                    strokeColor: mapaStrokeColor,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: mapaFillColor,
                    fillOpacity: 0.35,
                    map: miniMap,
                });
            } else {
                new AdvancedMarkerElement({
                    position: coordinates,
                    map: miniMap,
                    title: propertyName,
                });
            }
            
            // Pequeña animación de rotación inicial para darle vida
            let currentHeading = 0;
            const animationInterval = setInterval(() => {
                currentHeading = (miniMap.getHeading() + 0.1) % 360;
                miniMap.setHeading(currentHeading);
            }, 50);
            // Detener animación después de unos segundos
            setTimeout(() => clearInterval(animationInterval), 3000);

        } catch (error) {
            console.error(`Error al inicializar mini-mapa para ${mapDivId}:`, error);
        }
    }

    // Función para cargar propiedades desde properties.json
    async function fetchProperties() {
        try {
            const response = await fetch('properties.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allPropertiesData = await response.json();
            populateFilters();
            applyFilters(); // Mostrar todas las propiedades inicialmente
        } catch (error) {
            console.error("Error al cargar las propiedades:", error);
            propiedadesGrid.innerHTML = `<p class="col-span-full text-center text-red-600">Error al cargar las propiedades. Por favor, intente de nuevo más tarde.</p>`;
        }
    }

    // Función para rellenar los filtros dinámicamente
    function populateFilters() {
        const locations = new Set();
        allPropertiesData.forEach(prop => {
            if (prop.location) locations.add(prop.location);
        });

        filterLocation.innerHTML = '<option value="all">Todas las Ubicaciones</option>';
        locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc;
            option.textContent = loc;
            filterLocation.appendChild(option);
        });
    }

    // Función para aplicar filtros y renderizar propiedades
    async function applyFilters() {
        propiedadesGrid.innerHTML = ''; // Limpiar grid anterior
        currentMapInstances = {}; // Limpiar referencias de mapas existentes
        pendingMapInitializations = []; // Limpiar cola de inicializaciones pendientes
        noResultsMessage.classList.add('hidden');

        let filteredProperties = [...allPropertiesData];

        // Filtrar por tipo
        const selectedType = filterType.value;
        if (selectedType !== 'all') {
            filteredProperties = filteredProperties.filter(prop => prop.type === selectedType);
        }

        // Filtrar por ubicación
        const selectedLocation = filterLocation.value;
        if (selectedLocation !== 'all') {
            filteredProperties = filteredProperties.filter(prop => prop.location === selectedLocation);
        }

        // Filtrar por rango de precio
        const priceMin = parseFloat(filterPriceMin.value);
        const priceMax = parseFloat(filterPriceMax.value);
        if (!isNaN(priceMin)) {
            filteredProperties = filteredProperties.filter(prop => prop.priceUSD >= priceMin);
        }
        if (!isNaN(priceMax)) {
            filteredProperties = filteredProperties.filter(prop => prop.priceUSD <= priceMax);
        }

        // Filtrar por rango de área
        const areaMin = parseFloat(filterAreaMin.value);
        const areaMax = parseFloat(filterAreaMax.value);
        if (!isNaN(areaMin)) {
            filteredProperties = filteredProperties.filter(prop => prop.areaM2 >= areaMin);
        }
        if (!isNaN(areaMax)) {
            filteredProperties = filteredProperties.filter(prop => prop.areaM2 <= areaMax);
        }

        // Filtrar por búsqueda de texto
        const searchText = filterTextSearch.value.toLowerCase().trim();
        if (searchText) {
            filteredProperties = filteredProperties.filter(prop =>
                (prop.name && prop.name.toLowerCase().includes(searchText)) ||
                (prop.descriptionShort && prop.descriptionShort.toLowerCase().includes(searchText)) ||
                (prop.location && prop.location.toLowerCase().includes(searchText)) ||
                (prop.propertySubType && prop.propertySubType.toLowerCase().includes(searchText))
            );
        }
        
        if (filteredProperties.length === 0) {
            noResultsMessage.classList.remove('hidden');
        } else {
            for (const property of filteredProperties) {
                await renderPropertyCard(property);
            }
        }
        propertyCountDisplay.textContent = `Mostrando ${filteredProperties.length} propiedades.`;

        // Una vez que todas las tarjetas se han renderizado, intenta inicializar los mapas pendientes
        // Esto es crucial para los mini-mapas que se agregaron a la cola
        if (googleMapsApiLoaded) {
            processPendingMiniMaps();
        }
    }

    // Event Listeners para los filtros
    applyFiltersBtn.addEventListener('click', applyFilters);
    filterTextSearch.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    clearFiltersBtn.addEventListener('click', () => {
        filterType.value = 'all';
        filterLocation.value = 'all';
        filterPriceMin.value = '';
        filterPriceMax.value = '';
        filterAreaMin.value = '';
        filterAreaMax.value = '';
        filterTextSearch.value = '';
        applyFilters();
    });

    // Cargar propiedades al iniciar la página de propiedades
    fetchProperties();
}

// Carga el script de Google Maps API si es necesario
// Esta función debe ser llamada una sola vez para evitar problemas.
function loadGoogleMapsScript() {
    if (googleMapsApiLoaded) return; // Ya cargada

    // Solo cargar si hay un mapa principal o un grid de propiedades (que usará mini-mapas)
    if (document.getElementById('DivMapaGoogle') || document.getElementById('propiedades-grid')) {
        const scriptGoogleMaps = document.createElement('script');
        scriptGoogleMaps.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLEMAPSAPIKEY}&callback=initGoogleMapsGlobally&libraries=maps,marker,drawing,streetView`;
        scriptGoogleMaps.async = true;
        scriptGoogleMaps.defer = true;
        scriptGoogleMaps.onerror = () => {
            console.error("Error al cargar el script de Google Maps. Verifica tu clave API y la conexión a internet.");
            // Mostrar un mensaje de error visible al usuario si el script no carga
            const mapErrorMsg = document.getElementById('MapaErrorMensaje');
            if (mapErrorMsg) mapErrorMsg.classList.remove('hidden');
        };
        document.head.appendChild(scriptGoogleMaps);
    }
}

// Función que se llama cuando la API de Google Maps está lista
window.initGoogleMapsGlobally = function() {
    console.log("Google Maps API cargada globalmente.");
    googleMapsApiLoaded = true;

    if (document.getElementById('DivMapaGoogle')) {
        inicializarMapaGooglePrincipal(); // Inicializar el mapa principal si el elemento existe
    }
    
    // Procesa todos los mini-mapas que estaban esperando la carga de la API
    processPendingMiniMaps();
};

// Función para procesar los mini-mapas que estaban en cola
async function processPendingMiniMaps() {
    while (pendingMapInitializations.length > 0) {
        const { mapDivId, coordinates, polygonCoords, name } = pendingMapInitializations.shift();
        // Agregamos un pequeño retraso para asegurar que el DOM esté listo después de añadir las tarjetas
        await new Promise(resolve => setTimeout(resolve, 50)); 
        if (!currentMapInstances[mapDivId] && document.getElementById(mapDivId)) {
            await initMiniMap(mapDivId, coordinates, polygonCoords, name);
            currentMapInstances[mapDivId] = true;
        }
    }
}


// Llama a la función para cargar el script de Google Maps cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadGoogleMapsScript);
