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
                tg_admins_usernames: [{
                    id: 1,
                    name: '@maxim_jordan'
                }],
                can_view_contracts: false,
                can_penalize_assistants: [1]
            },
    },
    [`${urlAdmin}/assistants/:id/penalties_bonuses`]: {
        items: [
            {
                id: 1,
                type: 'bonus',
                amount: '2 000',
                comment: 'Сообщение 1',
                created_at: '2025-11-09 23:38:10',
            },
            {
                id: 2,
                type: 'bonus',
                amount: '6 000',
                comment: 'Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2',
                created_at: '2025-11-09 23:38:10',
            },
            {
                id: 3,
                type: 'penalty',
                amount: '4 000',
                comment: 'Сообщение 3',
                created_at: '2025-04-11 10:04:52',
            },
            {
                id: 4,
                type: 'bonus',
                amount: '10 000',
                comment: 'Сообщение 4',
                created_at: '2025-04-11 10:04:52',
            },
        ],
        summary: {
            penalties: '132',
            bonuses: '20'
        }
    },
    [`${urlAdmin}/assistants/penalties_bonuses`]: {
        items: [
            {
                id: 1,
                type: 'bonus',
                amount: '2 000',
                comment: 'Сообщение 1',
                created_at: '2025-11-09 23:38:10',
            },
            {
                id: 2,
                type: 'bonus',
                amount: '6 000',
                comment: 'Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2 Сообщение 2',
                created_at: '2025-11-09 23:38:10',
            },
            {
                id: 3,
                type: 'penalty',
                amount: '4 000',
                comment: 'Сообщение 3',
                created_at: '2025-04-11 10:04:52',
            },
            {
                id: 4,
                type: 'bonus',
                amount: '10 000',
                comment: 'Сообщение 4',
                created_at: '2025-04-11 10:04:52',
            },
        ],
        summary: {
            penalties: '132',
            bonuses: '20'
        }
    },
};