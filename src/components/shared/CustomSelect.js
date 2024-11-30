"use client"

import React, { useState, useEffect }  from 'react';
import {Select, SelectItem} from "@nextui-org/react";

export default function CustomSelect(props) {
  const { 
    options, 
    selectedKeys=[], 
    onSelectChange=()=>{}, 
    label="", 
    placeholder="Make a selection", 
    customClassName="", 
    showCaption=true, 
    customCaption="", 
    isDisabled=false } = props
  
  const [selectedValue, setSelectedValue] = useState(options.filter(opt=>selectedKeys.includes(opt.key)).map(obj=>obj.value))
  useEffect(()=>{
    setSelectedValue(options.filter(opt=>selectedKeys.includes(opt.key)).map(obj=>obj.key))
  }, [options, selectedKeys])

  return (
    <div className={`${customClassName} flex flex-col flex-wrap md:flex-nowrap gap-4 flex-grow`}>
      <Select
        isDisabled={isDisabled}
        label={label}
        placeholder={placeholder}
        className="max-w-sm"
        selectedKeys={selectedKeys}
        onChange={onSelectChange}
      >
        {options.map((option) => (
          <SelectItem key={option.key}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
      {showCaption && <p className="text-small text-default-500" style={{maxWidth: '380px'}}>{customCaption ? customCaption : `Selected: ${selectedValue}`}</p>}
    </div>
  );
}