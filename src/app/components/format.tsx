export function truncateName (name: string | null | undefined, limit: number = 20): string {
    if(!name) return "";
    if(name.length <= limit) return name;
    return name.substring(0, limit) + "...";
}