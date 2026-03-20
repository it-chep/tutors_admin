const urlAdmin = process.env.REACT_APP_SERVER_URL_ADMIN

export const TutorMocks: {[key: string]: any} = {
    [`${urlAdmin}/tutors/:id/contract`]: {
        contract_url: 'https://pfktpa.ru/api/uploads/pdfs/size-1748088919927-1.pdf'
    },
    [`${urlAdmin}/tutors/receipt/failer_check`]: {
        is_failer: false
    },
    [`${urlAdmin}/tutors/:id/penalties_bonuses`]: {
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
    [`${urlAdmin}/tutors/penalties_bonuses`]: {
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
    [`${urlAdmin}/tutors/:id/accruals`]: {
        accruals: [
            {
                id: 1,
                date: '2025-11-09 23:38:10',
                amount: '20 000',
                is_receipt: false,
            },
            {
                id: 22,
                date: '2025-10-14 12:40:00',
                amount: '28 000',
                is_receipt: false,
            },
            {
                id: 33,
                date: '2025-04-11 10:04:52',
                amount: '5 000',
                is_receipt: true,
            }
        ]
    },
    [`${urlAdmin}/tutors/archive`]: {
        tutors: [
            {
                id: 1,
                full_name: 'asdf',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: true,
                has_only_trial: false,
                has_newbie: true
            },
            {
                id: 2,
                full_name: 'MAX',
                tg: "http",
                created_at: '12.11.2020',
                has_balance_negative: true,
                has_only_trial: true,
                has_newbie: false
            },
            {
                id: 3,
                full_name: 'PAVEL',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: false,
                has_only_trial: false,
                has_newbie: false
            },
        ],
        tutors_count: 22
    },
    [`${urlAdmin}/tutors/filter`]: {
        tutors: [
            {
                id: 1,
                full_name: 'asdf',
                tg: "http",
                created_at: '02.04.2444',
                has_balance_negative: true,
                has_only_trial: false,
                has_newbie: true,
                is_failer: true,
            },
            {
                id: 2,
                full_name: 'MAX',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: true,
                has_only_trial: true,
                has_newbie: false,
                is_failer: true,
            },
            {
                id: 3,
                full_name: 'PAVEL',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: false,
                has_only_trial: false,
                has_newbie: false,
                is_failer: true,
            },
        ],
        tutors_count: 22
    },
    [`${urlAdmin}/tutors/:id`]: {
        tutor: {
                id: 2,
                full_name: 'MAX ff ff',
                tg: "http",
                phone: '89520941111',
                subject_name: 'math',
                subject_id: 1,
                cost_per_hour: '12',
                created_at: '12.04.5555',
                email: 'jopa@mail.ru',
                tg_admin_username: '',
                tg_admin_username_id: -1,
                is_archive: false,
            },
    },
    [`${urlAdmin}/tutors/:id/finance`]: {
        data: {
                amount: '1000',
                hours_count: '4',
                wages: 3000,
            },
    },
    [`${urlAdmin}/tutors`]: {
        tutors: [
            {
                id: 1,
                full_name: 'asdf',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: true,
                has_only_trial: false,
                has_newbie: true,
                is_failer: true,
            },
            {
                id: 2,
                full_name: 'MAX',
                tg: "http",
                created_at: '12.11.2020',
                has_balance_negative: true,
                has_only_trial: true,
                has_newbie: false,
                is_failer: false,
            },
            {
                id: 3,
                full_name: 'PAVEL',
                tg: "http",
                created_at: '12.04.2042',
                has_balance_negative: false,
                has_only_trial: false,
                has_newbie: false,
                is_failer: true,
            },
        ],
        tutors_count: 22
    },
    [`${urlAdmin}/tutors/:id/lessons`]: {
        lessons: [
            {
                "id": 1,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич",
                "date": "2023-01-02",
                "duration_minutes": 90
            },
            {
                "id": 2,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
            {
                "id": 3,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
            {
                "id": 4,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
            {
                "id": 5,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
            {
                "id": 6,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
            {
                "id": 7,
                "student_id": 1,
                "tutor_id": 1,
                "student_full_name": "Нечепорк Максим Алексеевич 222",
                "date": "2023-01-02",
                "duration_minutes": 120
            },
        ],
        lessons_count: 54
    },
};