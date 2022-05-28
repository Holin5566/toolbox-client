export function Case(type, reduce) {
  this.case = type;
  this.reduce = reduce;
  this.action = (payload) => {
    return { type, payload };
  };
}
