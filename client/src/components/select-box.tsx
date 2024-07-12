'use client'
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const ModelSelectLangue = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="vi-VN">Tiếng Việt</SelectItem>
          <SelectItem value="en-US">Tiếng Anh</SelectItem>
          {/* <SelectItem value="fr-FR">Tiếng Pháp</SelectItem>
          <SelectItem value="zh-CN">Tiếng Trung</SelectItem>
          <SelectItem value="ja-SP">Tiếng Nhật</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelectLangue;