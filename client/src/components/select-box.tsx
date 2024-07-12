'use client'
import React, { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
const ModelSelectLangue = () => {
  const [isPending, startTransition] = useTransition()
  const localActive = useLocale()
  const pathname = usePathname()
  const newPathname = pathname.split('/').slice(2).join('/')
  const router = useRouter()
  const selectLanguage = (value: string) => {
    const nextLocal = value;
    startTransition(() => {
      router.replace(`/${nextLocal}/${newPathname}`)
      router.refresh()
    })
  }
  return (
    <Select onValueChange={selectLanguage} disabled={isPending} defaultValue={localActive}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="vi">Tiếng Việt</SelectItem>
          <SelectItem value="en">Tiếng Anh</SelectItem>
          {/* <SelectItem value="fr-FR">Tiếng Pháp</SelectItem>
          <SelectItem value="zh-CN">Tiếng Trung</SelectItem>
          <SelectItem value="ja-SP">Tiếng Nhật</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ModelSelectLangue;