import React, {useState} from "react";
import styles from './Home.module.css'
import {
    Col,
    Row,
    Space,
    Spin,
    Typography
} from 'antd';
import {
    Header,
    Footer,
    Carousel,
    SideMenu,
    ProductCollection,
    ProductImage,
    BusinessPartners
} from '../../components'
import {productList1, productList2, productList3} from './mockups'
import {PackageSection} from "../../components/packageSection";

interface PropsType {

}

interface SateType {
    curTabIndex: number
    partLoading: boolean
}

export class Home extends React.Component<PropsType, SateType> {

    constructor(props: PropsType) {
        super(props);
        this.state = {
            curTabIndex: 0,
            partLoading: false,
        }
    }

    // 处理景点选择
    handleChange (index) {
        // 模拟数据加载
        this.setState({
            partLoading: true
        })
        setTimeout(() => {
            this.setState({
                curTabIndex: index,
                partLoading: false
            })
        }, 1000)
    }

   render() {
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
                   {/*景点推荐*/}
                   <div className={`${styles['hot-attractions']} ${styles['attractions-introduce']}`}>
                       <Typography.Title level={3}>热门景点</Typography.Title>
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
                           <Spin spinning={this.state.partLoading}>
                               <ProductCollection list={productList1[this.state.curTabIndex].list}/>
                           </Spin>
                       </div>
                       {/*游世界*/}
                       <Typography.Title level={3}>游世界</Typography.Title>
                       <div className={styles['attractions-container']}>
                           <Row gutter={16}>
                               <Col span={5}>
                                   <ProductImage
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
                                                   img={productList2[1].img}
                                                   title={productList2[1].title}
                                                   subTitle={productList2[1].subTitle}
                                                   height={208}
                                               />
                                           </Col>
                                           <Col span={8}>
                                               <ProductImage
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
                                                   img={productList2[3].img}
                                                   title={productList2[3].title}
                                                   subTitle={productList2[3].subTitle}
                                                   height={208}
                                               />
                                           </Col>
                                           <Col span={16}>
                                               <ProductImage
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
                                       img={productList2[5].img}
                                       title={productList2[5].title}
                                       subTitle={productList2[5].subTitle}
                                       height={436}
                                   />
                               </Col>
                           </Row>
                       </div>
                       {/*周边游*/}
                       <Typography.Title level={3}>周边游</Typography.Title>
                       <div className={styles['attractions-container']}>
                           <Space direction={"vertical"} size={'middle'} style={{width: '100%'}}>
                               <Row gutter={16}>
                                   <Col span={6}>
                                       <PackageSection img={productList3[0].img} title={productList3[0].title}
                                                       price={productList3[0].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[1].img} title={productList3[1].title}
                                                       price={productList3[1].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[2].img} title={productList3[2].title}
                                                       price={productList3[2].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[3].img} title={productList3[3].title}
                                                       price={productList3[3].price}/>
                                   </Col>
                               </Row>
                               <Row gutter={16}>
                                   <Col span={6}>
                                       <PackageSection img={productList3[4].img} title={productList3[4].title}
                                                       price={productList3[4].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[5].img} title={productList3[5].title}
                                                       price={productList3[5].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[6].img} title={productList3[6].title}
                                                       price={productList3[6].price}/>
                                   </Col>
                                   <Col span={6}>
                                       <PackageSection img={productList3[7].img} title={productList3[7].title}
                                                       price={productList3[7].price}/>
                                   </Col>
                               </Row>
                           </Space>
                       </div>
                   </div>
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