import { FC, useCallback, useEffect, useState } from "react";
import { IComment, studentService } from "../../../../entities/student";
import { useGlobalMessageActions } from "../../../../entities/globalMessage";
import { useMyActions } from "../../../../entities/my";
import { AuthError } from "../../../../shared/err/AuthError";
import classes from './studentComments.module.scss'
import { OpenContainer } from "../../../../features/openContainer";
import { LoaderSpinner } from "../../../../shared/ui/spinner";
import { Items } from "../items/Items";
import { CreateComment } from "../../../../features/createComment";

interface IProps {
    studentId: number;
}

export const StudentComments: FC<IProps> = ({studentId}) => {

    const [comments, setComments] = useState<IComment[]>([])  
    const [count, setCount] = useState<number>(0)  
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setGlobalMessage} = useGlobalMessageActions()    
    const {setIsAuth} = useMyActions()

    const getComments = useCallback(async () => {
        try{
            setIsLoading(true)
            const commentsRes = await studentService.getComments(studentId)
            setComments(commentsRes.comments)
            setCount(commentsRes.comments_count)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при получении комментариев студента', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        getComments()
    }, [])

    const commentAdded = () => {
        getComments()
    }

    return (
        <section className={classes.container}>
            <OpenContainer title="Комментарии">
                <section className={classes.content}>
                    <CreateComment 
                        studentId={studentId} 
                        onSuccess={commentAdded} 
                    />
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        <>
                            <section className={classes.count}>Кол-во комментариев: {count}</section>
                            {
                                comments.length
                                    ?
                                <Items 
                                    studentId={studentId}
                                    comments={comments} 
                                />
                                    :
                                <></>
                            }
                        </>
                    }
                </section>
            </OpenContainer>
        </section>
    )
}