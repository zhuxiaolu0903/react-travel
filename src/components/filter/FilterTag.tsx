import React, {useState} from "react";
import CheckableTag from "antd/es/tag/CheckableTag";

interface PropsType {
  checked?: boolean
  onSelect?: () => void;
}

export const FilterTag: React.FC<PropsType> = (props) => {

  const [checked, setChecked] = useState(props.checked ? props.checked : false)

  const handleChange = (checked) => {
    setChecked(checked)
  }
  return <CheckableTag {...props} checked={checked} onChange={handleChange}/>
}