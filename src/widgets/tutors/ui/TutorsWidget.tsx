import { FC, useEffect, useState } from "react";
import classes from './tutorsWidget.module.scss'
import { MyButton } from "../../../shared/ui/button";
import { LoaderSpinner } from "../../../shared/ui/spinner";
import { AuthError } from "../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../entities/my";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ITutor, TutorItem, TutorItemMobile, tutorService } from "../../../entities/tutor";
import { SearchItems } from "../../../features/searchItems";

interface IProps {
    request: () => Promise<{tutors: ITutor[], tutors_count: number}>
    highlight?: boolean;
}

export const TutorsWidget: FC<IProps> = ({request, highlight=true}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [tutors, setTutors] = useState<ITutor[]>([])
    const [tutorsSearch, setTutorsSearch] = useState<ITutor[]>([])
    const [tutorsCount, setTutorsCount] = useState<number>(0)

    const [params] = useSearchParams()

    const router = useNavigate()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()

    const getData = async (req: () => Promise<{tutors: ITutor[], tutors_count: number}>) => {
        try{
            setIsLoading(true)
            const tutorsRes = await req()
            setTutors(tutorsRes.tutors)
            setTutorsSearch(tutorsRes.tutors)
            setTutorsCount(tutorsRes.tutors_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении списка репетиторов', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    const onSelectedFilters = () => {
        const tgAdminIds = params.getAll('tg_admin_ids').map(id => parseInt(id, 10)).filter(id => !isNaN(id))
        const isFailer = !!params.get('is_failer')
        if(tgAdminIds.length || isFailer){
            getData(() => tutorService.getAllByFilters(tgAdminIds, isFailer))
        }
        else{
            getData(request)
        }
    }

    useEffect(() => {
        onSelectedFilters()
    }, [params])

    return (
        <section className={classes.container}>
            <section className={classes.search}>
                <section className={classes.searchItems}>
                    <SearchItems
                        placeholder="Введите фио репетитора"
                        items={tutors.map(
                            tutor => ({...tutor, name: tutor.full_name})
                        )}
                        setItems={setTutorsSearch}
                    />
                </section>
                {
                    !isLoading
                        &&
                    <section className={classes.tutorsCount}>
                        Кол-во репетиторов: {tutorsCount}
                    </section>
                }
            </section>
            {
                isLoading
                    ?
                <section className="loader"><LoaderSpinner /></section>
                    :
                <>
                    <table className={classes.table}>
                        <thead>
                            <tr className={classes.item}>
                                <th>ID</th>
                                <th>ФИО</th>
                                <th>Телеграм</th>
                                <th>Без чека</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutorsSearch.map(tutor =>
                                <TutorItem
                                    highlight={highlight}
                                    key={tutor.id}
                                    tutor={tutor}
                                >
                                    <MyButton onClick={() => router('/tutor/' + tutor.id)}>
                                        Подробнее
                                    </MyButton>
                                </TutorItem>
                            )}
                        </tbody>
                    </table>
                    <section className={classes.items}>
                       {tutorsSearch.map(tutor =>
                            <TutorItemMobile
                                key={tutor.id}
                                tutor={tutor}
                                highlight={highlight}
                            >
                                <section className={classes.button}>
                                    <MyButton onClick={() => router('/tutor/' + tutor.id)}>
                                        Подробнее
                                    </MyButton>
                                </section>
                            </TutorItemMobile>
                        )}
                    </section>
                </>
            }
        </section>
    )
}
