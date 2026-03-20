import { FC, PropsWithChildren } from "react";
import { IComment } from "../../model/types";
import classes from './commentItem.module.scss'
import { LabelText } from "../../../../shared/ui/sign";
import { formatUtcToMsk } from "../../../../shared/lib/helpers/formatUtcToMsk";

interface IProps {
    comment: IComment;
}

export const CommentItem: FC<IProps & PropsWithChildren> = ({comment, children}) => {
    return (
        <section
            className={classes.item}
        >
            <section className={classes.header}>
                <section className={classes.date}>
                    {formatUtcToMsk(comment.created_at)} (мск)
                    {children}
                </section>
                <section className={classes.name}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"/>
                        <path d="M3.875 27C5.10367 24.8714 6.87104 23.1038 8.99944 21.8749C11.1278 20.6459 13.5423 19.9989 16 19.9989C18.4577 19.9989 20.8722 20.6459 23.0006 21.8749C25.129 23.1038 26.8963 24.8714 28.125 27" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {comment.author_full_name}
                </section>
            </section>
            <section className={classes.text}>
                {comment.text}
            </section>
        </section>
    )
}
