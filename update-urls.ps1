# Script para actualizar URLs reales

# Reemplaza estas URLs con las que obtienes de Netlify:
$WIDGET_A_URL = "https://widget-a-multirepo.netlify.app"
$WIDGET_B_URL = "https://widget-b-multirepo.netlify.app"

# Crear manifest actualizado
@{
  "mfe-widget-a" = "$WIDGET_A_URL/remoteEntry.json"
  "mfe-widget-b" = "$WIDGET_B_URL/remoteEntry.json"
} | ConvertTo-Json | Out-File -FilePath "public\federation.manifest.multirepo.json" -Encoding UTF8

Write-Host "Manifest actualizado con URLs reales"
Write-Host "Ejecuta: npm run build:multirepo"
Write-Host "Después crea nuevo ZIP del shell para desplegar"
