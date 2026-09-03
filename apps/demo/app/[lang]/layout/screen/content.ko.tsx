import Link from 'next/link'

export default function ScreenKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Screen</h1>
      <p className="lede">
        페이지의 <strong>기본 골격</strong>을 만들 때 사용해요. 앱 화면은 보통
        Navigation, 본문, 페이지 Actions 영역으로 나뉘는데, <code>Screen</code>은
        이 영역들의 의미를 마크업하고 CSS가 현재 공간에 맞게 배치할 수 있도록
        공통 구조를 제공해요.
      </p>

      <div className="callout">
        <strong>CSS 중심 컴포넌트예요.</strong> Screen은 화면 크기를 JavaScript로
        측정해서 다른 형태를 선택하지 않아요. 같은 DOM 구조를 유지하고, 실제
        반응형 배치는 CSS가 담당해요.
      </div>

      <h2>기본 사용법</h2>
      <pre><code>{`<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="주 메뉴">...</Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>
    <h1>주문 관리</h1>
    <OrderList />
  </Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root>새 주문</PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>
      <pre><code>{`Screen.Navigation → 페이지 탐색
Screen.Content    → 주요 내용
Screen.Actions    → 페이지의 주요 행동 영역`}</code></pre>
      <p>앱에서 환경별 Screen을 따로 만들 필요는 없어요.</p>

      <h2>화면에 따라 어떻게 배치되나요?</h2>
      <p>참고 스타일을 사용하면 같은 구조가 화면 공간에 따라 다르게 배치돼요.</p>
      <h3>작은 터치 화면</h3>
      <p>본문을 중심으로 보여주고 Actions와 Navigation이 아래쪽에 배치돼요.</p>
      <pre><code>{`┌──────────────────────┐
│                      │
│        본문          │
│                      │
├──────────────────────┤
│       Actions        │
├──────────────────────┤
│     Navigation       │
└──────────────────────┘`}</code></pre>
      <p>
        아래에 붙는 버튼과 탭 바는 <code>position: fixed</code>가 아니라 골격의
        격자 행이에요. 그래서 쌓이는 순서나 안전 영역 처리를 따로 조율하는 코드가
        필요 없어요.
      </p>
      <h3>작은 화면 + 마우스</h3>
      <p>같은 작은 화면이라도 참고 레이아웃에서는 Navigation 영역이 본문 위쪽에 놓여요.</p>
      <pre><code>{`┌──────────────────────┐
│     Navigation       │
├──────────────────────┤
│        본문          │
├──────────────────────┤
│       Actions        │
└──────────────────────┘`}</code></pre>
      <h3>공간이 충분한 화면</h3>
      <p>넓은 화면에서는 Navigation과 본문을 나란히 배치해요.</p>
      <pre><code>{`┌────────────┬─────────────────────┐
│            │                     │
│ Navigation │        본문         │
│            │                     │
│            ├─────────────────────┤
│            │       Actions       │
└────────────┴─────────────────────┘`}</code></pre>
      <p>
        Navigation 자체가 <code>bar</code>, <code>drawer</code> 중 무엇을
        사용할지는 <Link href="/ko/components/navigation">Navigation</Link>{' '}
        컴포넌트가 담당하고, Screen은 그 영역이 페이지 안에서 놓일 자리를
        제공해요. 그리고 위 그림들은 <strong>Screen이 세 가지 React 트리로
        바뀌는 게 아니라</strong>, 같은 구조를 CSS가 다르게 배치한 결과예요.
      </p>
      <p>
        <Link href="/screen-demo">화면 데모</Link>에서 세 배치를 직접 오가
        보세요. 지금 보고 있는 이 문서 사이트의 뼈대도 Screen이에요.
      </p>

      <h2>presentation이 없는 이유</h2>
      <p>
        앞에서 본 Navigation이나 PrimaryAction에는{' '}
        <code>presentation=&quot;sidebar&quot;</code> 같은 결과가 있었어요.
        Screen에는 그런 presentation이 없어요. Screen 자체가 mobile-screen과
        desktop-screen 중 하나를 선택하는 컴포넌트가 아니기 때문이에요. Screen이
        제공하는 건 navigation · content · actions라는{' '}
        <strong>안정적인 페이지 구조</strong>이고, 그 구조를 한 열로 놓을지 두
        열로 놓을지는 CSS가 결정해요. 단순한 레이아웃 변화까지 JavaScript 정책으로
        올리지 않는 것이 Protean의 책임 경계예요.
      </p>

      <h2>참고 레이아웃을 사용하려면 opt-in이 필요해요</h2>
      <p>
        Screen의 반응형 참고 레이아웃은 <code>reference.css</code>를 import했다고
        자동으로 적용되지 않아요. 앱의 상위 요소에서 <code>protean-defaults</code>{' '}
        클래스를 직접 켜야 해요.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>
        opt-in인 이유는 간단해요. 페이지 전체 레이아웃은 기존 앱 구조에 큰 영향을
        줄 수 있기 때문이에요. Dialog처럼 떠서 열리는 컴포넌트를 시험하는 것과
        달리, Screen의 레이아웃을 켜는 건 앱 전체의 페이지 구조를 바꿀 수 있어서
        명시적으로 켜도록 되어 있어요.
      </p>
      <h3>기존 앱에 넣을 때는 이렇게 할 수도 있어요</h3>
      <p>
        이미 앱에 페이지 레이아웃 CSS가 있다면 Protean의 참고 레이아웃을 꼭
        사용할 필요는 없어요. Screen의 마크업만 사용하고 기존 CSS를 그대로 연결할
        수도 있어요.
      </p>
      <pre><code>{`<Screen.Root className="my-app-shell">
  ...
</Screen.Root>`}</code></pre>
      <p>
        Protean은 Screen을 사용한다고 해서 reference.css의 디자인을 강제하지
        않아요.
      </p>

      <h2>Screen.Actions와 Actions는 달라요</h2>
      <p>이름이 비슷해서 헷갈릴 수 있어요.</p>
      <pre><code>{`Screen.Actions
→ Screen 안에서 Actions가 놓일 영역

Actions.Root
→ 여러 작업 버튼을 하나의 도구 모음으로 다루는 별도 컴포넌트`}</code></pre>
      <p>둘을 같이 사용할 수도 있어요.</p>
      <pre><code>{`<Screen.Actions>
  <Actions.Root>...</Actions.Root>
</Screen.Actions>`}</code></pre>
      <p>
        <Link href="/ko/layout/actions">다음 페이지</Link>에서 Actions를 자세히
        설명할게요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>Screen은 각 영역을 CSS로 선택하기 쉽게 표시해요.</p>
      <pre><code>{`<div data-scope="screen">
  <div data-part="navigation">...</div>
  <main data-part="content">...</main>
  <div data-part="actions">...</div>
</div>`}</code></pre>
      <p>예를 들어 본문의 최대 너비를 바꾸고 싶다면:</p>
      <pre><code>{`[data-scope="screen"] > [data-part="content"] {
  max-width: 1200px;
  margin-inline: auto;
}`}</code></pre>
      <p>
        Screen 전체 grid를 프로젝트 레이아웃에 맞게 직접 정의할 수도 있어요.
        구체적인 <code>data-scope</code> / <code>data-part</code> 활용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>조각들</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>조각</th><th>그리는 것</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>Screen.Root</code></td><td><code>div[data-scope=&quot;screen&quot;]</code></td><td>골격의 루트예요. 일반 div 속성과 프로젝트 클래스를 붙일 수 있어요.</td></tr>
            <tr><td><code>Screen.Navigation</code></td><td><code>div[data-part=&quot;navigation&quot;]</code></td><td>Navigation이 놓일 영역이에요. 실제 탐색 UI는 안쪽의 Navigation 컴포넌트가 담당해요.</td></tr>
            <tr><td><code>Screen.Content</code></td><td><code>main[data-part=&quot;content&quot;]</code></td><td>주요 내용 영역이에요. <code>as</code>로 <code>main</code>(기본) 또는 <code>div</code>를 선택할 수 있어요.</td></tr>
            <tr><td><code>Screen.Actions</code></td><td><code>div[data-part=&quot;actions&quot;]</code></td><td>페이지 주요 행동 영역이에요. PrimaryAction의 위치 전략은 PrimaryAction이 결정해요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>모든 조각은 일반 HTML 속성을 그대로 전달받아요.</p>

      <h2>접근성</h2>
      <p>
        Screen이 접근성을 위해 복잡한 JavaScript 동작을 추가하는 건 아니에요.
        가장 중요한 부분은 의미 있는 HTML 구조를 유지하는 것이에요. 특히{' '}
        <code>Screen.Content</code>는 기본적으로 <code>&lt;main&gt;</code>을
        사용해요. 한 페이지에 <code>&lt;main&gt;</code> landmark가 여러 개 생기지
        않도록, 이미 바깥 레이아웃에 <code>&lt;main&gt;</code>이 있다면{' '}
        <code>as=&quot;div&quot;</code>를 사용해 주세요.
      </p>

      <h2>정리하면</h2>
      <p>
        <strong>Screen은 환경을 판단하는 컴포넌트가 아니라, CSS가 적응시킬 수
        있는 안정적인 페이지 골격이에요.</strong>
      </p>
      <pre><code>{`Screen → 영역의 의미를 표시
CSS    → 환경에 맞게 영역 배치`}</code></pre>
      <p>
        작은 화면용 Screen과 큰 화면용 Screen을 따로 만들 필요가 없어요. 참고
        레이아웃을 사용하려면 <code>protean-defaults</code>를 켜는 것도 잊지
        마세요. 다음은 <Link href="/ko/layout/actions">Actions</Link>예요.
      </p>
    </div>
  )
}
