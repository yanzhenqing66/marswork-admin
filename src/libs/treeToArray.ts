/**
 * 拆解树为数组，
 * @param tree          {Array}          树形数组
 * @param children_key  {String}         子集对象 'key'
 * @return {[]} 树形被拆解后的数组
 */
export default function untieTree(tree: Array<any>, children_key: string = 'children'): [] {
  if (!!!tree || Object.prototype.toString.call(tree) !== '[object Array]' || tree.length <= 0) return []
  const temp: any = []
  tree.forEach((item) => {
    temp.push(item.id, ...untieTree(item[children_key], children_key))
  })
  return temp
}
