import assert from 'node:assert/strict'
import test from 'node:test'
import { getTagIndex } from '../lib/tag-index.mjs'

test('existing tag order and descriptions remain unchanged', () => {
  assert.deepEqual(getTagIndex(['人间账本', '书影音', '小玩具', '奇思妙想', '坐下聊聊']), [
    { name: '坐下聊聊', desc: '我的一些思考和想法' },
    { name: '奇思妙想', desc: '一个一个梦飞出了天窗' },
    { name: '小玩具', desc: '我买过的一些有意思的小玩意' },
    { name: '书影音', desc: '多看，多读，多听' },
    { name: '人间账本', desc: '这迷人又危险的世界啊' },
  ])
})

test('new article tags appear without manual index edits or duplicates', () => {
  assert.deepEqual(getTagIndex(['旅行', '坐下聊聊', '旅行', '日常']), [
    { name: '坐下聊聊', desc: '我的一些思考和想法' },
    { name: '旅行', desc: '' },
    { name: '日常', desc: '' },
  ])
})

test('categories without articles do not create links to unavailable tag pages', () => {
  assert.deepEqual(getTagIndex([]), [])
  assert.deepEqual(getTagIndex(['书影音']), [{ name: '书影音', desc: '多看，多读，多听' }])
})
