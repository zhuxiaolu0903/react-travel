import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {Header, Footer, ProductIntro} from "../../components";
import axios from "axios";
import {
  Col,
  Row,
  DatePicker,
  Spin,
  Calendar,
  Badge,
  Typography,
  Rate,
  Select,
  InputNumber,
  Space,
  Tooltip,
  Button, Divider, Anchor, Menu, BackTop
} from "antd";
import styles from './DetailPage.module.css'
import noData from "../../assets/no-data.png";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {commentMockData} from './mockup'
import {ProductComments} from '../../components'
import {UpCircleTwoTone} from "@ant-design/icons/lib";

type MatchParams = {
  touristRouteId: string
}

export const DetailPage: React.FC = () => {

  const {RangePicker} = DatePicker;
  const {Option} = Select;
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
    // 如果父元素没有实际作用，可以使用空标签来占位
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
                  <Col span={11} style={{padding: 20}}>
                    <div className={styles["travel-info-container"]}>
                      <div className={styles["travel-info"]}>
                        <Typography.Text>出发城市：</Typography.Text>
                        <Select defaultValue="hangzhou" style={{width: 120}}>
                          <Option value="shanghai">上海</Option>
                          <Option value="beijing">北京</Option>
                          <Option value="hangzhou">杭州</Option>
                        </Select>
                      </div>
                      <div className={styles["travel-info"]}>
                        <Typography.Text>出发日期：</Typography.Text>
                        <RangePicker/>
                      </div>
                      <div className={styles["travel-info"]}>
                        <Typography.Text>出发人数：</Typography.Text>
                        <Space size="large">
                        <span>
                          <InputNumber min={1} max={10} keyboard={true} defaultValue={1}/>
                          <Typography.Text style={{marginLeft: 8}}>成人</Typography.Text>
                        </span>
                          <span>
                          <InputNumber min={1} max={10} keyboard={true} defaultValue={1}/>
                          <Typography.Text style={{marginLeft: 8}}>儿童</Typography.Text>
                          <Tooltip placement="bottom" title="年龄2~12周岁（不含），不占床，不含门票，其余服务同成人">
                            <Typography.Text underline style={{marginLeft: 10, fontSize: 12}}>标准说明</Typography.Text>
                          </Tooltip>
                        </span>
                        </Space>
                      </div>
                      <div className={styles["travel-info"]}>
                        <Button type="primary" icon={<ShoppingCartOutlined/>} size="large">立即预定</Button>
                      </div>
                    </div>
                    <div className={styles["calendar-container"]}>
                      <Calendar dateCellRender={dateCellRender} fullscreen={false}/>
                    </div>
                  </Col>
                </Row>
              </div>
              {/* 锚点菜单 */}
              <div className={styles["product-detail-anchor"]}>
                <Anchor>
                  <Menu mode="horizontal">
                    <Menu.Item key={1}>
                      <Anchor.Link href="#feature" title="产品特色"/>
                    </Menu.Item>
                    <Menu.Item key={2}>
                      <Anchor.Link href="#fees" title="费用"/>
                    </Menu.Item>
                    <Menu.Item key={3}>
                      <Anchor.Link href="#notes" title="预定须知"/>
                    </Menu.Item>
                    <Menu.Item key={4}>
                      <Anchor.Link href="#comments" title="用户评价"/>
                    </Menu.Item>
                  </Menu>
                </Anchor>
              </div>
              {/* 产品特色 */}
              <div id="feature" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                  <Typography.Title level={3}>产品特色</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html: product.features}}/>
              </div>
              {/* 费用 */}
              <div id="fees" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                  <Typography.Title level={3}>费用</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html: product.fees}}/>
              </div>
              {/* 预订须知 */}
              <div id="notes" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                  <Typography.Title level={3}>预订须知</Typography.Title>
                </Divider>
                <div dangerouslySetInnerHTML={{__html: product.notes}}/>
              </div>
              {/* 商品评价*/}
              <div id="comments" className={styles["product-detail-container"]}>
                <Divider orientation="center">
                  <Typography.Title level={3}>用户评价</Typography.Title>
                </Divider>
                <ProductComments data={commentMockData}/>
              </div>
              {/* 回到顶部 */}
              <BackTop>
                <UpCircleTwoTone style={{fontSize: 32}}/>
              </BackTop>
            </div>
      }
      <Footer/>
    </>
  )
}