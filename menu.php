<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mayan Horizon - Inversiones Inmobiliarias en la Riviera Maya</title>

    <!-- Tailwind CSS (CDN para prototipado rápido) -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Fuentes de Google -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

    <!-- Font Awesome para iconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Hoja de Estilos Personalizada -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Configuración de colores para Tailwind -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        profundoAzul: '#002F5D',
                        turquesaCaribe: '#00A8B5',
                        oroArena: '#D4A017',
                        selvaVerde: '#006A4E',
                        piedraGris: '#4B4B4B',
                        fondoClaro: '#F8F7F2',
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-fondoClaro text-piedraGris">

    <!-- Header y Navegación -->
    <header id="header" class="ClaseHeaderBg fixed top-0 left-0 right-0 z-50 shadow-md">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <!-- Logo -->
            <a href="index.php" class="text-2xl font-bold text-profundoAzul">
                MAYAN <span class="text-oroArena">HORIZON</span>
            </a>

            <!-- Navegación de Escritorio -->
            <nav class="ClaseDesktopNav hidden md:flex items-center space-x-8">
                <a href="index.php" class="text-piedraGris hover:text-oroArena font-semibold transition-colors">Inicio</a>
                <a href="propiedades.php" class="text-piedraGris hover:text-oroArena font-semibold transition-colors">Propiedades</a>
                <a href="#SeccionQuienesSomos" class="text-piedraGris hover:text-oroArena font-semibold transition-colors">Quiénes Somos</a>
                <a href="#SeccionContacto" class="bg-oroArena text-white px-5 py-2 rounded-full font-bold hover:bg-opacity-90 transition-opacity">Contacto</a>
            </nav>

            <!-- Botón de Menú Móvil (Hamburguesa) -->
            <button id="menu-toggle" class="ClaseMenuToggle md:hidden">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <!-- Panel de Navegación Móvil -->
    <div id="mobile-nav" class="ClaseMobileNav">
        <a href="index.php" class="nav-link">Inicio</a>
        <a href="propiedades.php" class="nav-link">Propiedades</a>
        <a href="#SeccionQuienesSomos" class="nav-link">Quiénes Somos</a>
        <a href="#SeccionContacto" class="nav-link">Contacto</a>
    </div>