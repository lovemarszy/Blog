const tagDescriptions = [
  { name: '坐下聊聊', desc: '我的一些思考和想法' },
  { name: '奇思妙想', desc: '一个一个梦飞出了天窗' },
  { name: '小玩具', desc: '我买过的一些有意思的小玩意' },
  { name: '书影音', desc: '多看，多读，多听' },
  { name: '人间账本', desc: '这迷人又危险的世界啊' },
]

/** @param {readonly string[]} tags */
export function getTagIndex(tags) {
  const activeTags = new Set(tags)
  const knownTags = tagDescriptions.filter(tag => activeTags.has(tag.name))
  const descriptions = new Map(tagDescriptions.map(tag => [tag.name, tag.desc]))
  const newTags = [...activeTags]
    .filter(name => !descriptions.has(name))
    .map(name => ({ name, desc: '' }))

  return [...knownTags, ...newTags]
}
