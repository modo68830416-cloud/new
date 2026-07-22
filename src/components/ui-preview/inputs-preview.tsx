"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/ui/search-input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { VISIBLE_CATEGORIES } from "@/constants/categories";
import { SubSection } from "./section";

export function InputsPreview() {
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <>
      <SubSection title="Input">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="이메일" placeholder="you@example.com" leftIcon={<Mail size={16} />} />
          <Input label="닉네임" placeholder="필수 입력" required helperText="2~16자로 입력해 주세요." />
          <Input label="오류 상태" defaultValue="invalid-value" errorText="올바른 형식이 아닙니다." />
          <Input label="비활성화" placeholder="disabled" disabled />
        </div>
      </SubSection>

      <SubSection title="SearchInput">
        <SearchInput className="max-w-md" onSearch={(v) => console.log("search:", v)} />
      </SubSection>

      <SubSection title="Textarea">
        <Textarea label="기사 요약" placeholder="요약을 입력하세요" className="max-w-xl" />
      </SubSection>

      <SubSection title="Select">
        <Select
          label="카테고리"
          placeholder="카테고리를 선택하세요"
          className="max-w-xs"
          options={VISIBLE_CATEGORIES.map((c) => ({ value: c.slug, label: c.name }))}
        />
      </SubSection>

      <SubSection title="Checkbox">
        <div className="flex flex-col gap-3">
          <Checkbox label="이용약관에 동의합니다" defaultChecked />
          <Checkbox label="마케팅 정보 수신 동의" />
          <Checkbox label="부분 선택" indeterminate />
          <Checkbox label="비활성화" disabled />
        </div>
      </SubSection>

      <SubSection title="Switch">
        <div className="flex flex-wrap items-center gap-6">
          <Switch label="실시간 알림" checked={switchOn} onCheckedChange={setSwitchOn} />
          <Switch label="다크 모드 고정" defaultChecked size="sm" />
          <Switch label="비활성화" disabled />
        </div>
      </SubSection>
    </>
  );
}
