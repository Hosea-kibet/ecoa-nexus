export function classNames(...classes: (String | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
