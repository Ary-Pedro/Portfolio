import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { projects, projectGroups } from '../lib/projects.ts'

const translations = JSON.parse(readFileSync(new URL('../lib/translations.json', import.meta.url), 'utf8'))
for (const language of ['en', 'es', 'zh-CN']) {
  const dictionary = translations[language]
  for (const text of [...projects.flatMap(({ title, description }) => [title, description]), ...projectGroups.map(({ title }) => title), 'Engenheiro de Software', 'Escolher idioma']) {
    assert.ok(dictionary[text], `Tradução ausente em ${language}: ${text}`)
  }
}
console.log('Traduções dos projetos e grupos verificadas nos três idiomas.')
