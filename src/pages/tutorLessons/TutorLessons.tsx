import { TUTOR_LESSONS_ROUTE } from "../../app/router/routes";
import { useAppSelector } from "../../app/store/store";
import { Lessons } from "../../widgets/lessons";
import { LayoutPages } from "../layoutPages";

export default function TutorLessonsPage() {

    const {my} = useAppSelector(s => s.myReducer)

    return (
        <LayoutPages title={TUTOR_LESSONS_ROUTE.name}>
            <Lessons tutorId={my.id} showFio={true} />
        </LayoutPages>
    )
}