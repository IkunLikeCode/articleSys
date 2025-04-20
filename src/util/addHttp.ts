/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 为列表中每个对象指定键的值添加 HTTP 前缀。
 * 
 * @template T - 泛型类型，虽然声明但当前未使用。
 * @param list - 包含对象的数组，数组元素类型任意。
 * @param key - 用于匹配对象属性的键名，需要添加 HTTP 前缀的属性键。
 * @returns 返回一个新的数组，其中每个对象指定键的值已添加 HTTP 前缀。
 */
function addHttp(list: any[], key: string) {
  // 使用 map 方法遍历列表中的每个对象
  const newList: any[] = list.map((item) => {
    // 遍历对象的每个键
    for (const k in item) {
      // 检查当前键是否与指定的键匹配
      if (key === k) {
        // 如果匹配，则返回一个新对象，将指定键的值添加 HTTP 前缀
        return {
          ...item,
          [key]: 'http://127.0.0.1:7001' + item[key]
        };
      }
    }
  });
  // 返回处理后的新列表
  return newList;
}

export default addHttp;