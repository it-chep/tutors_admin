import { FC } from "react";
import classes from './items.module.scss'
import { CommentItem, IComment, studentService } from "../../../../entities/student";
import { DeleteAction } from "../../../../features/deleteAction";

interface IProps{
    comments: IComment[];
    studentId: number;
}

export const Items: FC<IProps> = ({comments, studentId}) => {

    const onDelete = async (commentId: number) => {
        await studentService.deleteComment(studentId, commentId)
    }

    return (
        <section className={classes.items}>
            {comments.map((comment) => 
                <CommentItem  
                    key={comment.id} 
                    comment={comment} 
                >
                    <DeleteAction
                        questionText="Вы точно хотите удалить комментарий"
                        errorText="Ошибка при удалении комментария"
                        successText="Успешное удаление комментария"
                        onDelete={() => onDelete(comment.id)}
                    />
                </CommentItem>
            )}
        </section>
    )
}