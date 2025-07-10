// ~/lib/utils.ts

/**
 * Utility function to join class names, ignoring falsy values.
 * Usage: cn('class1', condition && 'class2', ...)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const stripHtml = (html: string): string => html.replace(/<[^>]+>/g, '');