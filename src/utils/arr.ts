export const getRandomArrayElement = (items: any[]) => items[Math.floor(Math.random() * items.length)];

export const sortArrayByDate = (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime();
