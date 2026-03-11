const urlAdmin = process.env.REACT_APP_SERVER_URL_ADMIN

export const StudentMocks: {[key: string]: any} = {
    [`${urlAdmin}/students/:id/notifications`]: {
        notifications: [
            {
                id: 1,
                created_at: '2025-11-09 23:38:10',
            },
            {
                id: 2,
                created_at: '2025-11-09 15:53:00',
            },
             {
                id: 3,
                created_at: '2025-10-03 12:30:00',
            },
        ],
        notifications_count: 3
    },
    [`${urlAdmin}/students`]: {
        students:  [
            {
                "id": 1,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                parent_full_name: 'Калашников Павел Сергеевич',
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false,
                balance: '1000',
                payment_name: 'Альфа',
            },
            {
                "id": 2,
                "first_name": "Максим",
                "last_name": "Пвввкк",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                parent_full_name: 'adsads',
                "is_balance_negative": true,
                "is_newbie": false,
                balance: '44000',
                payment_name: 'Точка',
            },
            {
                "id": 3,
                "first_name": "Павел",
                "last_name": "Калашников",
                parent_full_name: 'adsads',
                "middle_name": "Сергеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": false,
                "is_balance_negative": false,
                "is_newbie": false,
                balance: '12000',
                payment_name: 'Т-Банк',
            },
        ],
        students_count: 100,
    },
    [`${urlAdmin}/students/archive`]: {
        students:  [
            {
                "id": 1,
                "first_name": "Максим",
                "last_name": "Нечепорук",
                parent_full_name: 'Калашников Павел Сергеевич',
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                "is_balance_negative": false,
                "is_newbie": false,
                balance: '1000',
                payment_name: 'Альфа',
            },
            {
                "id": 2,
                "first_name": "Максим",
                "last_name": "Пвввкк",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                parent_full_name: 'adsads',
                "is_balance_negative": true,
                "is_newbie": false,
                balance: '44000',
                payment_name: 'Точка',
            },
            {
                "id": 3,
                "first_name": "Павел",
                "last_name": "Калашников",
                parent_full_name: 'adsads',
                "middle_name": "Сергеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": false,
                "is_balance_negative": false,
                "is_newbie": false,
                balance: '12000',
                payment_name: 'Т-Банк',
            },
        ],
        students_count: 100,
    },
    [`${urlAdmin}/students/filter`]: {
        students:  [
            {
                "id": 2,
                "first_name": "Максим",
                "last_name": "Пвввкк",
                "middle_name": "Алексеевич",
                "tg": "https://t.me/maxim_jordan",
                "is_only_trial_finished": true,
                parent_full_name: 'adsads',
                "is_balance_negative": true,
                "is_newbie": false,
                balance: '-1200'
            },
        ],
        students_count: 134
    },
    [`${urlAdmin}/students/:id/lessons`]: {
        lessons: [
            {
                "id": 1,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич",
                "date": "2025-11-08 23:37:00",
                "duration_minutes": 90
            },
            {
                "id": 2,
                "student_id": 2,
                "tutor_id": 4,
                "student_full_name": "Калашников Павел Сергеевич",
                "date": "2025-12-29 18:27:00",
                "duration_minutes": 120
            }
        ],
        lessons_count: 1314
    },
    [`${urlAdmin}/students/:id/transactions`]: {
        transactions: [
            {
                id: "2",
                created_at: "29.12.2025, 18:30",
                amount: "1200",
                is_confirmed: true,
            },
            {
                id: "3",
                created_at: "23.12.2025, 12:30",
                amount: "34400",
                is_confirmed: false,
            },
            {
                id: "5",
                created_at: "12.04.2025, 21:30",
                amount: "14000",
                is_confirmed: true
            },
        ],
        transactions_count: 25
    },
    [`${urlAdmin}/students/tg_admins_usernames`]: {
        tg_admins: [
            {
                id: 1,
                name: "@maxim_jordan",
            },
            {
                id: 2,
                name: "@danzelVash",
            },
             {
                id: 3,
                name: "@kalashnikoff069",
            },
        ],
    },
    [`${urlAdmin}/subjects`]: {
        subjects: [
            {
                id: 1,
                name: 'Математика'
            },
            {
                id: 2,
                name: 'Физика'
            }
        ]
    },
    [`${urlAdmin}/students/:id`]: {
        student: {
            "id": 593,
            "first_name": "Тест",
            "last_name": "Тест",
            "middle_name": "10",
            "phone": "7",
            "tg": "https://t.me/7272",
            "cost_per_hour": "600",
            "subject_name": "Математика",
            "tutor_id": 1,
            created_at: '12.07.2025',
            "tutor_name": "12345",
            "parent_full_name": "Лвлвла",
            "parent_phone": "8383838",
            "parent_tg": "https://t.me/Влвлв",
            "tg_admin_username": "Лала",
            "balance": "0",
            "is_only_trial_finished": true,
            "is_balance_negative": false,
            "is_newbie": false,
            "tg_id": 0,
            "is_archive": false,
            "payment_name": "Неизвестная платежка",
            "payment_id": 0,
            "payment_url": ""
        }
    },
};