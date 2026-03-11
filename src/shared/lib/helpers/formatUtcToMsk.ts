


export const formatUtcToMsk = (value: string): string => {
    const date = new Date(`${value}Z`);  // указываем что время именно в UTC

    return value.includes(' ')
        ? date.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }) // дата + время 
        : date.toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' }); // только дата
};