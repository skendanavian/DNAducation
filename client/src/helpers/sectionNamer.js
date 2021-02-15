export default function sectionNamer() {
  return {
    ref:{},
    getName: function(code) {
      this.ref[code] = this.ref[code] ? this.ref[code] + 1 : 1;
      return String.fromCharCode(64 + this.ref[code]) 
    }
  }
}