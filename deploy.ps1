# Script de despliegue automatizado para Shell
param(
    [string]$Environment = "production"
)

Write-Host "🚀 Iniciando despliegue del Shell..." -ForegroundColor Green

try {
    # Verificar que Netlify CLI esté instalado
    if (!(Get-Command netlify -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Netlify CLI no está instalado. Instalando..." -ForegroundColor Yellow
        npm install -g netlify-cli
    }

    # Instalar dependencias
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Blue
    npm ci

    # Build del proyecto
    Write-Host "🔨 Construyendo proyecto..." -ForegroundColor Blue
    npm run build:multirepo

    # Verificar que el build fue exitoso
    if (!(Test-Path "dist/shell/browser/index.html")) {
        throw "Build falló - no se encontró index.html"
    }

    # Deploy a Netlify
    Write-Host "🌐 Desplegando a Netlify..." -ForegroundColor Blue

    if ($Environment -eq "production") {
        netlify deploy --prod --dir=dist/shell/browser --site=shell-multirepo
    } else {
        netlify deploy --dir=dist/shell/browser --site=shell-multirepo
    }

    Write-Host "✅ Despliegue completado exitosamente!" -ForegroundColor Green
    Write-Host "🔗 URL: https://shell-multirepo.netlify.app" -ForegroundColor Cyan

} catch {
    Write-Host "❌ Error durante el despliegue: $_" -ForegroundColor Red
    exit 1
}
