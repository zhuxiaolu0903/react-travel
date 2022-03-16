import {Typography} from "antd"
import React from "react"
import styles from './ProductImage.module.css'
import {Link} from "react-router-dom";

interface PropsType {
    id?: number | string,
    height?: number
    img: string
    title?: string
    subTitle?: string
}

export const ProductImage: React.FC<PropsType> = ({id, height, img, title, subTitle}) => {

    return (
        <Link to={`detail/${id}`}>
            <div
                className={styles['image-box']}
                style={{
                    height: `${height}px`,
                    backgroundImage: `url(${img})`
                }}
            >
                {
                    title !== '' && subTitle !== '' && (
                        <div className={styles['image-desc']}>
                            <Typography.Text>{title}</Typography.Text>
                            <Typography.Text>{subTitle}</Typography.Text>
                        </div>
                    )
                }
            </div>
        </Link>
    )
}
