import Link from 'next/link'

export default function ScopeKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Protean이 하는 일과 하지 않는 일</h1>
      <p className="lede">
        Protean UI는 반응형 React 앱 전체를 대신하는 프레임워크가 아니에요. 더
        좁은 문제 - 같은 기능을 환경에 따라 다른 UI 패턴으로 보여줘야 해서{' '}
        <code>isMobile ? &lt;MobileSheet /&gt; : &lt;DesktopPopover /&gt;</code>{' '}
        같은 분기가 앱 곳곳에 반복되는 문제 - 를 맡아요. 한 문장으로 말하면:{' '}
        <strong>Protean은 환경에 따라 UI의 패턴과 밀도를 선택하고, 그 결과를
        실제 컴포넌트와 CSS에 연결하는 레이어예요.</strong> 그보다 넓은 모든
        반응형 문제를 해결하려고 하지는 않아요.
      </p>

      <h2>현재 Protean이 결정하는 것</h2>
      <p>현재 policy에는 여섯 가지 결정 영역이 있어요. 사용자 관점에서는 두 종류예요.</p>
      <pre><code>{`패턴 적응
overlay        modal · sheet · fullscreen · popover
navigation     bar · drawer · rail · sidebar
primaryAction  action-bar · sticky-footer · inline
hint           tooltip · popover
listDetail     stack · panes

밀도
density        compact · comfortable · touch`}</code></pre>
      <p>
        즉 현재 자동 판단 범위를 압축하면{' '}
        <strong>&quot;어떤 패턴인가? + 얼마나 조밀한가?&quot;</strong>예요.
      </p>

      <h2>현재 제공하는 컴포넌트</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>컴포넌트</th><th>맡는 역할</th></tr></thead>
          <tbody>
            <tr><td><code>Dialog</code></td><td>확인 · 폼 · contextual Overlay</td></tr>
            <tr><td><code>Select</code></td><td>값 하나 선택</td></tr>
            <tr><td><code>Menu</code></td><td>작업 목록</td></tr>
            <tr><td><code>Navigation</code></td><td>앱 탐색</td></tr>
            <tr><td><code>ListDetail</code></td><td>목록 + 상세</td></tr>
            <tr><td><code>PrimaryAction</code></td><td>화면의 가장 중요한 행동</td></tr>
            <tr><td><code>Tooltip</code></td><td>짧은 도움말</td></tr>
            <tr><td><code>Screen</code></td><td>페이지 기본 골격</td></tr>
            <tr><td><code>Actions</code></td><td>여러 작업 묶음</td></tr>
            <tr><td><code>SupportingPane</code></td><td>본문 + 보조 영역</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        여기에 공통 기능으로 <code>ProteanProvider</code> ·{' '}
        <code>ProteanBoundary</code> · policy API · 환경 traits · density · CSS
        token · reference.css가 있어요. 공개 어댑터는 현재{' '}
        <code>@protean-ui/react</code> 하나예요(React 18 이상). 판단 엔진 자체는
        DOM과 독립적이지만, 다른 프레임워크용 어댑터가 배포되어 있지는 않아요.
      </p>

      <h2>10개가 모두 같은 방식으로 적응하는 건 아니에요</h2>
      <p>
        Dialog · Select · Menu · Navigation · ListDetail · PrimaryAction ·
        Tooltip은 환경에 따른 판단이 있어요. 다만 각 컴포넌트가 사용하는 환경
        정보는 같지 않아요 - Tooltip은 화면 너비보다 hover 가능 여부가 중요하고,
        ListDetail은 공간만 봐요. 그리고 여러 컴포넌트가 같은 결정 계약을 공유할
        수 있어요 - Select와 Menu는 Dialog의 contextual과 같은 overlay 계약을
        타요. &quot;컴포넌트 수 = 결정 영역 수&quot;가 아니에요.
      </p>
      <p>
        반면 Screen · Actions · SupportingPane에는 별도의 presentation 판단이
        없어요. 안정적인 DOM 구조와 상태를 제공하고 실제 반응형 배치는 CSS가
        담당하는 CSS 중심 도우미예요(SupportingPane의{' '}
        <code>compact=&quot;sheet | stacked&quot;</code>는 개발자 선택이지 판단
        결과가 아니에요). &quot;Protean 컴포넌트 = 모두 JavaScript 판단&quot;
        이라고 이해하면 안 돼요.
      </p>

      <h2>CSS를 대체하지 않아요</h2>
      <p>
        Protean을 쓰더라도 media query와 container query는 계속 사용해요. 실제로
        Protean의 참고 스타일 자체가 CSS를 적극적으로 사용해요.
      </p>
      <pre><code>{`Popover인가 Sheet인가?              → Protean
Sidebar인가 Bottom Navigation인가?  → Protean
행 밀도가 comfortable인가 touch인가? → Protean

2열인가 1열인가?                    → CSS
gap이 16px인가 24px인가?            → CSS
카드가 좁아지면 세로 배치인가?       → CSS`}</code></pre>
      <p>
        Protean은 CSS와 경쟁하는 라이브러리가 아니에요.{' '}
        <strong>CSS가 잘하는 일은 계속 CSS에 맡겨요.</strong>
      </p>

      <h2>디자인 시스템도 아니에요</h2>
      <p>
        브랜드 컬러, 폰트, 버튼 variant 체계, 아이콘 세트를 강제하지 않아요.{' '}
        <code>reference.css</code>는 바로 실행해볼 수 있는{' '}
        <strong>참고 구현 + token 계약</strong>이지 반드시 따라야 하는 디자인이
        아니에요. 실제 프로젝트에서는 Protean의 DOM · 판단 계약에 우리 디자인
        시스템 CSS를 조합할 수 있고, token을 프로젝트 token에 연결할 수도 있어요.
      </p>
      <pre><code>{`:root {
  --protean-accent: var(--color-brand);
  --protean-surface: var(--color-surface);
}

/* 여러분의 컴포넌트도 같은 어휘로 */
.my-checkbox {
  min-height: var(--protean-target);
}`}</code></pre>
      <p>
        레이아웃 참고 스타일이 <code>protean-defaults</code> opt-in 뒤에 있는
        것도 같은 이유예요 - 참고 스타일은 강제 디자인 시스템이 아니에요.
      </p>

      <h2>모든 UI 컴포넌트를 제공하지 않아요</h2>
      <p>
        Button · Checkbox · Tabs · Accordion · Toast · TextField 같은 범용 UI
        전체를 Protean 컴포넌트로 다시 만들지 않아요. 그런 컴포넌트는 대부분
        환경에 따라 <strong>패턴을 교체해야 하는 문제</strong>가 없기 때문이에요.
        현재 React 패키지는 기반 상호작용 구현으로 Base UI를 dependency로
        사용하지만, Base UI 전체를 Protean 이름으로 다시 export하지는 않아요.
        필요한 일반 UI는 Base UI나 프로젝트의 기존 컴포넌트 라이브러리를 함께
        사용하면 돼요.
      </p>
      <pre><code>{`import { Dialog } from '@protean-ui/react'      // 판단: 환경이 모습을 정해요
import { Field } from '@base-ui/react/field'     // 그대로 가져다 써요
import { Input } from '@base-ui/react/input'

<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <Field.Root>
      <Field.Label>주소</Field.Label>
      <Input />
    </Field.Root>
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        이미 프로젝트에 Button · Input · Theme이 있다면 그대로 유지하면 돼요.
        Protean은 그 위에서 &quot;이 기능이 지금 어떤 패턴으로 보여야
        하는가?&quot;가 필요한 부분만 맡아요. 떠날 때도 Protean 컴포넌트를 같은
        기반 부품으로 되돌리면 돼요.
      </p>

      <h2>이런 것도 아니에요</h2>
      <ul>
        <li>
          <strong>범용 breakpoint 엔진</strong> - compact / medium / expanded는
          판단을 위한 환경 분류예요. 프로젝트 CSS의 모든 breakpoint를 여기에
          통합할 필요는 없고, <code>@media (width &gt;= 720px)</code>가 필요하면
          그냥 쓰면 돼요.
        </li>
        <li>
          <strong>isMobile의 다른 이름</strong> - <code>useTraits()</code>로
          기술적으로는 환경 분기를 다시 만들 수 있지만, 그건 진단과 custom policy를
          위한 escape hatch예요. 일반적인 adaptive UI에서는 역할 컴포넌트와
          policy를 우선 사용하세요.
        </li>
        <li>
          <strong>기기 판별 라이브러리</strong> - traits에는 기기 모델이나 OS
          이름이 없어요. 있는 건 사용 가능한 공간 · 입력 방식 · hover · 동작
          줄이기 · 가상 키보드 상태예요.
        </li>
        <li>
          <strong>모든 컨테이너의 새 viewport</strong> -{' '}
          <code>ProteanBoundary</code>는 Overlay 판단의 size만 컨테이너 폭으로
          바꿔요. 페이지 chrome의 컨테이너 적응은 CSS container query 몫이에요.
        </li>
        <li>
          <strong>Geometry 엔진</strong> - Boundary가 컨테이너 폭을 측정하는 건
          size 판단에 필요한 범위에 한정돼요. anchor 위치 계산은 기반 primitive가,
          일반 레이아웃은 CSS가 담당해요.
        </li>
        <li>
          <strong>라우터 · 폼 · 비즈니스 로직</strong> - 현재 페이지가 어디인지
          (<code>current</code>), 어떤 항목이 선택됐는지(<code>detailActive</code>),
          폼이 유효한지는 앱이 알려줘요. Protean은 그 의미를 환경에 맞게 표현하는
          부분을 맡아요.
        </li>
        <li>
          <strong>접근성 자동 인증</strong> - 접근성을 고려한 상호작용 계약을
          제공하지만 앱 전체의 표준 준수를 보증하지 않아요.{' '}
          <Link href="/ko/guides/accessibility">접근성</Link> 참고.
        </li>
      </ul>

      <h2>Shape와 Spacing은 별도 결정이 아니에요</h2>
      <p>
        token에는 <code>--protean-shape</code>와 <code>--protean-pad</code>가
        있고, 참고 token은 모습에 따라 값을 달리해요 - 모달은 카드 형태, 시트는
        위쪽 모서리만, 전체 화면은 radius 없음. 하지만 현재 구조는{' '}
        <strong>presentation이 먼저 결정되고 CSS가 그 결과의 shape와 여백을
        표현하는 것</strong>이에요. <code>definePolicy(&#123; shape: ...
        &#125;)</code> 같은 별도 결정 영역은 현재 없어요. 모서리와 간격을 바꾸고
        싶다면 CSS token을 사용하세요. 일반적인 gap · margin · grid spacing은
        프로젝트 CSS와 디자인 시스템이 소유해요.
      </p>

      <h2>현재 지원 범위를 한눈에 보면</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>문제</th><th>Protean이 맡나요?</th></tr></thead>
          <tbody>
            <tr><td>Popover ↔ Sheet, Modal ↔ Fullscreen 선택</td><td>예</td></tr>
            <tr><td>Navigation · PrimaryAction · ListDetail 패턴 선택</td><td>예</td></tr>
            <tr><td>Tooltip ↔ 탭 도움말 선택</td><td>예</td></tr>
            <tr><td>Density profile 선택</td><td>예</td></tr>
            <tr><td>컨테이너 폭 기반 Overlay 판단</td><td>예</td></tr>
            <tr><td>기본 페이지 골격 · 여러 Action 정리 · 보조 Pane</td><td>일부 - CSS 중심 도우미</td></tr>
            <tr><td>모든 grid/flex 반응형 레이아웃</td><td>아니요 - CSS</td></tr>
            <tr><td>모든 UI 컴포넌트 · 브랜드 디자인 시스템</td><td>아니요</td></tr>
            <tr><td>모든 breakpoint 통합 · 임의 geometry 계산</td><td>아니요</td></tr>
            <tr><td>기기 모델 판별 · 라우터 / 선택 상태 · Form validation</td><td>아니요</td></tr>
            <tr><td>WCAG 준수 자동 인증</td><td>아니요</td></tr>
          </tbody>
        </table>
      </div>

      <h2>언제 Protean을 쓰면 좋은가요?</h2>
      <p>
        <strong>같은 기능을 환경 때문에 두 구현으로 나누고 있는 경우</strong>에 잘
        맞아요 - 특히 두 구현 사이에서 상태 · focus · ARIA · density · 스타일까지
        함께 맞춰야 한다면요. 반대로 &quot;폭이 좁으면 flex-direction만 바꾸고
        싶어요&quot;나 &quot;버튼 radius만 화면마다 조금 다르게&quot; 같은
        문제라면 CSS가 더 단순해요. Protean은{' '}
        <strong>환경에 따라 UI 패턴 자체를 선택해야 할 때</strong> 가장 의미가
        있어요.
      </p>
      <p>
        앞으로 범위를 넓힐 때도 같은 기준을 사용해요 - 환경에 따라 실제 패턴이
        달라지고, 앱마다 같은 분기가 반복되고, 상태 · focus · semantics까지
        연결해야 하는 문제인가? 단순한 시각 변화라면 계속 CSS에 남겨요.
      </p>

      <h2>정리하면</h2>
      <pre><code>{`패턴을 선택해야 해요        → Protean
밀도를 선택해야 해요        → Protean
레이아웃과 디자인 표현      → CSS / 디자인 시스템
앱의 의미와 상태            → 애플리케이션`}</code></pre>
      <p>
        <strong>Protean은 모든 반응형 문제를 해결하지 않고, UI 패턴을 선택해야
        하는 문제만 가져와요. 레이아웃과 실제 디자인은 계속 CSS와 여러분의 디자인
        시스템이 소유해요.</strong> 이 경계를 유지하는 것이 Protean을 작게
        유지하는 방법이기도 해요. 현재 검증 수준과 알려진 제한은{' '}
        <Link href="/ko/about/status">품질과 지원</Link>에서 확인할 수 있어요.
      </p>
    </div>
  )
}
