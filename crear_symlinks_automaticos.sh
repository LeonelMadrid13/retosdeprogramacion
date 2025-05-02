#!/bin/bash

base_dir="."
retos_dir="$base_dir/retos"

enlaces_creados=0
enlaces_actualizados=0
enlaces_totales=0

# Colores compatibles
verde=$(tput setaf 2)
gris=$(tput setaf 7)
reset=$(tput sgr0)

# Buscar carpetas reto-*
carpetas=($(find "$retos_dir" -maxdepth 1 -type d -name "reto-*"))
total=${#carpetas[@]}

if [ "$total" -eq 0 ]; then
  echo "⚠️  No se encontraron carpetas reto-* en $retos_dir"
  exit 0
fi

echo "🔗 Creando enlaces simbólicos..."
progress=0
bar_length=40

for carpeta in "${carpetas[@]}"; do
  archivo_ts=$(find "$carpeta" -maxdepth 1 -name "index.ts" | head -n 1)
  [[ -z "$archivo_ts" ]] && continue

  primera_linea=$(head -n 1 "$archivo_ts")

  if [[ "$primera_linea" =~ ^//[[:space:]]*(EASY|MEDIUM|HARD)$ ]]; then
    dificultad=$(echo "$primera_linea" | sed -E 's|^//[[:space:]]*||' | tr '[:upper:]' '[:lower:]')
  else
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
  else
    ln -s "$(realpath "$carpeta")" "$enlace"
    ((enlaces_creados++))
  fi

  ((enlaces_totales++))
  ((progress++))

  percent=$((progress * 100 / total))
  filled=$((progress * bar_length / total))
  empty=$((bar_length - filled))

  bar="${verde}$(printf '#%.0s' $(seq 1 $filled))${gris}$(printf '.%.0s' $(seq 1 $empty))${reset}"
  echo -ne "\r[${bar}] ${percent}% (${progress}/${total})"
done

echo -e "\n\n📦 Total enlaces creados: $enlaces_creados"
echo "🔁 Total enlaces actualizados: $enlaces_actualizados"
