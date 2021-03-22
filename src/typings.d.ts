/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: {
    root: string;
    handle: string;
  };
  export default content;
}
