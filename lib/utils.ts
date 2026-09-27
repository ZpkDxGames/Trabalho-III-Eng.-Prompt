export function cx(...values: Array<string | false | undefined | null>) {
  return values.filter(Boolean).join(" ");
}

export function wrapStep(value: number, length: number) {
  return (value + length) % length;
}
