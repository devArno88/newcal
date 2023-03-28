// Get random array item
export const getRandomArrayElement = (items: any[]) => items[Math.floor(Math.random() * items.length)];

// Array sorters
export const sortArrayByDate = (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime();
export const sortByUpdated = (a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();

// Remove duplicates from array i.e. [1,1,1,2,3,4] => [1,2,3,4]
export const uniqueArray = (a: any[]) => Array.from(new Set(a));
