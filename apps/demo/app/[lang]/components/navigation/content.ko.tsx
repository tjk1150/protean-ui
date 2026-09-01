import Link from 'next/link'

export default function NavigationKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Navigation</h1>
      <p className="lede">
        메뉴 목록 하나를 선언하면, 환경에 따라 하단 탭 바 · 서랍(드로어) · 레일 ·
        사이드바로 모습이 바뀌어요. DOM은 <code>nav &gt; ul</code> 하나 그대로이고,
        바뀌는 건 CSS뿐이에요.
      </p>

      <div className="callout">
        지금 보고 있는 이 문서의 왼쪽 메뉴가 바로 이 컴포넌트예요. 창을 좁혀 보세요.
        사이드바가 &quot;메뉴&quot; 버튼 뒤의 서랍으로 바뀌어요. 네 가지 모습을 전부
        보려면 <Link href="/navigation-spike">내비게이션 데모</Link>로 가세요.
      </div>

      <pre><code>{`<Navigation.Root aria-label="주 메뉴">
  <Navigation.Item href="/" current icon={<HomeIcon />}>홈</Navigation.Item>
  <Navigation.Item href="/orders" icon={<BoxIcon />}>주문</Navigation.Item>
</Navigation.Root>`}</code></pre>

      <h2>환경마다 이렇게 보여요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>작은 화면 + 터치</td><td>하단 탭 바. 라벨을 항상 보여주고, 홈 인디케이터 영역을 피해요.</td></tr>
            <tr><td>작은 화면 + 마우스</td><td>상단 줄 + 서랍. 좁게 줄인 데스크톱 창은 폰이 아니니까요.</td></tr>
            <tr><td>중간 화면</td><td>세로로 긴 레일이에요.</td></tr>
            <tr><td>넓은 화면</td><td>사이드바예요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        네 모습이 전부 같은 HTML이라는 점이 핵심이에요. 서버가 무엇을 보내든 틀릴 수
        없고, 화면이 밀리지 않고, JavaScript 없이도 동작해요. 자세한 이유는{' '}
        <Link href="/ko/concepts/ssr">서버 렌더링</Link> 문서에 있어요.
      </p>

      <h2>Navigation.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>presentation</td><td>모습 이름 | &#123; 화면등급: 모습 &#125;</td><td>bar · drawer · rail · sidebar 중에서 직접 지정할 수 있어요. 이 문서 사이트는 compact는 drawer, 그 위는 sidebar로 지정했어요.</td></tr>
            <tr><td>toggleLabel</td><td>string</td><td>서랍을 여는 버튼의 라벨이에요.</td></tr>
            <tr><td>aria-label</td><td>string</td><td>메뉴 영역의 이름이에요. 화면에 내비게이션이 여러 개면 꼭 붙여 주세요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Navigation.Item</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>href</td><td>string (선택)</td><td>있으면 링크로, 없으면 버튼으로 그려요. 주소 대신 상태로 화면을 바꾸는 앱은 버튼 모드에 onClick을 쓰면 돼요.</td></tr>
            <tr><td>current</td><td>boolean</td><td>현재 위치 표시예요. 어떤 모습에서든 aria-current=&quot;page&quot;로 똑같이 전달돼요.</td></tr>
            <tr><td>icon</td><td>ReactNode</td><td>라벨 앞의 아이콘이에요. 스크린 리더에는 숨겨져요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>스타일은 어떻게 입히나요?</h2>
      <p>
        Protean은 모양을 강요하지 않아요. 루트에는 <code>data-scope</code>, 각 조각에는{' '}
        <code>data-part</code>(list · item · link · icon · label · drawer-toggle)가
        붙으니, 그 선택자로 원하는 CSS를 쓰면 돼요. 참고용 스타일시트가 데모에 포함돼
        있어요.
      </p>
    </div>
  )
}
