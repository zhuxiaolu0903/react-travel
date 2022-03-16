import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Header, Footer, ProductIntro} from "../../components";
import axios from "axios";
import {Col, Row, DatePicker, Spin, Calendar, Badge, Typography, Rate} from "antd";
import styles from './DetailPage.module.css'
import noData from "../../assets/no-data.png";

type MatchParams = {
  touristRouteId: string
}

export const DetailPage: React.FC = () => {

  const {RangePicker} = DatePicker;
  const {touristRouteId} = useParams<MatchParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const navigate = useNavigate()

  // 模拟实时票价数据
  const getPrice = (value) => {
    let price = 0;
    switch (value.date()) {
      case 2:
        price = 3209;
        break;
      case 4:
        price = 3109;
        break;
      case 14:
        price = 3232;
        break;
      case 17:
        price = 3424;
        break;
      case 19:
        price = 3423;
        break;
      case 22:
        price = 3123;
        break;
      case 25:
        price = 3423;
        break;
      case 27:
        price = 3121;
        break;
      default:
    }
    return price;
  }

  // 日期自定义渲染
  const dateCellRender = (value) => {
    const priceData = getPrice(value);
    if (priceData > 0) {
      return (
        <div className={styles["date-detail"]}>
          <Typography.Text>
            <span className={styles["price-text"]}>￥{priceData}</span>
          </Typography.Text>
        </div>
      );
    } else {
      return (
        <div className={styles["date-detail"]}>
          <span>暂无优惠</span>
        </div>
      );
    }
  }

  // 获取旅游路线详情
  useEffect(() => {
    // 旅游路线ID不存在，路由重定向至首页
    if (touristRouteId === 'undefined') {
      navigate('/')
      return
    }
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`http://127.0.0.1:8080/api/touristRoutes/${touristRouteId}`)
        setProduct(data.productDetail)
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    // 如果父元素没有类名，可以使用空标签来占位
    <>
      <Header/>
      {
        loading ?
          (<Spin size="large" style={{
            marginTop: 200,
            marginBottom: 200,
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
          }}/>) :
          !product ?
            <div className="no-data-container">
              <img src={noData} alt=""/>
              <span>抱歉，找不到此条旅游路线信息</span>
            </div> :
            <div className={styles["page-content"]}>
              {/* 产品简介 与 日期选择 */}
              <div className={styles["product-intro-container"]}>
                <Row>
                  <Col span={13}>
                    <ProductIntro
                      title={product.title}
                      shortDescription={product.description}
                      price={product.originalPrice}
                      coupons={product.coupons}
                      discount={product.price}
                      rating={product.rating}
                      pictures={product.pictures}
                    />
                  </Col>
                  <Col span={11}>
                    <Typography.Text style={{marginRight: 10}}>出行日期：</Typography.Text>
                    <RangePicker style={{marginTop: 20}}/>
                    <div className={styles["calendar-container"]}>
                      <Calendar dateCellRender={dateCellRender} fullscreen={false}/>
                    </div>
                  </Col>
                </Row>
              </div>
              {/* 锚点菜单 */}
              {/* 产品特色 */}
              {/* 费用 */}
              {/* 预订须知 */}
              {/* 商品评价*/}
            </div>
      }
      <Footer/>
    </>
  )
}