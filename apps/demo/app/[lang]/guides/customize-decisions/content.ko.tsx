import Link from 'next/link'

export default function CustomizeDecisionsKo() {
  return (
    <div className="doc" lang="ko">
      <h1>결과 맞춤 설정</h1>
      <p className="lede">
        Protean의 기본 규칙이 대부분 맞지만, 모든 서비스가 같은 UI 관습을 가지는
        건 아니에요. 이 Dialog만 항상 시트로 열고 싶거나, 서비스 전체의 규칙을
        바꾸고 싶거나, 사용자가 밀도를 직접 선택하게 하거나, 구조는 쓰되 우리
        디자인 시스템으로 스타일링하고 싶을 수 있어요. 이럴 때는{' '}
        <strong>가장 가까운 범위부터</strong> 바꾸면 돼요.
      </p>
      <pre><code>{`컴포넌트 하나     → presentation 직접 지정
프로젝트 전체     → policy 변경
사용자 설정       → density 지정
실제 모양과 배치  → CSS`}</code></pre>

      <h2>1. 이 컴포넌트 하나만 바꾸기</h2>
      <p>
        특정 화면 하나만 기본 결과와 다르게 만들고 싶다면 가장 간단한 방법은
        컴포넌트에 직접 지정하는 거예요.
      </p>
      <pre><code>{`<Dialog.Root role="form" presentation="sheet">
  ...
</Dialog.Root>`}</code></pre>
      <p>이 값은 기본 판단보다 우선해요.</p>
      <h3>특정 화면 크기에서만 바꿀 수도 있어요</h3>
      <pre><code>{`<Dialog.Root
  role="form"
  presentation={{ compact: "fullscreen" }}
>
  ...
</Dialog.Root>`}</code></pre>
      <p>
        이 경우 compact에서만 직접 지정한 결과를 사용하고, 지정하지 않은
        크기에서는 기본 규칙으로 돌아가요.
      </p>
      <h3>이런 경우에 사용해요</h3>
      <p>
        인스턴스 지정은 &quot;이 화면만 특별해요&quot;라는 예외를 표현할 때
        좋아요. 결제 확인 Dialog만 항상 모달, 특정 관리자 Navigation만 사이드바
        같은 경우요. 하지만 같은 <code>presentation=&quot;sheet&quot;</code>가
        여러 파일에 반복되기 시작한다면 프로젝트 규칙으로 올리는 편이 좋아요.
      </p>

      <h2>2. 프로젝트 전체의 기본 규칙 바꾸기</h2>
      <p>
        서비스 전체에서 같은 관습을 사용하고 싶다면 <code>definePolicy()</code>로
        프로젝트 규칙을 만들 수 있어요. 예를 들어 기본 규칙에서는 작은 터치
        화면의 <code>form</code> Dialog가 전체 화면으로 열리는데, 우리 서비스는
        이 경우도 시트를 쓴다고 해볼게요.
      </p>
      <pre><code>{`// protean.config.ts
import { appFirst, definePolicy } from "@protean-ui/react";

export const policy = definePolicy({
  extends: appFirst,
  overlay: ({ traits, role, defaults }) => {
    if (traits.size === "compact" && role === "form") {
      return "sheet";
    }
    return defaults();
  },
});`}</code></pre>
      <p>앱 최상단에서 연결해요.</p>
      <pre><code>{`import { ProteanProvider } from "@protean-ui/react";
import { policy } from "./protean.config";

<ProteanProvider policy={policy}>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        이제 각 Dialog에서 <code>presentation=&quot;sheet&quot;</code>를 반복하지
        않아도 돼요.
      </p>
      <h3>defaults()는 바꾸지 않은 판단을 그대로 유지해요</h3>
      <p>
        프로젝트 규칙을 만든다고 모든 환경의 결과를 다시 작성할 필요는 없어요.{' '}
        <code>return defaults()</code>로 기본 <code>appFirst</code> 규칙에 다시
        맡길 수 있어요. 프로젝트 정책은 기본 규칙 전체를 복사하는 파일이 아니라{' '}
        <strong>우리 서비스가 다른 부분만 기록하는 파일</strong>로 유지하는 편이
        좋아요.
      </p>
      <h3>바꿀 수 있는 규칙</h3>
      <p>현재 policy에서는 다음 영역의 기본 결과를 바꿀 수 있어요.</p>
      <pre><code>{`overlay · navigation · primaryAction · hint · listDetail · density`}</code></pre>
      <p>
        필요한 영역만 작성하면 돼요. 처음부터 모든 callback을 만들 필요는 없어요.
      </p>

      <h2>어떤 설정이 이기나요?</h2>
      <p>결과를 여러 곳에서 설정했다면 가까운 설정이 우선해요.</p>
      <pre><code>{`1. 컴포넌트에 직접 지정한 값  (instance)
2. 프로젝트 policy            (policy)
3. 기본 규칙 appFirst         (pack)`}</code></pre>
      <p>
        예를 들어 프로젝트 정책에서 form Dialog를 시트로 정했더라도, 해당
        Dialog에 <code>presentation=&quot;modal&quot;</code>을 직접 지정했다면
        모달이 사용돼요.
      </p>

      <h2>3. 사용자가 화면 밀도를 선택하게 만들기</h2>
      <p>
        어떤 사용자는 화면에 더 많은 정보를 보고 싶고, 어떤 사용자는 넉넉한 터치
        영역을 선호할 수 있어요. 사용자 설정으로 밀도를 제공하려면{' '}
        <code>ProteanProvider</code>의 <code>density</code>를 사용해요. 사용
        가능한 값은 <code>compact</code> · <code>comfortable</code> ·{' '}
        <code>touch</code>예요.
      </p>
      <pre><code>{`const [density, setDensity] =
  useState<"compact" | "comfortable" | "touch">("comfortable");

<ProteanProvider density={density}>
  <App />
</ProteanProvider>`}</code></pre>
      <h3>Provider가 DOM 전체에 data-density를 찍는 건 아니에요</h3>
      <p>
        이 부분은 중요해요. <code>ProteanProvider</code>는 React context를 통해
        density 선택을 전달하지만, 자체 DOM wrapper를 만들지 않아요. Dialog ·
        Select · Menu · Tooltip처럼 Portal로 열리는 Protean 팝업은 자신에게
        필요한 <code>data-density</code>를 직접 표시해요. 하지만{' '}
        <strong>일반 페이지 콘텐츠나 프로젝트 자체 컴포넌트까지 같은 density
        token을 사용하고 싶다면 직접 연결해야 해요.</strong>
      </p>
      <h3>정적 콘텐츠에도 같은 density를 연결하기</h3>
      <pre><code>{`<ProteanProvider density={density}>
  <div data-density={density}>
    <App />
  </div>
</ProteanProvider>`}</code></pre>
      <p>이제 일반 페이지 콘텐츠에서도 같은 규칙을 사용할 수 있어요.</p>
      <pre><code>{`[data-density="compact"] {
  /* compact density를 사용하는 프로젝트 스타일 */
}`}</code></pre>
      <h3>자동 밀도를 사용한다면 연결하지 않아도 돼요</h3>
      <p>
        사용자가 직접 density를 선택하지 않는다면 기본 token은 CSS의 입력 환경을
        그대로 사용해요 - 정밀한 pointer는 comfortable, coarse pointer는 touch
        방향이에요. 단순히 입력 방식에 따라 크기를 바꾸기 위해 JavaScript에서{' '}
        <code>data-density</code>를 만들 필요는 없어요.{' '}
        <strong>사용자 선택처럼 CSS만으로 알 수 없는 상태를 연결할 때만 필요해요.</strong>
      </p>
      <div className="callout">
        <strong>시트는 특별해요.</strong> 시트는 손가락으로 사용하는 표면이라,
        현재 token 계약에서는 Dialog · Menu · Select의 시트 팝업에 CSS가 터치
        크기를 적용해요. 사용자가 compact를 선택했더라도 시트 자체는 터치하기
        쉬운 크기를 사용할 수 있어요 - 밀도 결정값과 시트가 실제로 표현하는
        크기는 같은 개념이 아니에요. 이 동작을 바꾸고 싶다면 JavaScript policy가
        아니라 CSS token 계약을 수정하는 문제인지 먼저 확인하세요.
      </div>

      <h2>4. 색상과 크기만 바꾸고 싶다면 CSS를 사용해요</h2>
      <p>
        UI가 어떤 패턴이 되어야 하는지는 마음에 들지만 디자인만 우리 서비스에
        맞추고 싶은 경우가 있어요. 이때 policy를 만들 필요는 없어요. Protean의
        token을 프로젝트 CSS에서 다시 연결하면 돼요.
      </p>
      <pre><code>{`:root {
  --protean-accent: var(--color-brand);
  --protean-surface: var(--color-surface);
  --protean-ink: var(--color-text);
  --protean-danger: var(--color-danger);
}`}</code></pre>
      <h3>밀도 값도 CSS에서 바꿀 수 있어요</h3>
      <p>
        기본 profile 값(compact 28/32, comfortable 36/40, touch 44/48)이 우리
        디자인 시스템과 다르다면 값을 다시 연결하면 돼요.
      </p>
      <pre><code>{`[data-density="compact"] {
  --protean-row: 30px;
  --protean-target: 34px;
}`}</code></pre>
      <p>
        Protean이 이 숫자를 JavaScript로 계산하는 건 아니에요. 실제 값은 CSS가
        소유해요.
      </p>

      <h2>DOM hook은 세 가지부터 보면 돼요</h2>
      <p>Protean을 스타일링할 때 모든 data 속성을 외울 필요는 없어요.</p>
      <pre><code>{`data-scope         어떤 컴포넌트인지
data-part          그 안에서 어떤 부분인지
data-presentation  현재 어떤 표현이 선택됐는지`}</code></pre>
      <p>예를 들어 Dialog의 시트 모습만 스타일링하려면:</p>
      <pre><code>{`[data-scope="overlay"][data-part="popup"][data-presentation="sheet"] {
  /* 프로젝트의 Sheet 디자인 */
}`}</code></pre>
      <h3>상태도 CSS에서 읽을 수 있어요</h3>
      <p>
        presentation이 없는 CSS 중심 컴포넌트도 자신의 상태를 다른 data 속성으로
        표시해요.
      </p>
      <pre><code>{`ListDetail      data-detail-active
Actions         data-secondary · data-overflow-open · data-variant="danger"
SupportingPane  data-compact="stacked" · data-open`}</code></pre>
      <p>
        즉 &quot;presentation이 없으면 커스터마이징할 수 없다&quot;는 뜻이
        아니에요. 컴포넌트가 노출하는 의미 있는 DOM 상태를 CSS에서 사용할 수
        있어요. 예를 들어 ListDetail의 2-pane 배치를 프로젝트가 직접 정의하려면{' '}
        <code>[data-scope=&quot;list-detail&quot;][data-presentation=&quot;panes&quot;]</code>
        에 스타일을 쓰면 돼요.
      </p>

      <h2>실제 레이아웃도 바꿀 수 있어요</h2>
      <p>
        Screen은 presentation이 없는 CSS 중심 컴포넌트예요. 구조는 그대로
        사용하면서 프로젝트가 레이아웃을 직접 만들 수 있어요.
      </p>
      <pre><code>{`[data-scope="screen"] {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
}

[data-scope="screen"] > [data-part="content"] {
  min-width: 0;
}`}</code></pre>
      <p>
        이 경우 Protean의 React 구조는 사용하지만 페이지 Grid는 프로젝트가
        소유해요. Navigation도 같은 방식이에요:
      </p>
      <pre><code>{`[data-scope="navigation"] [data-part="link"] {
  /* 프로젝트 Navigation 디자인 */
}

[data-scope="navigation"][data-presentation="sidebar"] {
  /* 프로젝트 sidebar 구조 */
}`}</code></pre>
      <div className="callout">
        <strong>Screen.Navigation wrapper 주의:</strong> 참고 레이아웃(
        <code>protean-defaults</code>)에서는 Screen의 navigation 슬롯에{' '}
        <code>display: contents</code>가 적용될 수 있어요. 이 경우 wrapper 박스
        자체에 배경 · 테두리 · 크기를 주는 커스텀 스타일이 예상대로 동작하지
        않아요. 그런 스타일은 안쪽의 Navigation 요소에 주세요.
      </div>

      <h2>기존 Button 디자인 시스템 연결하기</h2>
      <p>
        Protean은 버튼 브랜드 스타일을 소유하려는 라이브러리가 아니에요.
        PrimaryAction의 실제 버튼과 Actions의 항목에 프로젝트 스타일을 연결하면
        돼요.
      </p>
      <pre><code>{`[data-scope="primary-action"] [data-part="button"] {
  font: inherit;
  border-radius: var(--button-radius);
  background: var(--button-primary-bg);
  color: var(--button-primary-text);
}

[data-scope="actions"] [data-part="item"] {
  /* 기존 Action Button 스타일 */
}`}</code></pre>

      <h2>package 스타일보다 프로젝트 CSS가 우선해요</h2>
      <p>
        Protean의 CSS는 <code>@layer protean</code> 안에 들어 있어요. 그래서
        일반적인 프로젝트의 unlayered CSS는 Protean 참고 스타일보다 우선해요.
        selector 경쟁이나 <code>!important</code>를 늘리기 전에 이 layer 계약을
        활용해 주세요. (참고 스타일 내부의 일부 위치 잡기 규칙에는 명시적{' '}
        <code>!important</code>가 있어서, 모든 스타일을 무조건 한 줄로 덮을 수
        있다는 뜻은 아니에요.)
      </p>

      <h2>protean-defaults는 무엇인가요?</h2>
      <p>
        팝업(Dialog · Select · Menu)의 참고 스타일은 문서 전체에서 적용되지만,
        Navigation · Screen · PrimaryAction · Actions · SupportingPane 같은
        페이지 레이아웃 요소는 기존 앱 레이아웃을 갑자기 바꾸면 위험해요. 그래서
        참고 레이아웃은 <code>protean-defaults</code> 클래스 아래에서만 적용돼요.
        프로젝트 레이아웃을 직접 작성한다면 이 클래스를 사용하지 않아도 돼요.
      </p>
      <div className="callout">
        <strong>중요한 제한:</strong> 참고 레이아웃의 규칙은 기본 크기 경계와
        기본 규칙의 동작을 전제로 작성돼 있어요.{' '}
        <code>presentation=&quot;sidebar&quot;</code>처럼 판단만 바꾸면{' '}
        <strong>판단 결과와 DOM의 <code>data-presentation</code></strong>이
        바뀌고, 실제 배치는 여전히 스타일 계층이 담당해요. 기본 규칙과 다른 결과를
        만들었다면 해당 data 속성에 맞는 프로젝트 CSS도 함께 작성해 주세요.
      </div>

      <h2>화면 크기 경계를 바꾸고 싶다면</h2>
      <p>
        기본 크기 등급은 compact / medium / expanded이고, 기본 경계는 600px과
        840px이에요. 다른 기준이 필요하다면 <code>thresholds</code>를 사용해요.
      </p>
      <pre><code>{`<ProteanProvider
  thresholds={{ medium: 640, expanded: 960 }}
>
  <App />
</ProteanProvider>`}</code></pre>
      <div className="callout">
        <strong>thresholds를 바꾸면 CSS도 확인하세요.</strong> 참고 스타일의
        페이지 레이아웃 미디어쿼리는 기본 600 / 840 기준을 사용해요. Provider의
        값을 바꾼다고 참고 CSS의 미디어쿼리가 자동으로 따라 바뀌지 않아요. 결정
        경계와 CSS 경계를 서로 다른 값으로 두고 잊는 것이 가장 피해야 할
        설정이에요.
      </div>
      <p>
        참고로 경계 근처에서 창 너비가 조금 움직일 때 UI가 왕복하지 않도록 16px의
        완충 구간(hysteresis)을 사용해요. 이 값은 현재 Provider에서 설정하는
        옵션이 아니에요.
      </p>

      <h2>사용자 모션 설정은 CSS가 바로 처리해요</h2>
      <p>
        Protean은 환경 정보로 <code>reducedMotion</code>도 수집해요. 하지만 참고
        스타일의 애니메이션(시트와 SupportingPane의 올라오는 동작 등)은 애초에{' '}
        <code>@media (prefers-reduced-motion: no-preference)</code> 안에서만
        적용돼요. 사용자가 운영체제에서 동작 줄이기를 켰다면 참고 애니메이션은
        실행되지 않아요. 필요하면 커스텀 policy에서{' '}
        <code>traits.reducedMotion</code>을 읽을 수도 있지만, 단순히 애니메이션을
        줄이기 위해 JS 판단을 추가하는 건 권장 경로가 아니에요.{' '}
        <strong>CSS가 이미 직접 알 수 있는 사용자 선호는 CSS에 맡겨요.</strong>
      </p>

      <h2>5. 왜 이런 결과가 나왔는지 확인하기</h2>
      <p>
        커스터마이징하다 보면 &quot;왜 이 Dialog가 시트로 열렸지?&quot;처럼 실제
        판단이 궁금할 수 있어요. 가장 먼저 DOM을 확인해 보세요.
      </p>
      <pre><code>{`data-presentation="sheet"
data-density="touch"`}</code></pre>
      <p>
        CSS 문제인지 판단 문제인지 구분할 때 유용해요. 그리고 개발 모드에서는
        모든 결정 컴포넌트가 판단할 때마다 콘솔에 이유를 자동으로 찍어요.
      </p>
      <pre><code>{`[protean] overlay(form) -> fullscreen [pack:app-first] size=compact input=touch`}</code></pre>
      <p>읽는 법은 이래요.</p>
      <pre><code>{`overlay(form)   어떤 영역의 어떤 역할인지
fullscreen      어떤 결과인지
[pack:...]      누가 결정했는지
size= input=    당시 주요 환경`}</code></pre>
      <p>
        결정의 출처는 <code>instance</code>(컴포넌트에 직접 지정) ·{' '}
        <code>policy</code>(프로젝트 규칙) · <code>pack</code>(기본 규칙) 중
        하나예요. 이 출력을 만드는 <code>explain(decision)</code>은 공개
        API라서, 저수준에서 <code>Decision</code>을 직접 다룰 때 같은 형식으로
        진단할 수 있어요.
      </p>
      <h3>환경 값을 직접 확인해야 한다면</h3>
      <p>공개 <code>useTraits()</code> hook을 사용할 수 있어요.</p>
      <pre><code>{`import { useTraits } from "@protean-ui/react";

function EnvironmentDebug() {
  const traits = useTraits();
  return <pre>{JSON.stringify(traits, null, 2)}</pre>;
}`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>값</th><th>의미</th></tr></thead>
          <tbody>
            <tr><td><code>size</code></td><td><code>compact</code> · <code>medium</code> · <code>expanded</code></td></tr>
            <tr><td><code>input</code></td><td><code>touch</code> · <code>pointer</code> · <code>hybrid</code> - hybrid는 기본 패턴 규칙에서 마우스 기준으로 판단해요</td></tr>
            <tr><td><code>hover</code></td><td>호버가 가능한지</td></tr>
            <tr><td><code>reducedMotion</code></td><td>동작 줄이기 선호가 있는지</td></tr>
            <tr><td><code>virtualKeyboard</code></td><td>화면 키보드가 감지됐는지</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        <code>useTraits()</code>는 진단이나 custom policy 주변에서 유용하지만,
        컴포넌트 호출부에서 환경 분기를 다시 만들기 위한 API로 사용하지 마세요.
        policy에서는 compact / medium / expanded 같은 환경 이름으로 판단하고,
        실제 threshold와 CSS 값은 별도의 설정 계층이 소유해요.
      </div>

      <h2>policy를 처음부터 새로 만들 수도 있어요</h2>
      <p>
        대부분의 프로젝트에서는 <code>definePolicy(&#123; extends: appFirst,
        ... &#125;)</code>면 충분해요. 조직 전체에서 완전히 다른 UI 관습을
        공유해야 한다면 <code>PolicyPack</code> 자체를 만들어{' '}
        <code>ProteanProvider</code>에 전달할 수도 있어요.
      </p>
      <pre><code>{`특정 컴포넌트 예외        → instance override
서비스 관습 변경          → definePolicy
완전히 다른 기본 규칙 체계 → PolicyPack`}</code></pre>
      <p>
        처음부터 custom PolicyPack을 만드는 걸 기본 사용법으로 권장하지 않아요.
        여러 앱이 동일한 규칙을 공유해야 하는 조직 환경에서 주로 고려하면 돼요.
      </p>

      <h2>무엇을 어디에서 바꿔야 하나요?</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>바꾸고 싶은 것</th><th>사용하면 좋은 방법</th></tr></thead>
          <tbody>
            <tr><td>이 Dialog 하나만 시트로</td><td><code>presentation</code></td></tr>
            <tr><td>compact에서만 다른 결과</td><td>크기별 <code>presentation</code> 지정</td></tr>
            <tr><td>서비스 전체 패턴 규칙</td><td><code>definePolicy()</code></td></tr>
            <tr><td>사용자가 밀도 선택</td><td><code>ProteanProvider density</code></td></tr>
            <tr><td>일반 페이지에도 같은 밀도</td><td><code>data-density</code> 직접 연결</td></tr>
            <tr><td>색상 · 여백 · 모서리</td><td>CSS token</td></tr>
            <tr><td>특정 팝업 모양</td><td><code>data-scope</code> + <code>data-part</code> + <code>data-presentation</code></td></tr>
            <tr><td>Screen 같은 레이아웃</td><td>프로젝트 CSS</td></tr>
            <tr><td>Button 디자인 시스템 연결</td><td><code>data-part</code></td></tr>
            <tr><td>화면 크기 등급 경계</td><td><code>thresholds</code> + CSS 확인</td></tr>
            <tr><td>애니메이션 줄이기</td><td><code>prefers-reduced-motion</code> CSS</td></tr>
            <tr><td>왜 이런 결과인지 확인</td><td>DOM 스탬프 / 콘솔 로그 / <code>explain()</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2>정리하면</h2>
      <p>
        Protean을 커스터마이징할 때 모든 걸 policy로 해결하려고 하지 마세요. 가장
        작은 도구부터 선택하면 돼요.{' '}
        <strong>결정을 바꾸고 싶으면 presentation이나 policy를, 실제 모양을
        바꾸고 싶으면 CSS를 사용해요.</strong> Protean이 맡는 결정과 CSS가 맡는
        표현을 분리해 두면 커스터마이징도 단순해져요. 다음은{' '}
        <Link href="/ko/guides/composition">함께 쓰기</Link>예요.
      </p>
    </div>
  )
}
