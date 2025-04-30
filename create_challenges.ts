import * as fs from 'node:fs';
import * as path from 'node:path';

interface Challenge {
    number: string;
    title: string;
    difficulty: string;
    description: string;
}

const BASE_DIR = 'retos';

const difficultyMap: Record<string, string> = {
    'Fácil': 'EASY',
    'Medio': 'MEDIUM',
    'Difícil': 'HARD'
};

function loadChallenges(jsonPath: string): Challenge[] {
    const raw = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(raw);
}

function createChallengeFiles(challenge: Challenge) {
    const number = challenge.number.replace('#', '').padStart(2, '0');
    const title = challenge.title;
    const difficulty = challenge.difficulty;
    const difficultyEN = difficultyMap[difficulty] || 'UNKNOWN';
    const description = challenge.description;

    const folderName = `reto-${number}`;
    const folderPath = path.join(BASE_DIR, folderName);
    fs.mkdirSync(folderPath, { recursive: true });

    const tsContent = `// ${difficultyEN}
// Reto ${number}: ${title}

export function solve() {
  // TODO: implementar
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
          it(" ", () => {
            const output = solve(9);
            expect(output[2]).toBe("Fizz");
          });
        })
`;

    const readmeContent = `# Reto ${number}: ${title}

**Dificultad:** ${difficulty}

## Enunciado

\
\`\`\`Javascript
${description.trim()}
\`\`\`
`;

    fs.writeFileSync(path.join(folderPath, 'index.ts'), tsContent, 'utf-8');
    fs.writeFileSync(path.join(folderPath, 'index.test.ts'), testContent, 'utf-8');
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
        name: 'challenge-generator',
        version: '1.0.0',
        type: 'module',
        scripts: {
            "reto": "deno run --allow-all run.ts"
        },
        devDependencies: {
            jest: '^29.0.0',
            typescript: '^5.0.0',
            '@types/jest': '^29.0.0'
        }
    };
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}

function main() {
    const jsonPath = 'retos_mouredev.json';
    const challenges = loadChallenges(jsonPath);

    fs.mkdirSync(BASE_DIR, { recursive: true });

    challenges.forEach(createChallengeFiles);
    generateTsConfig();
    generatePackageJson();

    console.log(`✅ ${challenges.length} carpetas generadas en: ${BASE_DIR}`);
}

main();