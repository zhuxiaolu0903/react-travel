import React from "react"
import styles from './HomePage.module.css'
import noData from '../../assets/no-data.png'
import {
  Col,
  Row,
  Space,
  Spin,
  Typography
} from 'antd'
import {
  Header,
  Footer,
  Carousel,
  SideMenu,
  ProductCollection,
  ProductImage,
  BusinessPartners
} from '../../components'
import {PackageSection} from "../../components"
import {withTranslation, WithTranslation} from 'react-i18next'
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {
  getRecommendProductDataActionCreator
} from "../../redux/recommendProducts/recommendProductsActions";

interface Sate {
  curTabIndex: number
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    productList: state.recommendProducts.productList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductData: () => {
      dispatch(getRecommendProductDataActionCreator())
    }
  }
}

class HomePageComponent extends React.Component<PropsType, Sate> {

  constructor(props) {
    super(props);
    this.state = {
      curTabIndex: 0
    }
  }

  componentDidMount() {
    this.props.getProductData()
  }

  // 处理景点选择
  handleChange(index) {
    this.setState({
      curTabIndex: index
    })
  }

  render() {

    const {t, loading, productList} = this.props
    const productList1 = productList[0] && productList[0].touristRoutes
    const productList2 = productList[1] && productList[1].touristRoutes
    const productList3 = productList[2] && productList[2].touristRoutes

    return (
      <div>
        { /*Header区域*/}
        <Header/>
        {/*内容区域*/}
        <div className={styles['page-content']}>
          {/*走马灯区域*/}
          <div className={styles['carousel-container']}>
            {/*走马灯组件*/}
            <Carousel/>
            {/*左侧菜单*/}
            <div className={styles['side-menu-container']}>
              <SideMenu/>
            </div>
          </div>
          {
            loading ?
              (<Spin size="large" style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
              }}/>) :
              productList.length === 0 ?
                <div className="no-data-container">
                  <img src={noData} alt=""/>
                  <span>暂无数据</span>
                </div> :
                (
                  /*景点推荐*/
                  <div className={`${styles['hot-attractions']} ${styles['attractions-introduce']}`}>
                    <Typography.Title level={3}>{t('home_page.popular_attractions')}</Typography.Title>
                    {/*景点标题切换*/}
                    <div className={styles['attractions-tab']}>
                      <Space size='small'>
                        {
                          productList1.map((product, index) => (
                            <div
                              onClick={() => this.handleChange(index)}
                              className={
                                this.state.curTabIndex === index ? `${styles['active']} ${styles['attractions-item-box']}` : styles['attractions-item-box']
                              }
                              key={`hot-attractions-${index}`}
                            >{product.title}</div>
                          ))
                        }
                      </Space>
                    </div>
                    {/*景点介绍*/}
                    <div className={styles['attractions-container']}>
                      <ProductCollection list={productList1[this.state.curTabIndex].list}/>
                    </div>
                    {/*游世界*/}
                    <Typography.Title level={3}>{t('home_page.travel_world')}</Typography.Title>
                    <div className={styles['attractions-container']}>
                      <Row gutter={16}>
                        <Col span={5}>
                          <ProductImage
                            id={productList2[0].id}
                            img={productList2[0].img}
                            title={productList2[0].title}
                            subTitle={productList2[0].subTitle}
                            height={436}
                          />
                        </Col>
                        <Col span={14}>
                          <Space style={{width: '100%'}} direction={"vertical"} size={"middle"}>
                            <Row gutter={16}>
                              <Col span={16}>
                                <ProductImage
                                  id={productList2[1].id}
                                  img={productList2[1].img}
                                  title={productList2[1].title}
                                  subTitle={productList2[1].subTitle}
                                  height={208}
                                />
                              </Col>
                              <Col span={8}>
                                <ProductImage
                                  id={productList2[2].id}
                                  img={productList2[2].img}
                                  title={productList2[2].title}
                                  subTitle={productList2[2].subTitle}
                                  height={208}
                                />
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={8}>
                                <ProductImage
                                  id={productList2[3].id}
                                  img={productList2[3].img}
                                  title={productList2[3].title}
                                  subTitle={productList2[3].subTitle}
                                  height={208}
                                />
                              </Col>
                              <Col span={16}>
                                <ProductImage
                                  id={productList2[4].id}
                                  img={productList2[4].img}
                                  title={productList2[4].title}
                                  subTitle={productList2[4].subTitle}
                                  height={208}
                                />
                              </Col>
                            </Row>
                          </Space>
                        </Col>
                        <Col span={5}>
                          <ProductImage
                            id={productList2[5].id}
                            img={productList2[5].img}
                            title={productList2[5].title}
                            subTitle={productList2[5].subTitle}
                            height={436}
                          />
                        </Col>
                      </Row>
                    </div>
                    {/*周边游*/}
                    <Typography.Title level={3}>{t('home_page.travel_around_border')}</Typography.Title>
                    <div className={styles['attractions-container']}>
                      <Space direction={"vertical"} size={'middle'} style={{width: '100%'}}>
                        <Row gutter={16}>
                          {
                            productList3.map((item, index) => {
                              if (index > 3) return ''
                              return (
                                <Col span={6} key={`productList3_${index}`}>
                                  <PackageSection id={item.id}  img={item.img} title={item.title}
                                                  price={item.price}/>
                                </Col>
                              )
                            })
                          }
                        </Row>
                        <Row gutter={16}>
                          {
                            productList3.map((item, index) => {
                              if (index < 4) return ''
                              return (
                                <Col span={6} key={`productList3_${index}`}>
                                  <PackageSection id={item.id} img={item.img} title={item.title}
                                                  price={item.price}/>
                                </Col>
                              )
                            })
                          }
                        </Row>
                      </Space>
                    </div>
                  </div>
                )
          }
          {/*合作企业*/}
          <div className={styles['attractions-container']}>
            <BusinessPartners/>
          </div>
        </div>
        { /*Footer区域*/}
        <Footer/>
      </div>
    )
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))