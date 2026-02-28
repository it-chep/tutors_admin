import { FC, useEffect, useState } from "react";
import classes from './tutorsArchive.module.scss'
import { ITutor, TutorItem, TutorItemMobile, tutorService } from "../../../../entities/tutor";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { AuthError } from "../../../../shared/lib/helpers/AuthError";
import { useMyActions } from "../../../../entities/my";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SearchItems } from "../../../../features/searchItems";
import { TutorFilters } from "../../../../features/tutorFilters";
import { TUTORS_ROUTE } from "../../../../app/router/routes";
import { MyButton } from "../../../../shared/ui/button";

export const TutorsArchive: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tutors, setTutors] = useState<ITutor[]>([])
    const [tutorsCount, setTutorsCount] = useState<number>(0)
    const [tutorsSearch, setTutorsSearch] = useState<ITutor[]>([])

    const [params] = useSearchParams()

    const {setIsAuth} = useMyActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const router = useNavigate()

    const getData = async (req: () => Promise<{tutors: ITutor[], tutors_count: number}>) => {
        try{
            setIsLoading(true)
            const tutorsRes = await req()
            setTutorsCount(tutorsRes.tutors_count)
            setTutors(tutorsRes.tutors)
            setTutorsSearch(tutorsRes.tutors)
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
        if(tgAdminIds.length){
            getData(() => tutorService.getAllByFilters(tgAdminIds, true))
        }
        else{
            getData(tutorService.getArchiveAll)
        }
    }

    useEffect(() => {
        onSelectedFilters()
    }, [params])

    return (
        <section className={classes.container}>
            <section className={classes.header}>
                <section className={classes.filter}>
                    <TutorFilters onSelectedFilters={onSelectedFilters} />
                </section>
                <Link to={TUTORS_ROUTE.path}>
                    К активным репетиторам
                </Link>
            </section>
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
                            </tr>
                        </thead>
                        <tbody>
                            {tutorsSearch.map(tutor =>
                                <TutorItem
                                    key={tutor.id}
                                    tutor={tutor}
                                    highlight={false}
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
                                highlight={false}
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
