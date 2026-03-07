const urlAdmin = process.env.REACT_APP_SERVER_URL_ADMIN

export const TutorMocks: {[key: string]: any} = {
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
                has_newbie: true
            },
            {
                id: 2,
                full_name: 'MAX',
                tg: "http",
                created_at: '12.04.2042',
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
    [`${urlAdmin}/tutors/:id`]: {
        tutor: {
                id: 2,
                full_name: 'MAX',
                tg: "http",
                created_at: '12.04.5555',
                has_balance_negative: true,
                has_only_trial: true,
                has_newbie: false
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