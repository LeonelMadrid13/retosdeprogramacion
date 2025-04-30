// scripts/generate_readme.ts
import { exists } from "https://deno.land/std@0.211.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.211.0/path/mod.ts";

const BASE_DIR = "retos";
const REPORTS_DIR = "reports";
const OUT_FILE = "README.md";

const resumenPath = join(REPORTS_DIR, "resumen.json");

const resumenJson: { reto: string; errores: any[] }[] = await exists(resumenPath)
    ? JSON.parse(await Deno.readTextFile(resumenPath))
    : [];

const retoInfo: {
    num: string;
    title: string;
    diff: string;
    completed: boolean;
    loc: number;
}[] = [];

function mapDifficulty(text: string): string {
    if (/EASY/i.test(text)) return "🟢";
    if (/MEDIUM/i.test(text)) return "🟠";
    if (/HARD/i.test(text)) return "🔴";
    return "⚪️";
}

for await (const entry of Deno.readDir(BASE_DIR)) {
    if (entry.isDirectory && entry.name.startsWith("reto-")) {
        const number = entry.name.split("-")[1];
        const readmePath = join(BASE_DIR, entry.name, "README.md");
        const indexPath = join(BASE_DIR, entry.name, "index.ts");

        let title = "(sin título)";
        let difficulty = "⚪️";

        try {
            const content = await Deno.readTextFile(readmePath);
            const match = content.match(/^# Reto\s+\d+:\s+(.+?)(?:\s+\[(EASY|MEDIUM|HARD)\])?$/m);
            if (match) {
                title = match[1].trim();
                difficulty = mapDifficulty(match[2] ?? "");
            }
        } catch { }

        let loc = 0;
        try {
            const indexContent = await Deno.readTextFile(indexPath);
            loc = indexContent.trim().split("\n").length;
        } catch { }

        const match = resumenJson.find((r) => r.reto === `reto-${number}`);
        const completed = match?.errores.length === 0;

        retoInfo.push({
            num: number,
            title,
            diff: difficulty,
            completed,
            loc,
        });
    }
}

retoInfo.sort((a, b) => Number(a.num) - Number(b.num));

const totalCompleted = retoInfo.filter((r) => r.completed).length;
const totalRetos = retoInfo.length;
const totalLOC = retoInfo.reduce((sum, r) => sum + r.loc, 0);

const header = `# Retos de Programación 🎯

Repositorio con soluciones a desafíos de programación.

<p align="center">
    <a href="#resumen">Resumen</a> •
    <a href="#retos">Retos</a> •
    <a href="#licencia">Licencia</a>
</p>

---

## Resumen

Este repositorio contiene soluciones a desafíos de programación. Cada reto tiene su nivel de dificultad y estado de completado.

- ✅ Retos completados: **${totalCompleted}/${totalRetos}**
- 📦 Retos totales: **${totalRetos}**
- 🧾 Líneas de código totales: **${totalLOC}**

---

## Retos

|  Día  | Reto                                          | Dificultad | Completado | LOC  |
| :---: | --------------------------------------------- | :--------: | :--------: | :--: |
`;


const rows = retoInfo.map(({ num, title, diff, completed, loc }) => {
    const paddedNum = num.padStart(2, "0");
    return `|  ${paddedNum}   | ${title} |    ${diff}    |    ${completed ? "✅" : ""}     |  ${loc}  |`;
});

const footer = `

---

## Licencia

Este repositorio está bajo la [MIT License](./LICENSE).
`;

await Deno.writeTextFile(OUT_FILE, header + rows.join("\n") + footer);
console.log("✅ README.md generado correctamente.");
