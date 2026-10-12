import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'
import { parseContentDate } from '../lib/content-date.mjs'

test('article dates retain the same day across build time zones', () => {
  const moduleUrl = new URL('../lib/content-date.mjs', import.meta.url).href
  const source = `
    import { parseContentDate } from ${JSON.stringify(moduleUrl)};
    const dates = ['2026/01/03', '2023/2/7', '2023-02-09'];
    console.log(JSON.stringify(dates.map(date => parseContentDate(date).toISOString())));
  `
  const expected = [
    '2026-01-03T00:00:00.000Z',
    '2023-02-07T00:00:00.000Z',
    '2023-02-09T00:00:00.000Z',
  ]

  for (const TZ of ['UTC', 'Asia/Kuala_Lumpur', 'America/Los_Angeles']) {
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', source], {
      encoding: 'utf8',
      env: { ...process.env, TZ },
    })
    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(JSON.parse(result.stdout), expected, TZ)
  }
})

test('invalid calendar dates fail instead of rolling into the next month', () => {
  for (const date of ['2023/02/29', '2026/02/30', '2026/13/01', '2026/01/00']) {
    assert.equal(parseContentDate(date), null, date)
  }
  assert.equal(parseContentDate('2024/02/29').toISOString(), '2024-02-29T00:00:00.000Z')
})

test('missing dates and ambiguous timestamps are rejected; explicit timestamps remain valid', () => {
  for (const value of [undefined, null, '', 'invalid', 20260103, '2026-01-03T00:00:00']) {
    assert.equal(parseContentDate(value), null)
  }
  assert.equal(
    parseContentDate('2026-01-03T08:00:00+08:00').toISOString(),
    '2026-01-03T00:00:00.000Z',
  )
  assert.equal(
    parseContentDate(new Date('2026-01-03T00:00:00Z')).toISOString(),
    '2026-01-03T00:00:00.000Z',
  )
  assert.equal(parseContentDate(new Date('invalid')), null)
})
