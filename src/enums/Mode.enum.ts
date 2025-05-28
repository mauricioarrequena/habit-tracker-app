export const ModeEnum = {
  CREATE: 1,
  EDIT: 2,
} as const;

export type ModeEnum = (typeof ModeEnum)[keyof typeof ModeEnum];
