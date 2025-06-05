export const formatDate = (raw: string) => {
    const date = new Date(raw);
    return new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }).format(date);
};