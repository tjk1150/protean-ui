import Link from 'next/link'

export default function ScreenKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Screen</h1>
      <p className="lede">
        화면의 뼈대예요. 내비게이션 · 본문 · 주 행동 버튼이 들어갈 자리를 이름으로
        선언하면, 환경에 맞는 배치는 CSS가 정해요. 자체 JavaScript가 없어서 서버
        컴포넌트 안에서도 그대로 써요.
      </p>

      <div className="callout">
        이 컴포넌트는 <strong>CSS 중심 레이아웃 도우미</strong>예요. 상황 판단 없이
        구조와 마크업을 제공하고, 반응은 참고 스타일시트(또는 여러분의 CSS)가 맡아요.
        기본 모습은 <code>protean-defaults</code> 클래스를 붙인 요소 안에서 적용돼요.
      </div>

      <pre><code>{`<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="주 메뉴">...</Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>...</Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root>구매하기</PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>

      <h2>환경마다 이렇게 배치돼요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>배치</th></tr></thead>
          <tbody>
            <tr><td>작은 화면 + 터치</td><td>앱처럼 동작해요. 본문만 스크롤되고, 버튼과 탭 바는 아래에 고정돼요. 버튼이 탭 바 위에 자동으로 쌓여요.</td></tr>
            <tr><td>작은 화면 + 마우스</td><td>위에 메뉴 줄, 가운데 본문, 아래에 버튼 줄이에요.</td></tr>
            <tr><td>중간 · 넓은 화면</td><td>옆에 내비게이션, 본문은 문서처럼 통으로 스크롤되고, 버튼은 본문 끝 제자리에 놓여요.</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        <strong>고정 배치 없이 쌓이는 이유:</strong> 아래에 붙는 버튼과 탭 바가 둘 다{' '}
        <code>position: fixed</code>가 아니라 화면 뼈대의 격자 행이에요. 그래서 쌓이는
        순서, 안전 영역(홈 인디케이터) 처리 같은 걸 따로 조율하는 코드가 필요 없어요.
      </div>
      <p>
        <Link href="/screen-demo">화면 데모</Link>에서 세 배치를 직접 오가 보세요. 지금
        보고 있는 이 문서 사이트의 뼈대도 Screen이에요.
      </p>

      <h2>조각들</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>조각</th><th>그리는 것</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Screen.Root</td><td>div[data-scope=&quot;screen&quot;]</td><td>뼈대의 루트예요. 클래스를 붙이고 CSS 격자로 배치를 정의하세요.</td></tr>
            <tr><td>Screen.Navigation</td><td>div[data-part=&quot;navigation&quot;]</td><td>내비게이션 자리예요.</td></tr>
            <tr><td>Screen.Content</td><td>main[data-part=&quot;content&quot;]</td><td>본문 자리예요. 본문이 이미 main을 갖고 있다면 <code>as=&quot;div&quot;</code>로 바꿔서 landmark가 겹치지 않게 하세요.</td></tr>
            <tr><td>Screen.Actions</td><td>div[data-part=&quot;actions&quot;]</td><td>주 행동 버튼 자리예요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>실전에서는 이렇게 쓰였어요</h2>
      <p>
        화면 24개짜리 모바일 전용 앱을 감싸는 데 약 50줄짜리 컴포넌트 하나면 충분했어요.
        Screen.Root에 내비게이션을 얹고 기존 앱을 본문으로 넣었더니, 데스크톱에서는
        사이드바가 생기고 모바일은 원본 그대로 유지됐어요.
      </p>
    </div>
  )
}
