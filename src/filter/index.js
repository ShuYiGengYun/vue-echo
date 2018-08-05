export default {
  // 时间处理
  sec2his: t => {
    if (~~t || t < 1) {
      let tt = Math.round(t)
      let m = Math.floor(t / 60)
      let s = tt % 60
      m = m >= 10 ? m : '0' + m
      s = s >= 10 ? s : '0' + s
      return m + ':' + s
    } else {
      return t
    }
  }
}
