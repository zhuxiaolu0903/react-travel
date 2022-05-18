import { Typography } from 'antd'
import React from 'react'
import styles from './ProductImage.module.css'
import { Link } from 'react-router-dom'

interface PropsType {
  id: number
  height?: number
  img: string
  title?: string
  subTitle?: string
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  height,
  img,
  title,
  subTitle,
}) => {
  if (title || subTitle) {
    return (
      <Link to={`detail/${id}`}>
        <div
          className={styles['image-box']}
          style={{
            height: `${height}px`,
            backgroundImage: `url(${img})`,
          }}
        >
          {title !== '' && subTitle !== '' && (
            <div className={styles['image-desc']}>
              <Typography.Text>{title}</Typography.Text>
              <Typography.Text>{subTitle}</Typography.Text>
            </div>
          )}
        </div>
      </Link>
    )
  } else {
    return (
      <div
        className={styles['image-box']}
        style={{
          height: `${height}px`,
          backgroundImage: `url(${img})`,
        }}
      >
        {title !== '' && subTitle !== '' && (
          <div className={styles['image-desc']}>
            <Typography.Text>{title}</Typography.Text>
            <Typography.Text>{subTitle}</Typography.Text>
          </div>
        )}
      </div>
    )
  }
}
