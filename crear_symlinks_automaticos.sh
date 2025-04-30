#!/bin/bash

base_dir="."
retos_dir="$base_dir/retos"

# Contador de enlaces creados
enlaces_creados=0
enlaces_actualizados=0
enlaces_totales=0

# Buscar carpetas reto-*
carpetas=$(find "$retos_dir" -maxdepth 1 -type d -name "reto-*")

# Verificar si hay carpetas
if [ -z "$carpetas" ]; then
  echo "⚠️  No se encontraron carpetas reto-* en $retos_dir"
  exit 0
fi

# Recorrer carpetas encontradas
for carpeta in $carpetas; do
  archivo_ts=$(find "$carpeta" -maxdepth 1 -name "index.ts" | head -n 1)
  if [ -z "$archivo_ts" ]; then
    echo "⚠️  No se encontró archivo .ts en $(basename "$carpeta")"
    continue
  fi

  primera_linea=$(head -n 1 "$archivo_ts")

  if [[ "$primera_linea" =~ ^//[[:space:]]*(EASY|MEDIUM|HARD)$ ]]; then
    dificultad=$(echo "$primera_linea" | sed -E 's|^//[[:space:]]*||' | tr '[:upper:]' '[:lower:]')
  else
    echo "⚠️  No se encontró dificultad válida en la primera línea de $archivo_ts (esperado // EASY, // MEDIUM o // HARD)"
    continue
  fi

  dest_dir="$base_dir/$dificultad"
  mkdir -p "$dest_dir"

  nombre_reto=$(basename "$carpeta")
  enlace="$dest_dir/$nombre_reto"

  if [ -e "$enlace" ]; then
    rm -rf "$enlace"
    ln -s "$(realpath "$carpeta")" "$enlace"
    ((enlaces_actualizados++))
    ((enlaces_totales++))
    echo "♻️  $nombre_reto → ✅ Enlace $enlaces_totales actualizado: $enlace → $(realpath "$carpeta")"
  else
    ln -s "$(realpath "$carpeta")" "$enlace"
    ((enlaces_creados++))
    ((enlaces_totales++))
    echo "✅  $nombre_reto → ✅ Enlace $enlaces_totales creado: $enlace → $(realpath "$carpeta")"
  fi
done

echo ""
echo "📦 Total enlaces creados: $enlaces_creados"
echo "🔁 Total enlaces actualizados: $enlaces_actualizados"
