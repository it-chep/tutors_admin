const urlAdmin = process.env.REACT_APP_SERVER_URL_ADMIN

export const AssistantMocks: {[key: string]: any} = {
    [`${urlAdmin}/assistant`]: {
        assistants:  [
            {
                id: 1,
                full_name: 'Калашников Павел Сергеевич',
                tg: 'TG'
            },
            {
                id: 2,
                full_name: 'Нечепорук ПС',
                tg: 'TG FFFFFFF'
            },
        ]
    },
    [`${urlAdmin}/assistant/:id`]: {
        assistant: 
            {
                id: 1,
                full_name: 'Калашников ПС',
                phone: '8 888 888 88 88',
                tg: 'https://TG...',
                created_at: '12.02.2026',
                tg_admins_usernames: ['@kalashnikoff069', '@maxim_jordan'],
            },
    },
};