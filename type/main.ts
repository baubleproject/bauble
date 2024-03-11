
export type ArrayElementType<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;

