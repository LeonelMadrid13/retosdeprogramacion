// deno-lint-ignore-file no-explicit-any
import { parse } from "https://deno.land/std@0.211.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.211.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.211.0/fs/mod.ts";

const BASE_DIR = "retos";
const REPORTS_DIR = "reports";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

const args = parse(Deno.args, {
    boolean: ["run", "list", "summary-only", "clean"],
    alias: { r: "run", l: "list" },
});

const isRunMode = args.run;
const isList = args.list;
const isSummaryOnly = args["summary-only"];
const isClean = args.clean;
const challengeArg = args._[0] as string | undefined;

if (isClean) {
    let cleaned = false;
    try {
        for await (const entry of Deno.readDir(REPORTS_DIR)) {
            const fullPath = join(REPORTS_DIR, entry.name);
            if (entry.isDirectory && entry.name.startsWith("reto-")) {
                await Deno.remove(fullPath, { recursive: true });
                console.log(`🗑️  Borrado: ${entry.name}`);
                cleaned = true;
            }
        }
        if (!cleaned) {
            console.log("🧹 No se encontraron carpetas de retos para limpiar.");
        } else {
            console.log("✅ Limpieza de carpetas de retos completada.");
        }
    } catch (err) {
        if (err instanceof Error) {
            console.warn("⚠️  Error durante la limpieza:", err.message);
        } else {
            console.warn("⚠️  Error durante la limpieza:", err);
        }
    }
    Deno.exit(0); // 👈 Esto asegura que solo se limpie y luego se detenga
}



await Deno.mkdir(REPORTS_DIR, { recursive: true });

function pad(n: string | number): string {
    return String(n).padStart(2, "0");
}

async function runFile(path: string) {
    const command = new Deno.Command("deno", { args:["run", "--allow-all", path], stdout: "inherit", stderr: "inherit" });
    const process = command.spawn();
    await process.status;
}

async function runTest(path: string, id: string) {
    const dir = join(REPORTS_DIR, `reto-${pad(id)}`);
    await Deno.mkdir(dir, { recursive: true });
    const reportPath = join(dir, `result.xml`);

    const command = new Deno.Command("deno", {
        args: ["test", "--allow-all", "--reporter=junit", `--junit-path=${reportPath}`, path],
        stdout: "inherit",
        stderr: "inherit",
    });
    const process = command.spawn();
    await process.status;
}

async function runChallenge(n: string) {
    const folder = join(BASE_DIR, `reto-${pad(n)}`);
    const file = join(folder, isRunMode ? "index.ts" : "index.test.ts");

    if (!await exists(file)) {
        console.warn(`⚠️  Archivo no encontrado para reto ${n}, ignorando.`);
        return;
    }

    console.log(`\n🚀 Ejecutando ${file}...\n`);
    if (isRunMode) {
        await runFile(file);
    } else {
        await runTest(file, n);
    }
}

async function runAllChallenges() {
    for await (const entry of Deno.readDir(BASE_DIR)) {
        if (entry.isDirectory && entry.name.startsWith("reto-")) {
            const number = entry.name.split("-")[1];
            await runChallenge(number);
        }
    }
    await summarizeFailures();
}

