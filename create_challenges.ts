import * as fs from 'node:fs';
import * as path from 'node:path';

interface Challenge {
    number: string;
    title: string;
    difficulty: string;
    description: string;
}

const BASE_DIR = 'retos';
const REPORT_PATH = 'reports/resumen.md';

const difficultyMap: Record<string, string> = {
    'Fácil': 'EASY',
    'Medio': 'MEDIUM',
    'Difícil': 'HARD'
};

function sanitizeDoubleQuotes(input: string): string {
    return input.replace(/"/g, "'");
}

function loadChallenges(jsonPath: string): Challenge[] {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(raw);
}

function loadCompletedChallenges(reportPath: string): Set<string> {
    if (!fs.existsSync(reportPath)) return new Set();

    const content = fs.readFileSync(reportPath, 'utf-8');
    const set = new Set<string>();
    const lines = content.split('\n');

    for (const line of lines) {
        const match = line.match(/- ✅ \*\*reto-(\d+)\*\*/);
        if (match) {
            const padded = match[1].padStart(2, '0');
            set.add(padded);
        }
    }

    return set;
}

function createChallengeFiles(challenge: Challenge) {
    const number = challenge.number.replace('#', '').padStart(2, '0');
    const title = sanitizeDoubleQuotes(challenge.title);
    const difficulty = challenge.difficulty;
    const difficultyEN = difficultyMap[difficulty] || 'UNKNOWN';
    const description = challenge.description;

    const folderName = `reto-${number}`;
    const folderPath = path.join(BASE_DIR, folderName);
    fs.mkdirSync(folderPath, { recursive: true });

    const tsContent = `// ${difficultyEN}
// Reto ${number}: ${title}

export function solve(): number {
  // TODO: implementar
  return 0;
}

if (import.meta.main) {
  solve();
}

${description.trim()}
`;

    const testContent = `
import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { solve } from "./index.ts";

describe("Reto ${number}: ${title}", () => {
  it(" ", () => {;
    expect(solve()).toBe(0);
  });
});
`;

    const readmeContent = `# Reto ${number}: ${title}

**Dificultad:** ${difficulty}

## Enunciado

\`\`\`Javascript
${description.trim()}
\`\`\`
`;

    fs.writeFileSync(path.join(folderPath, 'index.ts'), tsContent, 'utf-8');
    fs.writeFileSync(path.join(folderPath, 'index.test.ts'), testContent.trimStart(), 'utf-8');
    fs.writeFileSync(path.join(folderPath, 'README.md'), readmeContent, 'utf-8');
}

function generateTsConfig() {
    const tsConfig = {
        compilerOptions: {
            target: 'es2020',
            module: 'commonjs',
            strict: true,
            esModuleInterop: true,
            forceConsistentCasingInFileNames: true,
            skipLibCheck: true
        }
    };
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
}

function generatePackageJson() {
    const packageJson = {
        "name": "challenge-generator",
        "version": "1.0.0",
        "type": "module",
        "scripts": {
            "reto": "deno run --allow-all run.ts",
            "links": "bash ./crear_symlinks_automaticos.sh",
            "challenges": "deno run -A create_challenges.ts",
            "readme": "deno run --allow-read --allow-write generate_readme.ts",
            "list": "pnpm run reto --list",
            "clear": "pnpm run reto --clean",
            "format": "deno fmt",
            "lint": "deno lint"
        },
        "devDependencies": {
            "jest": "^29.0.0",
            "typescript": "^5.0.0",
            "@types/jest": "^29.0.0"
        }
    };
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}

function main() {
    const jsonPath = 'retos_mouredev.json';
    const challenges = loadChallenges(jsonPath);
    const completedSet = loadCompletedChallenges(REPORT_PATH);

    fs.mkdirSync(BASE_DIR, { recursive: true });

    let processed = 0;

    challenges.forEach((challenge) => {
        const number = challenge.number.replace('#', '').padStart(2, '0');

        if (completedSet.has(number)) {
            console.log(`⏭️  Reto ${number} ya completado. Saltando...`);
            return;
        }

        createChallengeFiles(challenge);
        processed++;
    });

    generateTsConfig();
    generatePackageJson();

    console.log(`✅ ${processed} retos generados (excluyendo los completados).`);
}

main();
