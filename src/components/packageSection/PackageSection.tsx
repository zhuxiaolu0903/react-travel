import React from "react";
import {Col, Row, Typography} from "antd";
import styles from './PackageSection.module.css'
import {Link} from "react-router-dom";

interface PropsType {
    id: number,
    img: string
    title: string
    price: number | string
}

export const PackageSection: React.FC<PropsType> = ({id, img, title, price}) => {
    return (
      <Link to={`detail/${id}`}>
          <div className={styles['package-section-container']}>
              <img src={img}/>
              <div className={styles['desc-info']}>
                  <Row gutter={8}>
                      <Col span={19}>
                          <Typography.Paragraph ellipsis={{rows: 2}}>{title}</Typography.Paragraph>
                      </Col>
                      <Col span={5}>
                          <Typography.Text type={"danger"}>￥{price}</Typography.Text>起
                      </Col>
                  </Row>
              </div>
          </div>
      </Link>
    )
}