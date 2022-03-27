import React from "react";
import {Filter} from "./Filter";
import {Divider} from "antd";

// 产品筛选条件
const filterData = [
  {
    title: '产品类型',
    tags: ['跟团游', '当地游', '自由行']
  },
  {
    title: '游玩天数',
    tags: ['1天', '2天', '3天', '4天', '5天', '6天']
  },
  {
    title: '出发时间',
    tags: ['五一', '国庆', '元旦', '春节']
  },
  {
    title: '产品评价',
    tags: ['5星', '4星', '3星', '2星', '1星']
  },
  {
    title: '适用人群',
    tags: ['单人团', '双人/情侣团', '3人团', '5人团', '7人团']
  }
]

export const FilterArea: React.FC = () => {
  return (
    <>
      {
        filterData.map((item, index) => {
          if (index === filterData.length - 1) {
            return <Filter title={item.title} tags={item.tags} key={index}/>
          } else {
            return (
              <span key={index}>
                <Filter title={item.title} tags={item.tags}/>
                <Divider dashed={true} style={{margin: 0}}/>
              </span>
            )
          }
        })
      }
    </>
  )
}