import { FC } from "react";
import classes from './changeActiveGPHAssistant.module.scss'
import { ToggleSwitch } from "../../../shared/ui/toggleSwitch";
import { AuthError } from "../../../shared/err/AuthError";
import { useGlobalLoadingActions } from "../../../entities/globalLoading";
import { useGlobalMessageActions } from "../../../entities/globalMessage";
import { useMyActions } from "../../../entities/my";
import { assistantService } from "../../../entities/assistant";

interface IProps {
    assistantId: number;
    isActive: boolean;
    setIsActive: (sActive: boolean) => void;
}

export const ChangeActiveGPHAssistant: FC<IProps> = ({assistantId, isActive, setIsActive}) => {

    const {setIsLoading} = useGlobalLoadingActions()
    const {setGlobalMessage} = useGlobalMessageActions()
    const {setIsAuth} = useMyActions()

    const onToggle = async (canViewContracts: boolean) => {
        try{
            setIsLoading(true)
            await assistantService.changePermissionsGPH(assistantId, canViewContracts)
            setIsActive(canViewContracts)
        }
        catch(e){
            console.log(e)
            if(e instanceof AuthError){
                setIsAuth(false)
                setGlobalMessage({message: e.message, type: 'error'})
            }
            else{
                setGlobalMessage({message: 'Ошибка при смене видимости ГПХ договора', type: 'error'})
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.container}>
            <span className={classes.sign}>Видимость ГПХ у репититора:</span>
            <ToggleSwitch 
                checked={isActive}
                onSelected={onToggle}
            />
        </section>
    )
}