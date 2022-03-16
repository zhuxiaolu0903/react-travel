import React, {Ref, useState} from "react";
import {Tabs, Typography, Carousel, Table, Rate} from "antd"
import styles from "./ProductIntro.module.css"
import {CarouselRef} from "antd/es/carousel";
import {ColumnsType} from "antd/es/table";

interface PropsType {
  title: string
  shortDescription: string
  price: string | number
  coupons: string | number
  discount: string
  rating: number
  pictures: string[]
}

interface RowType {
  title: string;
  description: string | number | JSX.Element;
  key: number;
}

const columns: ColumnsType<RowType> = [
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
    align: 'left',
    width: 120,
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    align: 'center'
  }
];

export const ProductIntro: React.FC<PropsType> = (
  {
    title,
    shortDescription,
    price,
    coupons,
    discount,
    rating,
    pictures
  }
) => {

  const {TabPane} = Tabs;
  const [openSlide, setOpenSlide] = useState<boolean>(false)
  const [curSelectTab, setCurSelectTab] = useState<string>(pictures[0])
  const carouselRef: Ref<CarouselRef> = React.createRef()

  // slideTab点击事件
  const handleTabClick = (key) => {
    setCurSelectTab(key)
    const index = pictures.findIndex(item => item === key);
    (carouselRef.current as CarouselRef).goTo(index)
  }

  // 轮播图切换后的回调
  const handleAfterChange = (current) => {
    if (openSlide && pictures[current] !== curSelectTab) {
      setCurSelectTab(pictures[current])
    }
  }
  // 商品简介列表数据
  const tableDataSource: RowType[] = [
    {
      key: 0,
      title: "路线名称",
      description: title
    },
    {
      key: 1,
      title: "价格",
      description: (
        <>
          ￥{" "}
          <Typography.Text type="danger" strong>{price}</Typography.Text>
        </>
      )
    },
    {
      key: 2,
      title: "限时抢购折扣",
      description: discount ? (
        <>
          ￥ <Typography.Text delete>{price}</Typography.Text>
          <Typography.Text type="danger" strong>¥ {discount}</Typography.Text>
        </>
      ) : ("暂无折扣")
    },
    {
      key: 3,
      title: "领取优惠",
      description: coupons > 0 ? (
        <div className={styles["resource-coupon-list"]}>
          <a className={styles["resource-coupon-item"]} onClick={() => false} aria-label="100元">
            <span aria-hidden="true">100元</span>
          </a>
          <a className={styles["resource-coupon-item"]} onClick={() => false} aria-label="立减券">
            <span aria-hidden="true">立减券</span>
          </a>
        </div>
      ) : ("暂无折扣")
    },
    {
      key: 4,
      title: "线路评价",
      description: (
        <>
          <Rate allowHalf disabled defaultValue={rating}/>
          <Typography.Text style={{marginLeft: 10}}>
            {rating}星
          </Typography.Text>
        </>
      )
    }
  ]

  return (
    <div className={styles["intro-container"]}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles["intro-detail-content"]}>
        <Typography.Text style={{marginLeft: 20}}>
          ￥<span className={styles["intro-detail-strong-text"]}>{price}</span>
          {' '}/人起
        </Typography.Text>
        <Typography.Text style={{marginLeft: 50}}>
          <span className={styles["intro-detail-strong-text"]}>{rating}</span>
          {' '}分
        </Typography.Text>
        <div className={styles["product-img-container"]}>
          <Carousel autoplay ref={carouselRef} afterChange={handleAfterChange}>
            {
              pictures.map(item => (
                <img src={item} width={'auto'} height={320} key={item}/>
              ))
            }
          </Carousel>
          <div
            className={openSlide ? `${styles["slide-tab-container"]} ${styles["show"]}` : styles["slide-tab-container"]}>
            <p className={styles["dire"]} onClick={() => {
              setOpenSlide(!openSlide)
            }}><em/></p>
            <div className={styles["slide-tab-content"]}>
              <Tabs
                activeKey={curSelectTab}
                tabPosition="left"
                style={{height: '100%'}}
                onTabClick={handleTabClick}
              >
                {pictures.map(item => (<TabPane tab={(<img src={item} alt="" width={92} height={52}/>)} key={item}/>))}
              </Tabs>
            </div>
          </div>
        </div>
        <Table<RowType>
          columns={columns}
          dataSource={tableDataSource}
          size={"small"}
          bordered={false}
          pagination={false}
          showHeader={false}
        />
      </div>
    </div>
  )
}