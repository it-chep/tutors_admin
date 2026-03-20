import { FC } from "react";
import classes from './adminDownloadTutors.module.scss'
import { Dropdown } from "../../../shared/ui/dropdown";
import { DownloadAllTutorsContracts } from "../../../features/downloadAllTutorsContracts";
import { DownloadAllTutorsReceipts } from "../../../features/downloadAllTutorsReceipts";

export const AdminDownloadTutors: FC = () => {

    return (
        <Dropdown
            title={<span className={classes.actionSign}>Архивы</span>}
        >
            <section className={classes.features}>
                <DownloadAllTutorsContracts />
                <span className={classes.hr} />
                <DownloadAllTutorsReceipts />
            </section>
        </Dropdown>
    )
}