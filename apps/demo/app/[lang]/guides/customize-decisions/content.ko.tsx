import Link from 'next/link'

export default function CustomizeDecisionsKo() {
  return (
    <div className="doc" lang="ko">
      <h1>적응 결과 맞춤 설정</h1>
      <p className="lede">
        기본 규칙이 우리 서비스와 안 맞을 때 바꾸는 방법이에요. 바꾸는 층은 셋이고,
        가까운 것이 이겨요: 이 화면 하나 → 프로젝트 규칙 → 규칙 묶음. 셋 다 픽셀이
        아니라 환경 이름으로 말해요.
      </p>

      <h2>1. 이 화면 하나만 바꾸기</h2>
      <p>특정 화면 하나만 다르게 열고 싶을 때는 컴포넌트에 직접 지정해요.</p>
      <pre><code>{`// 항상 바텀 시트로 열래요
<Dialog.Root presentation="sheet" />

// 작은 화면에서만 전체 화면으로 열래요
<Dialog.Root presentation={{ compact: "fullscreen" }} />`}</code></pre>

      <h2>2. 프로젝트 규칙 만들기</h2>
      <p>
        서비스 전체의 관습을 바꾸고 싶으면 규칙 파일을 프로젝트에 만들어요. Tailwind
        설정 파일처럼, 팀의 결정이 코드로 남아요.
      </p>
      <pre><code>{`// protean.config.ts
import { appFirst, definePolicy } from "@protean-ui/react";

export const policy = definePolicy({
  extends: appFirst, // 기본 규칙에서 시작해요
  overlay: ({ traits, role, defaults }) =>
    // 작은 화면의 입력 폼은 전체 화면 대신 바텀 시트로 열래요
    role === "form" && traits.size === "compact" ? "sheet" : defaults(),
});`}</code></pre>
      <pre><code>{`// 앱 최상단에서 한 번만 감싸 주세요
import { ProteanProvider } from "@protean-ui/react";
import { policy } from "./protean.config";

<ProteanProvider policy={policy}>{children}</ProteanProvider>`}</code></pre>
      <p>
        <code>defaults()</code>를 부르면 나머지 판단은 기본 규칙에 맡길 수 있어서,
        바꾸고 싶은 한 가지만 적으면 돼요.
      </p>

      <h2>3. 규칙 묶음 자체를 교체하기</h2>
      <p>
        <code>extends: appFirst</code> 없이 처음부터 쓰면 완전히 다른 관습의 규칙
        묶음을 만들 수 있어요. 조직 공용 패키지로 배포해서 여러 프로젝트가 같은
        규칙을 쓰게 하는 것도 가능해요.
      </p>

      <h2>왜 이렇게 열렸는지 궁금할 때</h2>
      <p>
        모든 판단 결과는 DOM에 <code>data-presentation</code>으로 남고, 개발
        모드에서는 콘솔에 이유가 찍혀요. 누가 정했는지(기본 규칙 · 프로젝트 규칙 ·
        컴포넌트 지정)도 함께요.
      </p>
      <pre><code>{`[protean] overlay(form) -> fullscreen [pack:app-first] size=compact input=touch
// "입력 폼 다이얼로그를 전체 화면으로 열었어요.
//  기본 규칙(app-first)이 정했고, 화면은 compact, 입력은 터치였어요."`}</code></pre>

      <h2>판단의 재료: 트레이트</h2>
      <p>
        규칙 함수가 받는 <code>traits</code>는 지금 사용 환경을 몇 개의 이름으로
        정리한 값이에요. 규칙과 오버라이드는 이 이름으로만 말해요 - 픽셀 숫자는
        분류 단계 한 곳에만 있어요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>기준</th><th>값</th><th>이렇게 정해져요</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>compact (600px 미만) · medium (600~840px 미만) · expanded (840px 이상)</td>
              <td>창 너비로 정해요. 안드로이드의 화면 크기 등급과 같은 기준이고, 경계 숫자는 <code>ProteanProvider</code>의 thresholds로 바꿀 수 있어요.</td>
            </tr>
            <tr>
              <td>input</td>
              <td>touch · pointer · hybrid</td>
              <td>터치인지 마우스인지, 브라우저의 <code>pointer</code>/<code>hover</code> 미디어 쿼리로 알아내요.</td>
            </tr>
            <tr>
              <td>그 외</td>
              <td>hover · reducedMotion · virtualKeyboard</td>
              <td>호버 가능 여부, 동작 줄이기 설정, 화면 키보드가 떠 있는지예요.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        경계 근처에서 창 크기를 미세하게 조절해도 UI가 파르르 떨리지 않도록, 등급이
        바뀌려면 경계를 16px 이상 넘어야 해요. 터치 노트북처럼 둘 다 되는
        기기(hybrid)는 패턴을 마우스 기준으로 판단해요. 화면 폭과 입력 수단을 함께
        보는 이유는 <Link href="/ko/concepts/pattern-adaptation">상황에 맞는 패턴
        선택</Link>에 있어요 - 좁은 데스크톱 창은 폰이 아니니까요.
      </p>

      <h2>기본 규칙: app-first</h2>
      <p>
        기본 규칙은 누군가의 취향이 아니라, iOS와 안드로이드 앱들이 이미 검증한
        관습을 옮긴 거예요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>역할</th><th>작은 화면 + 터치</th><th>그 외 환경</th></tr>
          </thead>
          <tbody>
            <tr><td>다이얼로그: confirmation (확인)</td><td>바텀 시트</td><td>모달</td></tr>
            <tr><td>다이얼로그: form (입력 폼)</td><td>전체 화면</td><td>모달</td></tr>
            <tr><td>다이얼로그: contextual (맥락 메뉴)</td><td>바텀 시트</td><td>팝오버</td></tr>
            <tr><td>내비게이션</td><td>하단 탭 바 (마우스면 서랍)</td><td>medium은 레일, expanded는 사이드바</td></tr>
            <tr><td>주 행동 버튼</td><td>하단 고정 바 (마우스면 하단 붙박이)</td><td>본문 속 제자리</td></tr>
            <tr><td>밀도</td><td colSpan={2}>터치는 touch, 마우스는 comfortable - 크기와 무관하게요. <Link href="/ko/concepts/density">밀도</Link> 참고</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
