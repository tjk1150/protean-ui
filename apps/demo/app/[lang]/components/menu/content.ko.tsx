import { MenuDemo } from './menu-demo'

export default function MenuKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Menu</h1>
      <p className="lede">
        액션 목록이에요. 마우스 환경에서는 버튼에 붙는 드롭다운 메뉴로, 작은 터치
        화면에서는 <strong>액션 시트</strong>(iOS의 그것)로 열려요. Select와 같은
        &quot;맥락 오버레이&quot; 판단을 그대로 타서, 새 규칙이 하나도 늘지 않았어요.
      </p>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 창 크기를 바꾸고 다시 열어 보세요</span>
        <MenuDemo trigger="더보기" share="공유" duplicate="복제" remove="삭제" onPick="선택함" />
      </div>

      <pre><code>{`<Menu.Root>
  <Menu.Trigger>더보기</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={share}>공유</Menu.Item>
    <Menu.Item onSelect={duplicate}>복제</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive onSelect={remove}>삭제</Menu.Item>
  </Menu.Content>
</Menu.Root>`}</code></pre>

      <h2>환경마다 이렇게 열려요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>마우스 (화면 크기 무관)</td><td>버튼에 붙는 드롭다운 메뉴예요. 키보드 화살표로 오갈 수 있어요.</td></tr>
            <tr><td>작은 화면 + 터치</td><td>화면 폭을 채우는 액션 시트예요. 항목이 44px 이상이라 누르기 편하고, 뒤에는 스크림이 깔려요.</td></tr>
            <tr><td>ProteanBoundary 안</td><td>액션 시트가 패널 바닥에서 올라와요. 드롭다운은 잘림 방지를 위해 문서 레벨에 남아요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Root: presentation</td><td>모습 지정</td><td>이 메뉴만 다르게 열고 싶을 때 지정해요.</td></tr>
            <tr><td>Item: onSelect</td><td>() =&gt; void</td><td>항목을 고르면 실행되고, 메뉴는 닫혀요.</td></tr>
            <tr><td>Item: destructive</td><td>boolean</td><td>삭제 같은 파괴적 액션 표시예요. <code>data-variant=&quot;danger&quot;</code>로 찍혀서 참고 스타일시트가 붉게 칠해요.</td></tr>
            <tr><td>Item: disabled</td><td>boolean</td><td>비활성이에요. 스크린 리더에도 그대로 전달돼요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        키보드 조작과 <code>role=&quot;menu&quot;</code> 시맨틱은 어떤 모습에서든 Base
        UI의 Menu가 처리해요. 선택이 아니라 <strong>행동</strong>이 필요할 때 쓰고,
        값을 고르는 자리라면 Select를 쓰세요.
      </p>
    </div>
  )
}
