"use client";

import { useState } from "react";
import { LogOut, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Modal } from "@/components/ui/modal";
import { Drawer } from "@/components/ui/drawer";
import { Tooltip } from "@/components/ui/tooltip";
import { Dropdown } from "@/components/ui/dropdown";
import { useToast } from "@/components/ui/toast";
import { SubSection } from "./section";

export function OverlaysPreview() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <>
      <SubSection title="Toast">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => showToast({ title: "저장되었습니다", tone: "success" })}
          >
            success 토스트
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({
                title: "새 속보가 도착했습니다",
                description: "지금 확인하려면 클릭하세요.",
                tone: "info",
              })
            }
          >
            info 토스트
          </Button>
          <Button
            variant="secondary"
            onClick={() => showToast({ title: "연결이 불안정합니다", tone: "warning" })}
          >
            warning 토스트
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({ title: "삭제에 실패했습니다", tone: "danger", durationMs: 0 })
            }
          >
            danger 토스트 (수동 닫기)
          </Button>
        </div>
      </SubSection>

      <SubSection title="Modal">
        <Button onClick={() => setModalOpen(true)}>모달 열기</Button>
        <Modal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title="기사를 삭제하시겠어요?"
          description="이 작업은 되돌릴 수 없습니다."
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={() => setModalOpen(false)}>
                삭제
              </Button>
            </>
          }
        >
          <p className="type-body">
            선택한 기사와 관련 댓글이 모두 삭제됩니다. 계속하시겠습니까?
          </p>
        </Modal>
      </SubSection>

      <SubSection title="Drawer">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            드로어 열기 (오른쪽)
          </Button>
        </div>
        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          title="알림 센터"
          description="최근 속보와 활동 내역을 확인하세요."
          side="right"
        >
          <div className="flex flex-col gap-3">
            <p className="type-body">여기에 알림 목록이 표시됩니다.</p>
            <p className="type-caption">Esc 키 또는 바깥 영역 클릭으로 닫을 수 있습니다.</p>
          </div>
        </Drawer>
      </SubSection>

      <SubSection title="Tooltip">
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip content="즐겨찾기에 추가">
            <IconButton label="즐겨찾기" icon={<Pencil size={16} />} variant="outline" />
          </Tooltip>
          <Tooltip content="가장 최근 업데이트: 방금 전" side="bottom">
            <span className="type-caption cursor-help underline decoration-dotted">
              마지막 업데이트 정보 위에 마우스를 올려보세요
            </span>
          </Tooltip>
        </div>
      </SubSection>

      <SubSection title="Dropdown">
        <Dropdown
          trigger={
            <IconButton label="더보기 메뉴" icon={<MoreVertical size={16} />} variant="outline" />
          }
          label="기사 관리 메뉴"
          items={[
            { value: "edit", label: "수정", icon: <Pencil size={14} /> },
            { value: "logout", label: "로그아웃", icon: <LogOut size={14} /> },
            { value: "delete", label: "삭제", icon: <Trash2 size={14} />, danger: true },
          ]}
          onSelect={(value) => showToast({ title: `선택됨: ${value}`, tone: "info", durationMs: 2500 })}
        />
      </SubSection>
    </>
  );
}
