<?php
// footer.php - Contiene la sección de contacto, el pie de página y los scripts JS.
?>
    <div class="h-2 w-full bg-profundoAzul ClaseFilamento origin-left"></div>

    <section id="SeccionContacto" class="py-20 bg-profundoAzul text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-4xl font-bold mb-4 text-white">Conéctate con el Paraíso</h2>
            <p class="text-xl mb-8 text-gray-200">Estamos listos para hacer realidad tu inversión en Tulum.</p>
            <div class="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-white border-opacity-30">
                <form class="flex flex-col space-y-5 ClaseFormularioContacto">
                    <input type="text" placeholder="Tu Nombre Completo" class="p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-oroArena">
                    <input type="email" placeholder="Tu Correo Electrónico" class="p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-oroArena">
                    <input type="tel" placeholder="Tu Número de Teléfono (Opcional)" class="p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-oroArena">
                    <textarea placeholder="Cuéntanos sobre tu interés..." rows="5" class="p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-oroArena"></textarea>
                    <button type="submit" class="px-8 py-4 rounded-full bg-oroArena text-white text-lg font-bold hover:bg-opacity-90 transition-all duration-300 shadow-xl uppercase tracking-wide">
                        Enviar Mensaje
                    </button>
                </form>
            </div>
        </div>
    </section>

    <footer class="bg-piedraGris text-white py-8">
        <div class="container mx-auto px-6 text-center text-sm">
            <p>&copy; <?php echo date("Y"); ?> Mayan Horizon. Todos los derechos reservados.</p>
            <p class="mt-2 text-gray-400">Diseñado con <span class="text-red-500">❤️</span> en la Riviera Maya.</p>
        </div>
    </footer>

    <a href="https://wa.me/5219841234567" target="_blank" class="fixed bottom-6 right-6 z-50 transition-transform duration-300 hover:scale-110">
        <img src="Imagenes/WhatsApp.png" alt="WhatsApp" class="w-16 h-16 rounded-full shadow-lg">
    </a>

    <!-- Scripts de JavaScript -->
    <script src="js/script.js"></script>
    <script src="js/propiedades.js"></script>

</body>
</html>