import { load } from 'js-yaml'

interface Block {
  metadata: Record<string, unknown>;
  content: string;
}

export interface ParseMD {
  (contents: string): Block[];
}

const chunks = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )

// 主解析函数
const parseMD: ParseMD = (contents) => {
  try {
    const blocks = contents
      .split(/^---$/m)
      .map((block) => block.trim())
      .filter(Boolean)

    if (blocks.length === 1) {
      return [
        {
          metadata: {},
          content: blocks[0],
        },
      ]
    }

    return chunks(blocks, 2).map(([metaBlock, contentBlock = '']) => ({
      metadata: metaBlock ? (load(metaBlock) as Record<string, unknown>) : {},
      content: contentBlock,
    }))
  } catch (error) {
    console.error('Failed to parse markdown:', error)
    return [{ metadata: {}, content: contents }]
  }
}

export default parseMD