async function listChallenges() {
    console.log("\n📋 Retos disponibles:\n");
    for await (const entry of Deno.readDir(BASE_DIR)) {
        if (entry.isDirectory && entry.name.startsWith("reto-")) {
            const number = entry.name.split("-")[1];
            const readmePath = join(BASE_DIR, entry.name, "README.md");
            let title = "(sin título)";
            try {
                const content = await Deno.readTextFile(readmePath);
                const match = content.match(/^# Reto\s+\d+:\s+(.+)$/m);
                if (match) title = match[1];
            } catch {
                console.warn(`⚠️  No se pudo leer ${readmePath}, usando título por defecto.`);
            }
            console.log(`- ${number}: ${title}`);
        }
    }
}

async function summarizeFailures() {
    console.log("\n📄 Resumen de fallos:");
    const resumenMdPath = join(REPORTS_DIR, "resumen.md");
    const resumenJsonPath = join(REPORTS_DIR, "resumen.json");

    const resumenJsonMap = new Map<string, any>();

    // Cargar JSON anterior si existe
    if (await exists(resumenJsonPath)) {
        try {
            const data = JSON.parse(await Deno.readTextFile(resumenJsonPath));
            for (const entry of data) {
                resumenJsonMap.set(entry.reto, entry);
            }
        } catch {
            console.warn("⚠️  Error al leer resumen.json existente. Se reiniciará.");
        }
    }

    const resumenMdLines: string[] = ["# Resumen de fallos\n"];

    for await (const entry of Deno.readDir(REPORTS_DIR)) {
        if (!entry.isDirectory || !entry.name.startsWith("reto-")) continue;

        const retoName = entry.name;
        const reportFile = join(REPORTS_DIR, retoName, "result.xml");

        if (!await exists(reportFile)) continue;

        const content = await Deno.readTextFile(reportFile);

        if (content.includes('failures="0"')) {
            console.log(`${GREEN}✅ ${retoName}${RESET}`);
            resumenMdLines.push(`- ✅ **${retoName}**`);
            resumenJsonMap.set(retoName, { reto: retoName, errores: [] });
            continue;
        }

        console.log(`${RED}❌ ${retoName}${RESET}`);
        resumenMdLines.push(`- ❌ **${retoName}**`);

        const matches = content.match(/<failure[^>]*>(.*?)<\/failure>/gs);
        const errores: any[] = [];

        if (matches) {
            for (const match of matches) {
                const detail = match.match(/<!\[CDATA\[(.*?)\]\]>/s);
                const line = match.match(/file:\/\/.*\.(ts|js):(\d+):(\d+)/);
                if (detail) {
                    const mensaje = detail[1].trim();
                    resumenMdLines.push(`  - ${mensaje}`);
                    errores.push({ mensaje, linea: line?.[0] || null });
                    console.log(`   ${YELLOW}→${RESET} ${mensaje}`);
                }
                if (line) {
                    console.log(`     ${CYAN}↳ Línea:${RESET} ${line[0]}`);
                }
            }
        }

        resumenJsonMap.set(retoName, { reto: retoName, errores });
    }

    // Guardar resultados actualizados
    await Deno.writeTextFile(resumenMdPath, resumenMdLines.join("\n"));
    await Deno.writeTextFile(resumenJsonPath, JSON.stringify([...resumenJsonMap.values()], null, 2));

    console.log(`
🔗 Reportes generados:
   📄 Markdown → file://${resumenMdPath}
   🧾 JSON     → file://${resumenJsonPath}`);
}

if (args.help || args.h) {
    console.log(`\nUso:
  pnpm run reto             # Ejecuta todos los tests
  pnpm run reto 3           # Ejecuta tests del reto 3
  pnpm run reto 3 --run     # Ejecuta index.ts del reto 3
  pnpm run reto 3 -r        # Ejecuta index.ts del reto 3
  pnpm run reto --run       # Ejecuta todos los retos
  pnpm run reto -r          # Ejecuta todos los retos
  pnpm run reto --list      # Lista todos los retos disponibles
  pnpm run reto -l          # Lista todos los retos disponibles
  pnpm run reto --summary-only     # Muestra solo el resumen de fallos
  pnpm run reto --clean            # Limpia los reportes antes de ejecutar\n`);
    Deno.exit(0);
}

if (isSummaryOnly) {
    await summarizeFailures();
    Deno.exit(0);
}

if (isList) {
    await listChallenges();
} else if (challengeArg) {
    const parts = String(challengeArg).split(/[,\s]+/);
    for (const part of parts) {
        if (/^\d+$/.test(part)) {
            await runChallenge(part);
        } else if (/^\d+-\d+$/.test(part)) {
            const [start, end] = part.split("-").map(Number);
            for (let i = start; i <= end; i++) {
                await runChallenge(i.toString());
            }
        } else {
            console.warn(`⚠️  Argumento no reconocido: ${part}`);
        }
    }
    await summarizeFailures();
} else {
    await runAllChallenges();
}
