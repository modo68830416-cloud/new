# TASK-004 — 인터랙션 & 애니메이션 시스템 구축

## 목적

TASK-001~003에서 구축한 기반과 디자인 시스템, 공통 UI를 바탕으로
뉴스 플랫폼 전반에서 사용할 일관된 인터랙션과 애니메이션 시스템을 구축한다.

---

## 선행 조건

- TASK-001 완료
- TASK-002 완료
- TASK-003 완료

---

## 핵심 목표

이번 Task에서는 **페이지 디자인을 완성하지 않는다.**

구축 대상은 다음과 같다.

- 모션 시스템
- 공통 Transition
- Hover 효과
- Focus 효과
- Scroll Reveal
- Page Transition
- Loading Animation
- Skeleton Animation
- Live Indicator Animation
- Breaking News Pulse
- Micro Interaction
- Motion Utility

---

## 권장 기술

- Framer Motion (최신 안정 버전)
- Intersection Observer
- CSS Variables
- prefers-reduced-motion 지원

---

## 폴더 구조

```text
src/
 ├─ animations/
 │   ├─ variants.ts
 │   ├─ transitions.ts
 │   ├─ easings.ts
 │   ├─ durations.ts
 │   └─ presets.ts
 │
 ├─ hooks/
 │   ├─ useInView.ts
 │   ├─ useReducedMotion.ts
 │   └─ useScrollReveal.ts
 │
 └─ components/
     └─ motion/
         ├─ FadeIn.tsx
         ├─ SlideUp.tsx
         ├─ ScaleIn.tsx
         ├─ Stagger.tsx
         ├─ PageTransition.tsx
         ├─ BreakingPulse.tsx
         └─ LiveDot.tsx
```

---

## 구현 항목

### 1. Motion Tokens

정의

- instant
- fast
- normal
- slow
- dramatic

### 2. Transition Presets

- fade
- slide-up
- slide-down
- slide-left
- slide-right
- scale
- zoom
- stagger
- blur-in

### 3. Hover

공통 Hover 효과

- Button
- Card
- Badge
- Link
- Navigation

### 4. Focus

- Focus Ring
- Keyboard Navigation
- Focus Visible

### 5. Scroll Reveal

지원

- fade
- slide
- stagger
- once
- repeat(false 기본)

### 6. Skeleton Animation

- shimmer
- pulse

### 7. Loading

- Spinner
- Progress Bar
- Skeleton

### 8. Live 상태

애니메이션

- Live Dot
- Breaking Pulse
- Critical Alert

### 9. Page Transition

App Router 환경에서 재사용 가능한 전환 구조 제공

---

## 접근성

반드시

```css
@media (prefers-reduced-motion: reduce);
```

를 지원한다.

Reduced Motion에서는

- 페이지 전환 최소화
- Pulse 제거
- Scroll Reveal 제거
- Hover Animation 축소

---

## 개발 원칙

- Motion Token 외 duration 하드코딩 금지
- easing 하드코딩 금지
- transform 기반 애니메이션 우선
- layout shift 유발 금지
- opacity + transform 중심
- GPU 친화적 구현

---

## Preview

개발 페이지

```
/motion-preview
```

표시 항목

- Fade
- Slide
- Scale
- Stagger
- Hover
- Skeleton
- Spinner
- Breaking Pulse
- Live Dot
- Reduced Motion 비교

---

## 구현하지 않을 기능

- Hero Animation
- Header Animation
- 실제 뉴스 애니메이션
- 광고
- 3D 효과
- Canvas
- WebGL

---

## 완료 조건

- Motion Token 구현
- Transition Preset 구현
- Hover 구현
- Focus 구현
- Scroll Reveal 구현
- Loading Animation 구현
- Live Indicator 구현
- Breaking Pulse 구현
- Reduced Motion 지원
- motion-preview 페이지 제공
- pnpm lint 성공
- pnpm typecheck 성공
- pnpm build 성공

---

## 검증

```bash
pnpm lint
pnpm typecheck
pnpm build
```

---

## Claude Code 실행 프롬프트

현재 저장소를 분석한 후 TASK-004만 구현한다.

목표는 뉴스 플랫폼 전역에서 사용할 인터랙션 및 애니메이션 시스템 구축이다.

반드시 TASK-002 디자인 토큰과 TASK-003 UI 컴포넌트를 활용한다.

새로운 색상이나 spacing을 만들지 않는다.

Framer Motion 기반 공통 Motion System, Hover, Focus, Scroll Reveal, Skeleton, Loading, Live Indicator, Breaking Pulse를 구축한다.

작업 완료 후 lint, typecheck, build를 실행하고 결과를 보고한다.

---

## 다음 Task

TASK-005에서는

- Header
- Navigation
- Footer
- Top Bar
- Breaking Ticker Layout

을 구현한다.
