declare module '*.less' {
  const resource: { [key: string]: any };
  export = resource;
}

declare module '*.png' {
  const resource: string;
  export = resource;
}

declare module '*.jpg' {
  const resource: string;
  export = resource;
}
