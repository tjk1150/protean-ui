import Link from 'next/link'

export default function NavigationKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Navigation</h1>
      <p className="lede">
        홈, 검색, 알림, 설정처럼 <strong>앱의 주요 화면 사이를 이동할 때</strong>{' '}
        사용해요. 넓은 화면에서는 사이드바가 자연스럽고, 공간이 조금 줄어들면
        레일이 더 잘 맞을 수 있어요. 작은 화면에서도 항상 같은 모습이 되는 건
        아니에요. 손가락으로 사용한다면 바 형태가 편할 수 있고, 같은 크기의
        화면을 마우스로 사용한다면 열고 닫는 드로어가 더 자연스러울 수 있어요.
        Protean에서는 같은 탐색 항목을 한 번만 작성해요.
      </p>

      <div className="callout">
        지금 보고 있는 이 문서의 탐색 메뉴도 Protean Navigation이에요. 창을 좁혀
        보면 사이드바가 &quot;메뉴&quot; 버튼 뒤의 드로어로 바뀌어요.
      </div>

      <h2>기본 사용법</h2>
      <pre><code>{`<Navigation.Root aria-label="주 메뉴">
  <Navigation.Item href="/" icon={<HomeIcon />} current>
    홈
  </Navigation.Item>
  <Navigation.Item href="/search" icon={<SearchIcon />}>
    검색
  </Navigation.Item>
  <Navigation.Item href="/settings" icon={<SettingsIcon />}>
    설정
  </Navigation.Item>
</Navigation.Root>`}</code></pre>
      <p>앱이 알려주는 건 이것뿐이에요.</p>
      <ul>
        <li>어디로 이동하는지</li>
        <li>어떤 아이콘과 이름을 보여줄지</li>
        <li>현재 어느 페이지에 있는지</li>
      </ul>
      <p>
        <code>MobileNavigation</code>, <code>TabletNavigation</code>,{' '}
        <code>DesktopSidebar</code>를 따로 만들 필요는 없어요.
      </p>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>Protean의 기본 규칙은 Navigation을 네 가지 형태로 나눠요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>선택되는 형태</th><th>이런 모습이에요</th></tr>
          </thead>
          <tbody>
            <tr><td>작은 화면 + 터치</td><td><code>bar</code></td><td>주요 항목을 바로 누를 수 있는 하단 바</td></tr>
            <tr><td>작은 화면 + 마우스</td><td><code>drawer</code></td><td>버튼으로 열고 닫는 탐색 메뉴</td></tr>
            <tr><td>중간 크기 화면</td><td><code>rail</code></td><td>폭을 적게 차지하는 세로 탐색</td></tr>
            <tr><td>넓은 화면</td><td><code>sidebar</code></td><td>항목 이름까지 충분히 보여주는 사이드바</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>작은 화면이라고 모두 같은 Navigation이 되는 건 아니에요.</strong>{' '}
        여기서 Protean의 차이가 가장 잘 보여요.
      </p>
      <pre><code>{`작은 화면 + 터치
→ bar

작은 화면 + 마우스
→ drawer`}</code></pre>
      <p>
        <strong>화면 크기는 같은데 입력 방식이 다르기 때문에 결과도 달라져요.</strong>{' '}
        그래서 단순히 <code>isMobile ? &lt;MobileNavigation /&gt; :
        &lt;DesktopNavigation /&gt;</code>처럼 화면 폭 하나로 두 종류만 나누는
        것과는 달라요.
      </p>

      <h3>화면이 커질 때도 단계가 있어요</h3>
      <p>Navigation은 작은 화면과 큰 화면 둘로만 나뉘지 않아요. 공간이 늘어나면서:</p>
      <pre><code>{`bar / drawer
      ↓
     rail
      ↓
   sidebar`}</code></pre>
      <p>
        처럼 사용할 수 있는 공간에 맞는 형태를 선택해요. <code>rail</code>은
        사이드바 전체를 보여주기에는 공간이 아깝지만, Navigation 자체를 숨길
        필요까지는 없는 중간 단계예요. 넓은 화면에서는 <code>sidebar</code>로
        충분한 정보를 계속 보여줄 수 있어요.
      </p>

      <h2>네 개의 Navigation을 만드는 건 아니에요</h2>
      <p>
        중요한 점이 하나 있어요. Protean이 네 형태 중 하나를 선택한다고 해서
        React에서 서로 다른 Navigation 트리 네 개를 만들지는 않아요. Navigation
        항목은 같은 구조를 유지하고, 현재 선택된 형태가 Navigation에 표시되고,
        CSS가 그 상태에 맞춰 배치해요.
      </p>
      <pre><code>{`<nav
  data-scope="navigation"
  data-presentation="rail"
>`}</code></pre>
      <p>즉 역할은 이렇게 나뉘어요.</p>
      <pre><code>{`Protean
→ bar / drawer / rail / sidebar 중 무엇인지 선택

CSS
→ 같은 Navigation 구조를 실제 형태로 배치`}</code></pre>
      <p>
        Navigation 때문에 페이지 이동 데이터나 React 트리를 네 벌로 유지할 필요가
        없어요.
      </p>

      <h2>현재 페이지 표시하기</h2>
      <p>현재 보고 있는 항목에는 <code>current</code>를 지정할 수 있어요.</p>
      <pre><code>{`<Navigation.Item
  href="/settings"
  current={pathname === "/settings"}
>
  설정
</Navigation.Item>`}</code></pre>
      <p>
        현재 항목은 <code>aria-current=&quot;page&quot;</code>로 접근성에도
        연결돼요. 라우터를 사용하고 있다면 현재 URL을 기준으로{' '}
        <code>current</code>를 계산해서 전달하면 돼요. Protean이 앱의 라우팅 상태
        자체를 관리하지는 않아요.{' '}
        <strong>어디가 현재 페이지인지는 앱이 알고, Navigation은 그 의미를
        올바르게 표현해요.</strong>
      </p>

      <h2>링크가 아닌 작업에도 사용할 수 있어요</h2>
      <p>
        <code>Navigation.Item</code>에 <code>href</code>를 전달하면 링크로
        동작해요. <code>href</code>를 생략하면 버튼으로 렌더링돼요. 주소 대신
        상태로 화면을 바꾸는 앱이라면 버튼 모드에 <code>onClick</code>을 쓰면
        돼요. 일반적인 링크 · 버튼 속성은 그대로 전달돼요.
      </p>

      <h2>Bar에 항목이 너무 많다면</h2>
      <p>
        작은 터치 화면의 bar에는 모든 항목을 한 줄에 보여주기 어려울 수 있어요.
        Navigation은 일정 개수를 넘는 항목을 더보기 영역으로 보내요.
      </p>
      <pre><code>{`<Navigation.Root
  maxBarItems={5}
  overflowLabel="더보기"
>`}</code></pre>
      <p>
        <code>maxBarItems</code>(기본값 5)는 bar에서 사용할 수 있는{' '}
        <strong>전체 슬롯 수</strong>예요. 항목이 이보다 많아지면 넘치는 항목이
        더보기 버튼 뒤로 접히는데, 이때 <strong>더보기 버튼도 한 자리를
        사용해요</strong>. 예를 들어 항목이 7개면 4개가 바에 남고 나머지가
        더보기로 가요. bar가 아닌 형태(드로어 · 레일 · 사이드바)에서는 전체
        목록이 그대로 보여요.
      </p>
      <div className="callout">
        어떤 항목을 더보기로 보낼지는 브라우저의 실제 픽셀 너비를 측정해서
        정하지 않아요. <strong>항목 개수와 <code>maxBarItems</code>만으로</strong>{' '}
        정해져요. 그래서 서버와 브라우저가 언제나 같은 마크업을 그려요.
      </div>

      <h2>Drawer 버튼 이름 바꾸기</h2>
      <p>
        <code>drawer</code> 형태에서는 Navigation을 여는 버튼이 필요해요. 현재
        기본 라벨은 <code>Menu</code>예요. 필요하다면:
      </p>
      <pre><code>{`<Navigation.Root toggleLabel="메뉴">
  ...
</Navigation.Root>`}</code></pre>
      <p>
        처럼 바꿀 수 있어요. 스크린 리더 사용자도 버튼의 목적을 이해할 수 있도록
        서비스 언어에 맞는 이름을 사용해 주세요.
      </p>

      <h2>이 Navigation만 결과를 바꾸고 싶다면</h2>
      <p>
        <code>presentation</code>으로 형태를 직접 지정할 수 있어요. 사용할 수
        있는 값은 <code>bar</code> · <code>drawer</code> · <code>rail</code> ·{' '}
        <code>sidebar</code>이고, 환경별로 다르게 지정할 수도 있어요.
      </p>
      <pre><code>{`<Navigation.Root presentation="sidebar">
  ...
</Navigation.Root>`}</code></pre>
      <div className="callout">
        지정은 판단과 DOM 스탬프를 바꿔요. 참고 스타일시트의 기본 배치는
        미디어쿼리 CSS가 정하니, 지정을 눈에 보이게 하려면 그 스탬프에 여러분의
        CSS를 걸어 주세요 - JavaScript가 DOM을 다른 구조로 교체하는 게 아니라,
        지정된 결과를 스타일 계층이 표현하는 데이터 계약이에요.
      </div>
      <p>
        프로젝트 전체 Navigation 규칙을 바꾸고 싶다면 인스턴스마다 반복하지 말고{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        변경해요.
      </p>

      <h2>Navigation은 레이아웃과 연결돼요</h2>
      <p>
        Dialog나 Menu는 사용자가 열 때 나타나는 UI예요. Navigation은 보통
        페이지가 처음 나타나는 순간부터 보여야 해요. 그래서 Protean은 Navigation의
        항목 구조를 형태마다 새로 만들지 않고 <strong>같은 마크업을 유지해요.</strong>{' '}
        첫 화면에서 서버와 브라우저의 환경 판단 차이가 어떻게 처리되는지는{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link> 페이지에서
        자세히 설명해요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>Navigation 루트에는 현재 선택된 형태가 표시돼요.</p>
      <pre><code>{`[data-scope="navigation"][data-presentation="sidebar"] {
  /* 프로젝트 sidebar 스타일 */
}`}</code></pre>
      <p>
        Navigation 내부에는 항목 · 링크 · 아이콘 · 드로어 버튼 · 더보기 버튼처럼
        스타일링에 사용할 수 있는 <code>data-part</code>도 붙어 있어요. 구체적인
        selector 사용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>Navigation.Root</h2>
      <p>Navigation 전체의 적응 방식과 bar · drawer 동작을 관리해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>사용할 Navigation 형태를 직접 지정할 때 사용해요. 환경별 지정도 가능해요.</td></tr>
            <tr><td><code>toggleLabel</code></td><td>drawer를 여는 버튼의 이름이에요. 기본값은 <code>Menu</code>예요.</td></tr>
            <tr><td><code>maxBarItems</code></td><td>bar에서 사용할 수 있는 전체 슬롯 수예요. 기본값은 5이고, 더보기 버튼도 한 자리를 차지해요.</td></tr>
            <tr><td><code>overflowLabel</code></td><td>bar의 더보기 버튼 이름이에요. 기본값은 <code>More</code>예요.</td></tr>
            <tr><td><code>aria-label</code></td><td>메뉴 영역의 이름이에요. 화면에 내비게이션이 여러 개면 꼭 붙여 주세요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>일반 <code>&lt;nav&gt;</code> 속성도 그대로 전달돼요.</p>

      <h2>Navigation.Item</h2>
      <p>Navigation의 한 항목이에요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>href</code></td><td>이동할 주소예요. 생략하면 버튼으로 렌더링돼요.</td></tr>
            <tr><td><code>icon</code></td><td>항목의 아이콘이에요. 스크린 리더에는 숨겨져요.</td></tr>
            <tr><td><code>current</code></td><td>현재 페이지인지 표시해요. <code>aria-current=&quot;page&quot;</code>로 연결돼요.</td></tr>
            <tr><td><code>children</code></td><td>화면에 보여줄 이름이에요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>접근성</h2>
      <p>
        Navigation은 실제 <code>&lt;nav&gt;</code> 요소를 사용하고, 현재 항목은{' '}
        <code>aria-current=&quot;page&quot;</code>로 표시해요. drawer와 더보기
        버튼은 열림 상태를 <code>aria-expanded</code>로 전달하고 연결된 목록을{' '}
        <code>aria-controls</code>로 가리켜요. 형태가 drawer나 bar가 아니게
        바뀌면 열려 있던 드로어와 더보기 패널은 자동으로 닫히고, 더보기 패널은
        항목을 눌러 이동할 때도 닫혀요. 제품 전체의 접근성 원칙은{' '}
        <Link href="/ko/guides/accessibility">접근성</Link> 페이지에서 다뤄요.
      </p>

      <h2>정리하면</h2>
      <p>Navigation에서 앱이 관리하는 건 탐색 정보예요.</p>
      <pre><code>{`홈
검색
알림
설정`}</code></pre>
      <p>Protean은 이 정보를 현재 환경에 맞는 형태로 보여줘요.</p>
      <pre><code>{`작은 화면 + 터치  → bar
작은 화면 + 마우스 → drawer
중간 화면        → rail
넓은 화면        → sidebar`}</code></pre>
      <p>
        앱에서 환경별 Navigation을 따로 만들 필요가 없어요.{' '}
        <strong>같은 Navigation 항목을 유지하고, 어떤 형태로 보여줄지만
        바뀌어요.</strong> 다음은{' '}
        <Link href="/ko/components/list-detail">ListDetail</Link>이에요.
      </p>
    </div>
  )
}
