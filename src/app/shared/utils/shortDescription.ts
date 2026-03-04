export function shortDescription(description: string): string {
    if (!description) return '';
    return description.length > 160 ? description.slice(0, 160) + '...' : description
}
