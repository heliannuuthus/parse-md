import { load } from "js-yaml";
const parseMD = (contents) => {
  const blocks = contents.split(/^---$/m);
  const results = [];
  const validBlocks = blocks.filter((block) => block.trim());
  for (let i = 0; i < validBlocks.length; i += 2) {
    const metadata = validBlocks[i] ? load(validBlocks[i].trim()) : {};
    const content = validBlocks[i + 1] ? validBlocks[i + 1].trim() : "";
    results.push({
      metadata,
      content,
    });
  }
  return results;
};
export default parseMD;