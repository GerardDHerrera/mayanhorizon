<?php
// propiedades.php - Página para mostrar y filtrar todas las propiedades disponibles.
// Incluye los componentes de menú y pie de página.

include 'menu.php';
?>

<main class="bg-fondoClaro py-12 pt-32">
    <div class="container mx-auto px-6">

        <!-- Título de la Sección -->
        <div class="text-center mb-12">
            <h1 class="text-4xl font-extrabold text-profundoAzul tracking-tight sm:text-5xl">Encuentra tu Inversión Ideal</h1>
            <p class="mt-4 text-xl text-piedraGris">Explora nuestro catálogo exclusivo de propiedades en la Riviera Maya.</p>
        </div>

        <div class="flex flex-col lg:flex-row gap-8">

            <!-- Barra Lateral de Filtros -->
            <aside class="w-full lg:w-1/4 xl:w-1/5">
                <div class="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                    <h3 class="text-2xl font-bold text-profundoAzul mb-6">Filtros</h3>

                    <div class="space-y-6">
                        <!-- Filtro de Texto -->
                        <div>
                            <label for="filter-text-search" class="block text-sm font-medium text-piedraGris mb-1">Búsqueda por palabra</label>
                            <input type="text" id="filter-text-search" placeholder="Ej: Tulum, esquina..." class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                        </div>

                        <!-- Filtro de Región -->
                        <div>
                            <label for="filter-region" class="block text-sm font-medium text-piedraGris mb-1">Región</label>
                            <select id="filter-region" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                                <option value="all">Todas las regiones</option>
                                <option value="Región 15">Región 15</option>
                                <option value="Región 12">Región 12</option>
                                <option value="Región 11">Región 11</option>
                                <option value="Región 8">Región 8</option>
                                <option value="Centro">Centro</option>
                                <option value="Carretera Bocapaila">Carretera Bocapaila</option>
                                <!-- Se pueden añadir más dinámicamente si se desea -->
                            </select>
                        </div>

                        <!-- Filtro de Características Especiales -->
                        <div>
                            <label for="filter-special" class="block text-sm font-medium text-piedraGris mb-1">Características</label>
                            <select id="filter-special" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                                <option value="all">Todas</option>
                                <option value="esquina">En esquina</option>
                                <option value="frente-playa">Frente a la playa</option>
                                <option value="con-cenote">Con cenote</option>
                            </select>
                        </div>

                        <!-- Filtro de Precio -->
                        <div>
                            <label class="block text-sm font-medium text-piedraGris mb-1">Rango de Precio (USD)</label>
                            <div class="flex gap-2">
                                <input type="number" id="filter-price-min" placeholder="Mín" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                                <input type="number" id="filter-price-max" placeholder="Máx" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                            </div>
                        </div>

                        <!-- Filtro de Área -->
                        <div>
                            <label class="block text-sm font-medium text-piedraGris mb-1">Área (m²)</label>
                            <div class="flex gap-2">
                                <input type="number" id="filter-area-min" placeholder="Mín" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                                <input type="number" id="filter-area-max" placeholder="Máx" class="w-full border-gray-300 rounded-lg shadow-sm focus:border-oroArena focus:ring-oroArena">
                            </div>
                        </div>

                        <!-- Botones de Acción -->
                        <div class="flex flex-col gap-3 pt-4">
                            <button id="apply-filters-btn" class="w-full py-2 px-4 bg-profundoAzul text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors">Aplicar Filtros</button>
                            <button id="clear-filters-btn" class="w-full py-2 px-4 bg-piedraGris text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-colors">Limpiar Filtros</button>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- Grid de Propiedades y Paginación -->
            <section class="w-full lg:w-3/4 xl:w-4/5">
                <!-- Contador de Propiedades -->
                <div class="mb-4 text-right">
                    <span id="property-count" class="text-piedraGris font-medium"></span>
                </div>

                <!-- Grid donde se renderizarán las tarjetas -->
                <div id="propiedades-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <!-- Las tarjetas de propiedades se cargarán aquí dinámicamente -->
                </div>

                <!-- Controles de Paginación -->
                <div id="pagination-container" class="mt-12 flex justify-center items-center gap-4 hidden">
                    <button id="prev-page-btn" class="px-4 py-2 bg-white text-profundoAzul rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">&larr; Anterior</button>
                    <span id="page-info" class="text-piedraGris font-semibold"></span>
                    <button id="next-page-btn" class="px-4 py-2 bg-white text-profundoAzul rounded-lg shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">Siguiente &rarr;</button>
                </div>
            </section>
        </div>
    </div>
</main>

<!-- Modal para el carrusel de imágenes (opcional, pero buena práctica tenerlo) -->
<div id="imageModal" class="fixed inset-0 bg-black bg-opacity-75 z-50 hidden items-center justify-center">
    <div class="relative bg-white p-4 rounded-lg max-w-4xl w-full">
        <span id="closeModal" class="absolute top-2 right-4 text-4xl font-bold cursor-pointer">&times;</span>
        <div class="overflow-hidden">
            <div id="carouselSlides" class="flex transition-transform duration-300">
                <!-- Las imágenes se cargarán aquí -->
            </div>
        </div>
        <button id="prevBtn" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">&lt;</button>
        <button id="nextBtn" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg">&gt;</button>
    </div>
</div>


<?php
// Incluir el pie de página que contiene los scripts JS
include 'footer.php';
?>