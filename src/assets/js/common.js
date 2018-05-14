export function handleBack(url) {
    window.history.length > 1 ?
      this.$router.go(-1) :
      this.$router.push('/')
}