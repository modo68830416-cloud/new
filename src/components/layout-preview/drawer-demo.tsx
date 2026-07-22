"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

/** 모바일 Drawer를 이 페이지에서 바로 열어볼 수 있는 데모 트리거 */
export function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <Button
        variant="secondary"
        leftIcon={<Menu size={16} />}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        모바일 메뉴 Drawer 열기
      </Button>
      <p className="type-caption text-text-muted">
        Drawer 내부에서 Tab으로 순환(Focus Trap), ESC로 닫기, 오른쪽으로 스와이프해서 닫기를
        확인할 수 있습니다.
      </p>
      <MobileNavigation open={open} onOpenChange={setOpen} />
    </div>
  );
}
