// Get random array item
export const getRandomArrayElement = (items: any[]) => items[Math.floor(Math.random() * items.length)];

// Sort by latest
export const sortArrayByDate = (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime();

// Remove duplicates from array i.e. [1,1,1,2,3,4] => [1,2,3,4]
export const uniqueArray = (a: any[]) => Array.from(new Set(a));
