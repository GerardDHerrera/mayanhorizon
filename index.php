<?php
// index.php - Página Principal de Mayan Horizon
// Este archivo carga la cabecera, el contenido central y el pie de página.
?>

<?php include 'menu.php'; ?>

<main>
    <!-- Sección Principal (Hero) con Video de Fondo -->
    <section class="ClaseHeroVideoContainer">
        <video autoplay muted loop playsinline class="ClaseHeroVideo">
            <source src="Videos/tulum.mp4" type="video/mp4">
            Tu navegador no soporta el video.
        </video>
        <div class="ClaseHeroOverlay flex flex-col justify-center items-center text-center text-white">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 font-playfair">MAYAN HORIZON</h1>
            <p class="text-xl md:text-2xl mb-8 max-w-2xl font-raleway">
                <span class="text-oroArena font-bold">INVierte</span> donde la cultura se encuentra con el futuro
            </p>
            <a href="#SeccionPropiedades" class="px-8 py-4 rounded-full bg-oroArena text-white text-lg font-bold hover:bg-opacity-80 transition-opacity duration-300 shadow-lg">Ver Propiedades</a>
        </div>
    </section>

    <!-- Filamento divisorio en azul profundo -->
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <!-- Sección Quiénes Somos / Nuestra Filosofía -->
    <section id="SeccionQuienesSomos" class="py-20 SeccionFilosofiaFondoDegradado text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-6 text-white">Nuestra Filosofía</h2>
            <p class="max-w-3xl mx-auto text-lg mb-12 ClaseTypewriterText text-gray-100" data-text="En Mayan Horizon, somos más que una inmobiliaria; somos arquitectos de sueños e inversiones en la Riviera Maya. Con un profundo conocimiento del mercado local y un compromiso inquebrantable con la transparencia, conectamos a inversionistas con oportunidades únicas en uno de los destinos más codiciados del mundo."></p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div class="p-6 rounded-xl shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-oroArena" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.607-4.607a4.998 4.998 0 00-7.072 0m7.072 0l-7.072 7.072M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.607-4.607a4.998 4.998 0 00-7.072 0m7.072 0l-7.072 7.072M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.607-4.607a4.998 4.998 0 00-7.072 0m7.072 0l-7.072 7.072M6 9H4.5M6 15H4.5M10 6.5H8.5M10 17.5H8.5M14 9H12.5M14 15H12.5M18 6.5H16.5M18 17.5H16.5" />
                    </svg>
                    <h3 class="text-2xl font-semibold mb-2 text-white">Conocimiento Local Profundo</h3>
                    <p class="ClaseTypewriterText text-gray-200" data-text="Nuestro equipo vive y respira Tulum. Conocemos cada rincón y oportunidad para su inversión."></p>
                </div>
                <div class="p-6 rounded-xl shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-oroArena" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.928 12c0 3.072 1.22 5.862 3.222 7.938l-1.936 1.936a1 1 0 001.414 1.414l1.936-1.936A12.007 12.007 0 0012 21.072c3.072 0 5.862-1.22 7.938-3.222l1.936 1.936a1 1 0 001.414-1.414l-1.936-1.936A12.007 12.007 0 0021.072 12a11.955 11.955 0 01-3.04-8.618z" />
                    </svg>
                    <h3 class="text-2xl font-semibold mb-2 text-white">Procesos Transparentes</h3>
                    <p class="ClaseTypewriterText text-gray-200" data-text="Su confianza es nuestra prioridad. Le acompañamos en cada paso con total claridad y honestidad."></p>
                </div>
                <div class="p-6 rounded-xl shadow-lg bg-white bg-opacity-10 border border-white border-opacity-20 transform hover:scale-105 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-oroArena" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <h3 class="text-2xl font-semibold mb-2 text-white">Estrategias de Inversión</h3>
                    <p class="ClaseTypewriterText text-gray-200" data-text="No solo vendemos terrenos, sino un futuro. Identificamos propiedades con alta plusvalía y retorno."></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Filamento divisorio en azul profundo -->
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <!-- Sección de Google Maps con tu API Key (Ahora antes del simulador) -->
    <section id="SeccionMapa" class="py-20 bg-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold text-profundoAzul mb-4">Explora la Riviera Maya en 3D</h2>
            <p class="text-xl mb-8 text-piedraGris">Descubre la ubicación estratégica de nuestras propiedades con una vista inmersiva.</p>
            <div id="DivMapaGoogle" class="ClaseMapaContainer">
                <!-- El mapa de Google Maps se inicializará aquí -->
                <p class="p-4 text-center text-red-700 bg-red-100 rounded-lg absolute inset-0 flex items-center justify-center z-10 hidden" id="MapaErrorMensaje">
                    Error al cargar el mapa. Por favor, verifica tu clave API de Google Maps y asegúrate de que la 'Maps JavaScript API' esté habilitada.
                </p>
            </div>
            <div id="DivControlesMapa" class="mt-4 p-2 bg-white rounded-lg shadow-md flex flex-wrap justify-center gap-2">
                <button id="BotonIniciarRotacion" class="px-3 py-1 bg-oroArena text-white rounded-lg hover:bg-opacity-80 transition-colors text-sm shadow-md">Iniciar Recorrido Automático</button>
                <button id="BotonDetenerRotacion" class="px-3 py-1 bg-piedraGris text-white rounded-lg hover:bg-opacity-80 transition-colors text-sm shadow-md hidden">Detener Rotación</button>
                <button id="BotonStreetView" class="px-3 py-1 bg-mapaButton text-white rounded-lg hover:bg-mapaButtonHover transition-colors text-sm shadow-md">Ver Street View</button>
                <button id="BotonSalirStreetView" class="px-3 py-1 bg-piedraGris text-white rounded-lg hover:bg-opacity-80 transition-colors text-sm shadow-md hidden">Salir Street View</button>
            </div>
        </div>
    </section>

    <!-- Filamento divisorio en azul profundo -->
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <!-- Sección de Simulador de ROI y Plusvalía -->
    <section id="SeccionSimuladorROI" class="py-20 bg-fondoClaro">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-profundoAzul">Simulador de ROI y Plusvalía</h2>
                <p class="text-lg text-piedraGris mt-2">Visualiza el potencial de tu inversión en la Riviera Maya. Ajusta los valores para ver una proyección realista de tu crecimiento patrimonial.</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div class="lg:col-span-1 space-y-6 p-6 bg-white rounded-lg shadow-md">
                    <div>
                        <label for="InversionSlider" class="block font-semibold mb-2">Monto de Inversión (MXN)</label>
                        <input type="range" id="InversionSlider" min="500000" max="10000000" step="100000" value="2000000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ClaseRoiSlider accent-oroArena">
                        <div class="text-center font-bold text-xl mt-2 text-oroArena" id="InversionValor">$2,000,000 MXN</div>
                    </div>
                    <div>
                        <label for="HorizonteSlider" class="block font-semibold mb-2">Horizonte de Inversión (Años)</label>
                        <input type="range" id="HorizonteSlider" min="5" max="20" step="1" value="10" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ClaseRoiSlider accent-oroArena">
                        <div class="text-center font-bold text-xl mt-2 text-oroArena" id="HorizonteValor">10 Años</div>
                    </div>
                    <div>
                        <label for="TipoPropiedadSelect" class="block font-semibold mb-2">Tipo de Propiedad</label>
                        <select id="TipoPropiedadSelect" class="ClaseRoiSelect">
                            <option value="1.12">Terreno Residencial (12% anual)</option>
                            <option value="1.15">Terreno Comercial (15% anual)</option>
                            <option value="1.18">Preventa Exclusiva (18% anual)</option>
                        </select>
                    </div>
                    <div class="pt-4 text-center">
                        <p class="text-piedraGris">Valor Proyectado:</p>
                        <p class="text-3xl font-bold text-selvaVerde" id="ValorProyectado">$6,191,736.42 MXN</p>
                        <p class="text-piedraGris mt-2">Retorno Total de Inversión:</p>
                        <p class="text-2xl font-bold text-selvaVerde" id="RoiTotal">209.59%</p>
                    </div>
                </div>
                <div class="lg:col-span-2">
                    <div class="relative w-full h-96">
                        <canvas id="RoiChartCanvas"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Filamento divisorio en azul profundo -->
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <!-- Sección de Propiedades con Buscador -->
    <section id="SeccionPropiedades" class="py-20 bg-fondoClaro">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold text-profundoAzul mb-8">Nuestras Propiedades Exclusivas</h2>
            <p class="text-xl mb-12 text-piedraGris">Encuentra la inversión perfecta en la Riviera Maya con nuestro buscador.</p>
            
            <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-12">
                <h3 class="text-2xl font-semibold text-turquesaCaribe mb-6">Encuentra tu Propiedad</h3>
                <div class="space-y-6">
                    <div>
                        <label for="SelectorPropiedad" class="block text-piedraGris text-sm font-medium mb-2 text-left">Selecciona una propiedad</label>
                        <select id="SelectorPropiedad" class="ClaseRoiSelect">
                            <option value="tulum-jungle-retreat">Terreno Exclusivo Tulum (Jungle Retreat)</option>
                            <option value="akumal-beachfront">Lote Akumal (Frente de Playa)</option>
                            <option value="playa-del-carmen-downtown">Terreno Comercial Playa del Carmen (Centro)</option>
                        </select>
                    </div>
                    <div id="DetallesPropiedad" class="bg-fondoClaro p-6 rounded-lg border border-gray-200 text-left">
                        <p class="text-center text-gray-500">Selecciona una propiedad para ver sus detalles.</p>
                    </div>
                </div>
            </div>

            <!-- Aquí podrías añadir un grid con todas las propiedades si es necesario, como las 3 que ya tenías -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/foto1.jpg" alt="Propiedad 1" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold text-profundoAzul mb-2">Lote Premium Selva</h3>
                        <p class="text-turquesaCaribe font-bold text-lg mb-4">$350,000 USD</p>
                        <p class="text-piedraGris mb-4">Un oasis de tranquilidad y privacidad en el corazón de la selva maya.</p>
                        <a href="#" class="inline-block px-6 py-2 rounded-full bg-selvaVerde text-white font-semibold hover:bg-opacity-80 transition-opacity duration-300">Ver Detalles</a>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/foto2.jpg" alt="Propiedad 2" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold text-profundoAzul mb-2">Terreno Akumal</h3>
                        <p class="text-turquesaCaribe font-bold text-lg mb-4">$850,000 USD</p>
                        <p class="text-piedraGris mb-4">Propiedad con vista al mar y acceso a una playa privada, ideal para un resort.</p>
                        <a href="#" class="inline-block px-6 py-2 rounded-full bg-selvaVerde text-white font-semibold hover:bg-opacity-80 transition-opacity duration-300">Ver Detalles</a>
                    </div>
                </div>
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/foto3.jpg" alt="Propiedad 3" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-2xl font-semibold text-profundoAzul mb-2">Lote Cerca de Tulum</h3>
                        <p class="text-turquesaCaribe font-bold text-lg mb-4">$750,000 USD</p>
                        <p class="text-piedraGris mb-4">Terreno cerca del centro, ideal para desarrollo comercial o residencial.</p>
                        <a href="#" class="inline-block px-6 py-2 rounded-full bg-selvaVerde text-white font-semibold hover:bg-opacity-80 transition-opacity duration-300">Ver Detalles</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Filamento divisorio en azul profundo -->
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <!-- Sección de Testimoniales -->
    <section id="SeccionTestimoniales" class="py-20 bg-oroArena text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-12 text-white">Lo que dicen nuestros clientes</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <!-- Testimonial 1 -->
                <div class="bg-white text-piedraGris p-8 rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/persona1.png" alt="Persona 1" class="w-32 h-32 rounded-full mb-4 object-cover ring-4 ring-turquesaCaribe">
                    <p class="italic mb-4 ClaseTypewriterText TestimonioTexto" data-text="El equipo de Mayan Horizon hizo que la compra fuera increíblemente sencilla. Son profesionales y transparentes."></p>
                    <p class="font-bold">- Ana G.</p>
                </div>
                <!-- Testimonial 2 -->
                <div class="bg-white text-piedraGris p-8 rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/persona2.png" alt="Persona 2" class="w-32 h-32 rounded-full mb-4 object-cover ring-4 ring-turquesaCaribe">
                    <p class="italic mb-4 ClaseTypewriterText TestimonioTexto" data-text="Su conocimiento del mercado en Tulum es insuperable. Me ayudaron a encontrar la propiedad perfecta para mi inversión."></p>
                    <p class="font-bold">- Juan P.</p>
                </div>
                <!-- Testimonial 3 -->
                <div class="bg-white text-piedraGris p-8 rounded-lg shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
                    <img src="Imagenes/persona3.png" alt="Persona 3" class="w-32 h-32 rounded-full mb-4 object-cover ring-4 ring-turquesaCaribe">
                    <p class="italic mb-4 ClaseTypewriterText TestimonioTexto" data-text="Un servicio de lujo, desde el primer contacto hasta el cierre. Superaron todas mis expectativas."></p>
                    <p class="font-bold">- Sofía R.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Menú lateral flotante de Redes Sociales -->
    <div class="ClaseSocialSidebar">
        <a href="https://www.facebook.com/mayanhorizon" target="_blank" class="ClaseSocialIcon facebook">
            <i class="fab fa-facebook-f"></i>
            <span>Facebook</span>
        </a>
        <a href="https://www.instagram.com/mayanhorizon" target="_blank" class="ClaseSocialIcon instagram">
            <i class="fab fa-instagram"></i>
            <span>Instagram</span>
        </a>
        <a href="https://www.linkedin.com/company/mayanhorizon" target="_blank" class="ClaseSocialIcon linkedin">
            <i class="fab fa-linkedin-in"></i>
            <span>LinkedIn</span>
        </a>
        <a href="https://twitter.com/mayanhorizon" target="_blank" class="ClaseSocialIcon x-twitter">
            <i class="fab fa-x-twitter"></i>
            <span>X (Twitter)</span>
        </a>
        <a href="https://www.youtube.com/mayanhorizon" target="_blank" class="ClaseSocialIcon youtube">
            <i class="fab fa-youtube"></i>
            <span>YouTube</span>
        </a>
    </div>
</main>

<?php include 'footer.php'; ?>
