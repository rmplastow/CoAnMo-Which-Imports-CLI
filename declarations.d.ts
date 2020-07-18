interface String {
  padEnd(targetLength: number, padString?: string): string;
}

interface Array<T> {
  find(
    predicate: (value: T, index: number, obj: Array<T>) => boolean,
    thisArg?: any
  ): T | undefined;
}

interface Window {
  COANMO_GLOBAL_OBJECT: {
    [key:string]: string | number | boolean | null
  }
}