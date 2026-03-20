import { FC, PropsWithChildren } from "react";
import classes from './contract.module.scss'
import pdfImg from '../../../../shared/lib/assets/pdf.webp'

interface IProps {
    contractBlob: Blob;
}

export const Contract: FC<IProps & PropsWithChildren> = ({contractBlob, children}) => {

    const downloadPdf = () => {
        const url = URL.createObjectURL(contractBlob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "contract.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
    };

    return (
        <section className={classes.container}>
            <section
                className={classes.link} 
                onClick={downloadPdf}
            >
                <span className={classes.sign}>
                    Скачать файл
                </span>
                <img src={pdfImg} />  
            </section>
            {children}
        </section>
    )
}