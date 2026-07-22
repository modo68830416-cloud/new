import { STORAGE_KEYS } from "@/constants/storage-keys";

/**
 * 최초 페인트 이전에 실행되는 블로킹 인라인 스크립트 소스 (TASK-011).
 *
 * `src/app/layout.tsx`의 `<body>` 최상단에 `<script>`로 삽입한다 —
 * React가 hydrate 하기 훨씬 전, 브라우저가 나머지 body를 파싱/페인트하기
 * 전에 동기적으로 실행되므로 다크/라이트 테마 전환 시 색이 깜빡이는
 * 현상(FOUC)을 없앤다. 저장된 값이 없거나 손상된 경우
 * `prefers-color-scheme`을 기본값으로 사용하고, 어떤 예외도 페이지 렌더링을
 * 막지 않도록 전체를 `try/catch`로 감싼다.
 *
 * `src/hooks/useTheme.ts`/`useFontSizePreference.ts`가 이후 같은 규칙으로
 * 상태를 동기화하므로, 이 스크립트와 두 훅의 로직이 어긋나지 않도록
 * 유지해야 한다.
 */
export function getThemeInitScript(): string {
  return `(function(){try{
    var doc=document.documentElement;
    var THEME_KEY=${JSON.stringify(STORAGE_KEYS.theme)};
    var FONT_KEY=${JSON.stringify(STORAGE_KEYS.fontSize)};
    var mode="system";
    try{
      var rawTheme=window.localStorage.getItem(THEME_KEY);
      var parsedTheme=rawTheme?JSON.parse(rawTheme):null;
      if(parsedTheme==="light"||parsedTheme==="dark"||parsedTheme==="system"){mode=parsedTheme;}
    }catch(e){}
    var resolved=mode;
    if(mode==="system"){
      resolved=(window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches)?"light":"dark";
    }
    doc.setAttribute("data-theme",resolved);
    doc.style.colorScheme=resolved;

    var fontSize="default";
    try{
      var rawFont=window.localStorage.getItem(FONT_KEY);
      var parsedFont=rawFont?JSON.parse(rawFont):null;
      if(parsedFont==="small"||parsedFont==="default"||parsedFont==="large"){fontSize=parsedFont;}
    }catch(e){}
    if(fontSize!=="default"){doc.setAttribute("data-font-size",fontSize);}
  }catch(e){}})();`;
}
