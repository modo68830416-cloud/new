"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export interface ClearDataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
}

/**
 * 되돌릴 수 없는 삭제 동작(북마크 전체 삭제, 읽기 기록 전체 삭제, 저장된
 * 데이터 전체 초기화)을 실행하기 전 확인을 받는 공용 다이얼로그
 * (TASK-011). `@/components/ui/modal`(TASK-003, Radix Dialog 기반)을
 * 그대로 재사용해 포커스 트랩/ESC 닫기/배경 스크롤 잠금을 별도 구현 없이
 * 얻는다.
 */
export function ClearDataDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "삭제",
  onConfirm,
}: ClearDataDialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="type-body text-text-secondary">이 작업은 되돌릴 수 없습니다.</p>
    </Modal>
  );
}
