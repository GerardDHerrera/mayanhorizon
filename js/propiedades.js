// propiedades-script.js - Lógica específica para la página de propiedades

document.addEventListener('DOMContentLoaded', () => {

    const propiedadesGrid = document.getElementById('propiedades-grid');
    const filterRegion = document.getElementById('filter-region');
    const filterSpecial = document.getElementById('filter-special');
    const filterPriceMin = document.getElementById('filter-price-min');
    const filterPriceMax = document.getElementById('filter-price-max');
    const filterAreaMin = document.getElementById('filter-area-min');
    const filterAreaMax = document.getElementById('filter-area-max');
    const filterTextSearch = document.getElementById('filter-text-search');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const propertyCount = document.getElementById('property-count');

    // Elementos del modal
    const imageModal = document.getElementById('imageModal');
    const closeModalBtn = document.getElementById('closeModal');
    const carouselSlides = document.getElementById('carouselSlides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentImageIndex = 0;
    let sampleImages = [ // Ejemplo de imágenes para el carrusel
        'https://via.placeholder.com/800x600/002F5D/FFFFFF?text=Propiedad+1',
        'https://via.placeholder.com/800x600/4B4B4B/FFFFFF?text=Propiedad+2',
        'https://via.placeholder.com/800x600/D4A017/FFFFFF?text=Propiedad+3'
    ];

    let currentPage = 1;
    const itemsPerPage = 9;
    let filteredProperties = [];
    let allPropertiesData = [];

    // Función para cargar los datos de propiedades desde la API
    async function fetchProperties() {
        if (propiedadesGrid) {
            propiedadesGrid.innerHTML = `<p class="text-center col-span-full text-gray-500">Cargando propiedades...</p>`;
        }

        try {
            const response = await fetch('apiPropiedades.php');
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            // Se asignan directamente los datos de la API, eliminando la capa de mapeo.
            allPropertiesData = await response.json();

            // Es buena práctica asegurar que los tipos de datos numéricos sean correctos.
            allPropertiesData.forEach(p => {
                p.precio = parseFloat(p.precio);
                p.m2 = parseFloat(p.m2);
                p.latitud = p.latitud ? parseFloat(p.latitud) : null;
                p.longitud = p.longitud ? parseFloat(p.longitud) : null;
            });

            applyFilters();
        } catch (error) {
            console.error('Error al cargar los datos de propiedades:', error);
            if(propiedadesGrid) {
                 propiedadesGrid.innerHTML = `<p class="text-center col-span-full text-red-500">Error al cargar las propiedades. Intente de nuevo más tarde.</p>`;
            }
        }
    }

    // Función para aplicar filtros, ahora usando los nombres de campo de la API
    function applyFilters() {
        if (!allPropertiesData) return;
        filteredProperties = allPropertiesData.filter(property => {
            const regionMatch = !filterRegion || filterRegion.value === 'all' || (property.region && property.region.includes(filterRegion.value));
            // Nota: 'specialFeatures' no viene de la API. Se omite el filtro o se debe añadir a la DB.
            // const specialMatch = !filterSpecial || filterSpecial.value === 'all' || (property.specialFeatures && property.specialFeatures.includes(filterSpecial.value));
            const priceMatch = (!filterPriceMin || filterPriceMin.value === '' || property.precio >= parseFloat(filterPriceMin.value)) &&
                               (!filterPriceMax || filterPriceMax.value === '' || property.precio <= parseFloat(filterPriceMax.value));
            const areaMatch = (!filterAreaMin || filterAreaMin.value === '' || property.m2 >= parseFloat(filterAreaMin.value)) &&
                              (!filterAreaMax || filterAreaMax.value === '' || property.m2 <= parseFloat(filterAreaMax.value));
            const textMatch = !filterTextSearch || filterTextSearch.value === '' ||
                              (property.titulo && property.titulo.toLowerCase().includes(filterTextSearch.value.toLowerCase())) ||
                              (property.descripcion && property.descripcion.toLowerCase().includes(filterTextSearch.value.toLowerCase()));

            return regionMatch && priceMatch && areaMatch && textMatch;
        });
        currentPage = 1;
        renderProperties();
    }

    // Función para renderizar las propiedades, usando los nombres de campo de la API
    function renderProperties() {
        if (!propiedadesGrid) return;
        propiedadesGrid.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProperties = filteredProperties.slice(start, end);

        if (paginatedProperties.length === 0) {
            propiedadesGrid.innerHTML = `<p class="text-center col-span-full text-gray-500">No se encontraron propiedades que coincidan con los filtros.</p>`;
        } else {
            paginatedProperties.forEach(property => {
                const card = document.createElement('div');
                card.className = 'property-card';

                // Se computan los detalles para la vista directamente desde los datos de la API
                const locationDetails = `${property.region || ''}, ${property.manzana || ''}, ${property.lote || ''}`.replace(/, $/, '').trim();
                const totalPrice = `${property.precio.toLocaleString('en-US')} ${property.moneda}`;

                card.innerHTML = `
                    <div class="property-card-media">
                        <div class="mini-map-embed" id="map-${property.id}"></div>
                        <span class="map-number">${property.id}</span>
                    </div>
                    <div class="property-card-info">
                        <div>
                            <h3 class="property-card-title">${property.titulo}</h3>
                            <p class="property-card-location"><i class="fas fa-map-marker-alt"></i> ${locationDetails}</p>
                            <p class="property-card-area"><i class="fas fa-ruler-combined"></i> ${property.m2} m²</p>
                        </div>
                        <p class="property-card-price">$${totalPrice}</p>
                        <a href="#SeccionContacto" class="property-card-button">Me interesa</a>
                    </div>
                `;
                propiedadesGrid.appendChild(card);

                const coordinates = (property.latitud && property.longitud) ? { lat: property.latitud, lng: property.longitud } : null;
                if (window.googleMapsApiLoaded && coordinates) {
                    window.initMiniMap(`map-${property.id}`, coordinates, null, property.titulo);
                } else if (coordinates) {
                    if (!window.pendingMapInitializations) {
                        window.pendingMapInitializations = [];
                    }
                    window.pendingMapInitializations.push({
                        mapDivId: `map-${property.id}`,
                        coordinates: coordinates,
                        polygonCoords: null,
                        name: property.titulo
                    });
                }
            });
        }

        // Actualizar información de paginación
        const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
        const paginationContainer = document.getElementById('pagination-container');
        if (paginationContainer) {
            document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPages}`;
            document.getElementById('prev-page-btn').disabled = currentPage === 1;
            document.getElementById('next-page-btn').disabled = currentPage === totalPages;
            paginationContainer.classList.toggle('hidden', filteredProperties.length <= itemsPerPage);
        }
        if(propertyCount) {
             propertyCount.textContent = `Mostrando ${filteredProperties.length} propiedades.`;
        }
    }

    // Lógica de los botones de paginación
    const prevPageBtn = document.getElementById('prev-page-btn');
    const nextPageBtn = document.getElementById('next-page-btn');

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProperties();
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderProperties();
            }
        });
    }

    // Lógica de los botones de filtros
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (filterRegion) filterRegion.value = 'all';
            if (filterSpecial) filterSpecial.value = 'all';
            if (filterPriceMin) filterPriceMin.value = '';
            if (filterPriceMax) filterPriceMax.value = '';
            if (filterAreaMin) filterAreaMin.value = '';
            if (filterAreaMax) filterAreaMax.value = '';
            if (filterTextSearch) filterTextSearch.value = '';
            applyFilters();
        });
    }

    // Funciones globales para los filtros rápidos
    window.setFilters = (type, min, max) => {
        if (type === 'price') {
            if (filterPriceMin) filterPriceMin.value = min;
            if (filterPriceMax) filterPriceMax.value = max;
        } else if (type === 'area') {
            if (filterAreaMin) filterAreaMin.value = min;
            if (filterAreaMax) filterAreaMax.value = max;
        }
        applyFilters();
    };

    // Lógica del modal y carrusel
    if (propiedadesGrid) {
        propiedadesGrid.addEventListener('click', (event) => {
            const mapEmbed = event.target.closest('.mini-map-embed');
            if (mapEmbed && imageModal) {
                imageModal.style.display = 'flex';
                createCarouselImages(sampleImages);
                showImage(0);
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if(imageModal) imageModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showImage(currentImageIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showImage(currentImageIndex + 1);
        });
    }

    function createCarouselImages(images) {
        if (!carouselSlides) return;
        carouselSlides.innerHTML = '';
        images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Imagen de la propiedad';
            carouselSlides.appendChild(img);
        });
    }

    function showImage(index) {
        if (!carouselSlides) return;
        const totalImages = carouselSlides.children.length;
        if (totalImages === 0) return;

        if (index >= totalImages) {
            currentImageIndex = 0;
        } else if (index < 0) {
            currentImageIndex = totalImages - 1;
        } else {
            currentImageIndex = index;
        }
        carouselSlides.style.transform = `translateX(${-currentImageIndex * 100}%)`;
    }

    // Iniciar el proceso de carga de propiedades
    fetchProperties();
});