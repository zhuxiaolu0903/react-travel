import React from "react";
import styles from './ProductList.module.css'
import {Carousel, Col, List, Rate, Row, Space, Tag, Tooltip, Typography} from "antd";
import {LikeOutlined, StarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

interface PropsType {
  data: {
    productList: any[],
    total: number
  }
  paging: {
    pageNumber: number
    pageSize: number
  }
  onPageChange: (pageSize: number, pageNumber: number) => void
}

export const ProductList: React.FC<PropsType> = ({data, paging, onPageChange}) => {
  const IconText = ({icon, text}) => {
    return (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    )
  }

  return (
    <List
      itemLayout={"vertical"}
      size={"large"}
      pagination={{
        current: paging.pageNumber,
        size: 'small',
        showTotal: total => `共 ${data.total} 条`,
        onChange: (page) => onPageChange(page, paging.pageSize),
        total: data.total,
        pageSize: paging.pageSize
      }}
      dataSource={data.productList}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text={156} key="list-vertical-star-o"/>,
            <IconText icon={LikeOutlined} text={156} key="list-vertical-like-o"/>,
            <>
              <Rate disabled defaultValue={item.rating}/>
              <Typography.Text style={{marginLeft: 8}}>{item.rating}星</Typography.Text>
            </>
          ]}
          extra={
            <Carousel autoplay dots={false} style={{width: 300}}>
              {
                item.pictures.map(item => (
                  <img src={item} key={item}/>
                ))
              }
            </Carousel>
          }
        >
          <List.Item.Meta
            title={(
              <Link to={"/detail/" + item.id}>{item.title}</Link>
            )}
            description={(
              <Row align={"middle"} justify={"space-between"}>
                <Col>
                  {item.departureCity && <Tag color="#f50">{item.departureCity}出发</Tag>}
                  {item.travelDays && <Tag color="#108ee9">{item.travelDays} 天 </Tag>}
                  {item.discountPresent && <Tag color="#87d068">超低折扣</Tag>}
                  {item.tripType && <Tag color="#2db7f5">{item.tripType}</Tag>}
                </Col>
                <Col>
                  <Typography.Text style={{fontSize: 18}} type={"danger"} delete>￥{item.originalPrice}</Typography.Text>
                  <Typography.Text style={{fontSize: 18}}>
                    ￥<span className={styles["intro-detail-strong-text"]}>{item.price}</span>
                    {' '}/人起
                  </Typography.Text>
                </Col>
              </Row>
            )}
          />
          {item.description}
        </List.Item>
      )}
    />
  )
}