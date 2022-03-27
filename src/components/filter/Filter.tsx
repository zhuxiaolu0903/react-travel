import React from "react";
import {Typography} from "antd"
import {FilterTag} from "./FilterTag";

interface PropsType {
  title: string,
  tags: string[]
}

export const Filter: React.FC<PropsType> = ({title, tags}) => {
  return  (
    <div style={{
      padding: '10px 20px'
    }}>
      <Typography.Text style={{
        marginRight: 20,
        fontSize: 14,
        color: '#999'
      }}>
        {title}：
      </Typography.Text>
      <FilterTag checked={true}>不限</FilterTag>
      {
        tags.map((item, index) => (
          <FilterTag key={index}>{item}</FilterTag>
        ))
      }
    </div>
  )
}