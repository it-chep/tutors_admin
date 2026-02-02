import { FC } from "react";
import classes from './table.module.scss'
import { AssistantItem, IAssistant } from "../../../../entities/assistant";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

interface IProps{
    assistants: IAssistant[];
}

export const Table: FC<IProps> = ({assistants}) => {

    const router = useNavigate()

    return (
        <table className={classes.table}>
            <thead>
                <tr className={classes.item}>
                    <th>ID</th>
                    <th>ФИО</th>
                    <th>Телеграм</th>
                </tr>
            </thead>
            <tbody>
                {assistants.map(assistant => 
                    <AssistantItem 
                        key={assistant.id}
                        assistant={assistant}
                    >
                        <MyButton onClick={() => router('/assistant/' + assistant.id)}>
                            Подробнее
                        </MyButton>
                    </AssistantItem>
                )}
            </tbody>
        </table>
    )
}