const urlAdmin = process.env.REACT_APP_SERVER_URL_ADMIN

export const AdminMocks: {[key: string]: any} = {
    [`${urlAdmin}/admins`]: {
        admins:  [
            {
                "id": 1,
                full_name: 'КПС',
                tg: 'TG https 111 1 1 1 1'
            }, 
            {
                "id": 2,
                full_name: 'Калашников Павел Сергеевич',
                tg: 'TG вввв'
            },
            {
                "id": 3,
                full_name: 'Нечепорк Максим Алексеевич',
                tg: 'TG ыв ы ывывы в'
            },
        ]
    },
    [`${urlAdmin}/payments`]: {
        payments:  [
            {
                payment_id: 1,
                payment_name: 'Альфа',
            }, 
            {
                payment_id: 2,
                payment_name: 'Т-Банк',
            }, 
            {
                payment_id: 3,
                payment_name: 'Точка',
            }, 
        ]
    },
    [`${urlAdmin}/admins/:id`]: {
        admin: 
            {
                "id": 1,
                full_name: 'Нечепорк Максим Алексеевич 222',
                phone: '88888',
                tg: 'TG'
            },
    },
    [`${urlAdmin}/transactions`]: {
        transactions: [
            {
                id: "1",
                created_at: '04.11.2025 12:00:15',
                amount: '1200',
                is_confirmed: true,
                student_id: 1,
                student_name: 'Max'
            },
            {
                id: "2",
                created_at: '02.10.2025 17:10:15',
                amount: '4200',
                is_confirmed: false,
                student_id: 1,
                student_name: 'Max'
            },
            {
                id: "3",
                created_at: '06.11.2025 14:04:01',
                amount: '500',
                is_confirmed: true,
                student_id: 2,
                student_name: 'Pavel'
            },
            {
                id: "4",
                created_at: '06.11.2025 14:04:01',
                amount: '500',
                is_confirmed: true,
                student_id: 1,
                student_name: 'Max'
            },
            {
                id: "5",
                created_at: '06.11.2025 14:04:01',
                amount: '500',
                is_confirmed: true,
                student_id: 1,
                student_name: 'Max'
            },
        ],
        transactions_count: 34,
    },
    [`${urlAdmin}/lessons`]: {
        lessons: [
            {
                "id": 1,
                "student_id": 1,
                "tutor_id": 1,
                "student_name": 'Нечепорк Максим Алексеевич',
                "tutor_name": "Нечепорк Максим Алексеевич брат близнец",
                "created_at": "2023-01-02 15:37:00",
                "duration_in_minutes": 90,
            },
            {
                "id": 2,
                "student_id": 2,
                "tutor_id": 2,
                "student_name": 'Нечепорк Максим Алексеевич 2',
                "tutor_name": "Нечепорк Максим Алексеевич брат близнец 2",
                "created_at": "2025-10-13 11:35:00",
                "duration_in_minutes": 120,
            }
        ],
        total_hours: 12,
        lessons_count: 134
    },
};