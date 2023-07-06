export function valueToPoint(value, index, total) {
    const x = 0
    const y = -value * 0.8
    const angle = ((Math.PI * 2) / total) * index
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const tx = x * cos - y * sin + 100
    const ty = x * sin + y * cos + 100
    return {
      x: tx,
      y: ty
    }
  }

  /** :const y = -value * 0.8: y 座標の値を -value * 0.8 とします。
  与えられた値 value を -0.8 倍した値が y 座標となります。
  これにより、値が大きいほど負の方向に座標が移動します。
  :const tx = x * cos - y * sin + 100: 座標変換を行い、回転後の x 座標を計算します。
  元の座標 (x, y) を角度の cos と sin を使用して変換し、100 を加算します。
  この変換により、座標が回転して平行移動します。**/