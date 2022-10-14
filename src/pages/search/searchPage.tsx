import React, { useEffect, useState } from 'react'
import { FilterArea, ProductList } from '../../components'
import styles from './searchPage.module.css'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { searchProduct } from '../../redux/productSearch/slice'
import { Spin } from 'antd'
import noData from '../../assets/no-data.png'
import { MainLayout } from '../../layouts/mainLayout'

export const SearchPage: React.FC = () => {
  const { keyword } = useParams()
  const dispatch = useDispatch()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const loading = useSelector((state) => state.productSearch.loading)
  const total = useSelector((state) => state.productSearch.total)
  const productList = useSelector((state) => state.productSearch.productList)
  const location = useLocation()
  const pageSize = 5

  useEffect(() => {
    dispatch(
      searchProduct({
        pageNumber,
        pageSize,
        keyword,
      })
    )
  }, [location])

  // 切换分页
  const onPageChange = (pageNumber, pageSize) => {
    setPageNumber(pageNumber)
    dispatch(
      searchProduct({
        pageNumber,
        pageSize,
        keyword,
      })
    )
  }

  return (
    <MainLayout>
      <div className={styles['product-container']}>
        {/*产品筛选条件*/}
        <div className={styles['filter-container']}>
          <FilterArea />
        </div>
        {loading ? (
          <Spin
            size="large"
            style={{
              marginTop: 200,
              marginBottom: 200,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}
          />
        ) : !productList ? (
          <div className="no-data-container">
            <img src={noData} alt="" />
            <span>抱歉，没有找到符合条件的结果</span>
          </div>
        ) : (
          <div className={styles['product-list-container']}>
            <ProductList
              loading={loading}
              data={{
                productList,
                total,
              }}
              paging={{
                pageNumber,
                pageSize,
              }}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
