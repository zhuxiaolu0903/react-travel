import { Typography } from "antd"
import React from "react"
import styles from './ProductImage.module.css'

interface propType {
    size: 'small' | 'large'
    img: string
    title: string
}

export const ProductImage: React.FC<propType> = ({size, img, title}) => {
    return (
        <div
            className={styles['image-box']}
            style={{
                height: size === 'large' ? '332px' : '158px',
                backgroundImage: `url(${img})`
            }}
        >
            <Typography.Text>{title}</Typography.Text>
        </div>
    )
}
