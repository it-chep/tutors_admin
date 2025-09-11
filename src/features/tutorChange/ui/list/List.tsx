import { FC, useEffect, useState } from "react";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { ISubject, subjectService } from "../../../../entities/subject";
import { DropDownListSelected } from "../../../../shared/ui/dropDownSelected";
import { ITutorCreate } from "../../../../entities/tutor";
import { IItem } from "../../../../shared/model/types";


interface IProps {
    tutor: ITutorCreate;
    setSubjectId: (id: number) => void;
}

export const List: FC<IProps> = ({tutor, setSubjectId}) => {

    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()
    const [subjects, setSubjects] = useState<ISubject[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getData = async () => {
        try{
            setIsLoading(true)
            const subjectsRes = await subjectService.getAll()
            setSubjects(subjectsRes)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: `Ошибка при получении списка предметов`, type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const onSelected = (item: IItem) => {
        return (selected: boolean) => setSubjectId(selected ? item.id : -1) 
    }

    return (
        <DropDownListSelected 
            isLoading={isLoading}
            selectedIdItems={[tutor.subject_id]}
            items={subjects}
            onSelected={onSelected}
        />
    )
}