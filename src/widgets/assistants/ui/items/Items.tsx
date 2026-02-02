import { FC } from "react";
import classes from './items.module.scss'
import { AssistantItemMobile, IAssistant } from "../../../../entities/assistant";
import { MyButton } from "../../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

interface IProps{
    assistants: IAssistant[];
}

export const Items: FC<IProps> = ({assistants}) => {

    const router = useNavigate()

    return (
        <section className={classes.items}>
            {assistants.map(assistant => 
                <AssistantItemMobile 
                    key={assistant.id}
                    assistant={assistant}
                >
                    <MyButton onClick={() => router('/assistant/' + assistant.id)}>
                        Подробнее
                    </MyButton>
                </AssistantItemMobile>
            )}
        </section>
    )
}