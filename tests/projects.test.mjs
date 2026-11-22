import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as catalog from '../lib/projects.ts'

test('busca e filtros combinam categoria, destaque e texto', () => {
  assert.equal(typeof catalog.filterProjects, 'function')
  const sample = [
    { id: 1, title: 'API', description: 'Integração', technologies: ['Python'], category: 'equipe', status: 'completed', featured: true, label: 'Comercial', group: 'profissional', tags: ['IA'] },
    { id: 2, title: 'Site', description: 'Projeto', technologies: ['React'], category: 'individual', status: 'in_progress', featured: false, group: 'academico', tags: ['Unity'] },
  ]
  assert.deepEqual(catalog.filterProjects(sample, ' python ', 'featured').map((p) => p.id), [1])
  assert.deepEqual(catalog.filterProjects(sample, '', 'Comercial').map((p) => p.id), [1])
  assert.deepEqual(catalog.filterProjects(sample, 'python', 'in_progress'), [])
  assert.deepEqual(catalog.filterProjects(sample, '', 'IA').map((p) => p.id), [1])
  assert.deepEqual(catalog.filterProjects(sample, '', 'academico').map((p) => p.id), [2])
  assert.deepEqual(catalog.filterProjects(sample, 'unity', 'all').map((p) => p.id), [2])
  assert.deepEqual(catalog.filterProjects(sample, '', 'all').map((p) => p.id), [1, 2])
})

test('ordena grupos profissionais antes dos acadêmicos e datas conhecidas primeiro', () => {
  assert.equal(typeof catalog.sortProjects, 'function')
  const sample = [
    { id: 1, group: 'academico', year: 2024 },
    { id: 2, group: 'autonomo' },
    { id: 3, group: 'profissional', year: 2025 },
    { id: 4, group: 'autonomo', year: 2026 },
    { id: 5, group: 'autonomo', recent: true },
    { id: 6, group: 'autonomo', year: 2026, month: 2 },
  ]
  assert.deepEqual(catalog.sortProjects(sample).map((p) => p.id), [3, 5, 6, 4, 2, 1])
  assert.deepEqual(sample.map((p) => p.id), [1, 2, 3, 4, 5, 6])
})
