# Appquilar - Makefile for development and deployment

.PHONY: help dev install build clean deploy start-server start-client lint format test

# Default target
help:
	@echo "Appquilar - Comandos disponibles:"
	@echo ""
	@echo "  dev          - Ejecutar servidor de desarrollo completo"
	@echo "  install      - Instalar dependencias del proyecto"
	@echo "  build        - Construir aplicación para producción"
	@echo "  start-client - Ejecutar solo el cliente (frontend)"
	@echo "  start-server - Ejecutar solo el servidor (backend)"
	@echo "  clean        - Limpiar archivos temporales y builds"
	@echo "  deploy       - Preparar para despliegue en producción"
	@echo "  lint         - Verificar código con linter"
	@echo "  format       - Formatear código automáticamente"
	@echo "  test         - Ejecutar tests del proyecto"
	@echo ""

# Ejecutar servidor de desarrollo completo
dev:
	@echo "🚀 Iniciando servidor de desarrollo..."
	npm run dev

# Instalar dependencias
install:
	@echo "📦 Instalando dependencias..."
	npm install

# Construir para producción
build:
	@echo "🏗️ Construyendo aplicación para producción..."
	npm run build

# Ejecutar solo el cliente
start-client:
	@echo "🎨 Iniciando cliente (frontend)..."
	cd client && npm run dev

# Ejecutar solo el servidor
start-server:
	@echo "⚙️ Iniciando servidor (backend)..."
	npm run start:server

# Limpiar archivos temporales
clean:
	@echo "🧹 Limpiando archivos temporales..."
	rm -rf dist/
	rm -rf client/dist/
	rm -rf node_modules/.cache/
	rm -rf .next/
	@echo "✅ Limpieza completada"

# Preparar para despliegue
deploy: clean install build
	@echo "🚢 Preparando para despliegue..."
	@echo "✅ Aplicación lista para producción en dist/"
	@echo ""
	@echo "Para desplegar:"
	@echo "  1. Subir carpeta dist/ a tu servidor"
	@echo "  2. Configurar variables de entorno"
	@echo "  3. Ejecutar: node dist/index.js"

# Verificar código con linter
lint:
	@echo "🔍 Verificando código..."
	npm run lint

# Formatear código
format:
	@echo "✨ Formateando código..."
	npm run format

# Ejecutar tests
test:
	@echo "🧪 Ejecutando tests..."
	npm run test

# Comandos de desarrollo rápido
quick-start: install dev

# Reinstalar dependencias desde cero
reinstall: clean
	@echo "🔄 Reinstalando dependencias desde cero..."
	rm -rf node_modules/
	rm -f package-lock.json
	npm install

# Información del proyecto
info:
	@echo "📋 Información del proyecto:"
	@echo "  Nombre: Appquilar"
	@echo "  Descripción: Plataforma de alquiler para eventos"
	@echo "  Tecnología: React + Express + TypeScript"
	@echo "  Puerto desarrollo: 5000"
	@echo ""
	@echo "  Para empezar: make dev"
	@echo "  Para producción: make deploy"