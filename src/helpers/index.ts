export const inDevelopment: boolean = process.env.NODE_ENV === 'development';

export function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}