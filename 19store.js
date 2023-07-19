import { reactive } from 'vue'

const COLS = 5
const ROWS = 20

export const cells = reactive(
  Array.from(Array(COLS).keys()).map((i) =>
    Array.from(Array(ROWS).keys()).map((i) => '')
  )
)
/*cellsはVueのreactive関数によってリアクティブなデータとして作成されます。
2次元の配列であり、COLS（列数）とROWS（行数）で指定されたサイズを持ちます。
各セルには初期値として空の文字列が設定されます。 */

// adapted from https://codesandbox.io/s/jotai-7guis-task7-cells-mzoit?file=/src/atoms.ts
// by @dai-shi
export function evalCell(exp) {
  if (!exp.startsWith('=')) {
    return exp
  }

  // = A1 + B2 ---> get(0,1) + get(1,2)
  exp = exp
    .slice(1)
    .replace(
      /\b([A-Z])(\d{1,2})\b/g,
      (_, c, r) => `get(${c.charCodeAt(0) - 65},${r})`
    )

  try {
    return new Function('get', `return ${exp}`)(getCellValue)
  } catch (e) {
    return `#ERROR ${e}`
  }
}
/*evalCell関数は、与えられた式（exp）を評価し、セルの値を返すための関数です。
式が=で始まらない場合は、そのままの値を返します。
式が=で始まる場合は、式内のセル参照（例: A1、B2）を実際の値に変換して評価します。
セル参照はget関数を使用して変換されます。 */

function getCellValue(c, r) {
  const val = evalCell(cells[c][r])
  const num = Number(val)
  return Number.isFinite(num) ? num : val
}
/*getCellValue関数は、指定された位置のセルの値を取得するためのヘルパー関数です。
この関数は再帰的に呼び出され、セルの値が数値であれば数値として返し、
そうでなければそのままの値を返します。*/