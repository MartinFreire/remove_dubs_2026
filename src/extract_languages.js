const fs = require('fs');

const file = process.argv[2] || '../data/extracted.html';
const html = fs.readFileSync(file, 'utf8');

// Match <cite itemprop="name">...</cite>, content may span multiple lines
const citeRegex = /<cite\s+itemprop="name">([\s\S]*?)<\/cite>/g;

// Match a trailing parenthetical, supporting one level of nesting: (Foo (Bar))
const langRegex = /\(([^()]*\([^()]*\)[^()]*|[^()]+)\)\s*$/;

const languages = new Set();
let match;

while ((match = citeRegex.exec(html)) !== null) {
    const text = match[1].replace(/\s+/g, ' ').trim();
    const langMatch = text.match(langRegex);
    if (langMatch) {
        languages.add(langMatch[1].trim());
    }
}

const sorted = [...languages].sort();
fs.writeFileSync('./languages.json', JSON.stringify(sorted, null, 2));
console.log(`Wrote ${sorted.length} languages to languages.json`);
