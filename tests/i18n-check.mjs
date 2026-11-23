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

assert.equal(translations.en['IA'], 'AI')
assert.equal(translations.es['IA'], 'IA')
assert.equal(translations.es['🤖IA'], '🤖IA')
assert.equal(translations['zh-CN']['UML'], '统一建模语言（UML）')
assert.equal(translations['zh-CN']['API'], '应用程序编程接口（API）')
assert.ok(translations['zh-CN']['UML & Arquitetura'].includes('统一建模语言（UML）'))
for (const language of ['en', 'es', 'zh-CN']) {
  for (const [title, name] of [['Auto Mais', 'Auto Mais'], ['MailerWeb — Portal v2', 'MailerWeb'], ['Acion Desktop', 'Acion'], ['DeAaZ Tur', 'DeAaZ'], ['Aerofobia VR', 'Aerofobia']]) {
    assert.ok(translations[language][title].includes(name), `${language}: nome próprio alterado: ${name}`)
  }
}
const erpProject = projects.find(({ title }) => title === 'Acion Desktop')
assert.ok(translations['zh-CN'][erpProject.description].includes('企业资源规划（ERP）'))
assert.ok(translations['zh-CN'][erpProject.description].includes('应用程序编程接口（API）'))
console.log('Siglas e nomes próprios verificados.')
assert.equal(translations.en['Meu Dinheiro na Mão'], 'My Money in Hand')
assert.equal(translations.es['Meu Dinheiro na Mão'], 'Mi dinero en mano')
assert.equal(translations['zh-CN']['Meu Dinheiro na Mão'], '手中的钱')
