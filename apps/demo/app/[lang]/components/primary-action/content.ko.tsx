import Link from 'next/link'

export default function PrimaryActionKo() {
  return (
    <div className="doc" lang="ko">
      <h1>PrimaryAction</h1>
      <p className="lede">
        화면의 주 행동 버튼이에요. &quot;구매하기&quot;, &quot;다음&quot; 같은 것들이요.
        폰에서는 화면 아래에 고정된 큰 버튼으로, 데스크톱에서는 본문 흐름 속 제자리에
        놓여요.
      </p>

      <pre><code>{`<Screen.Actions>
  <PrimaryAction.Root onClick={buy}>구매하기</PrimaryAction.Root>
</Screen.Actions>`}</code></pre>

      <h2>환경마다 이렇게 보여요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>작은 화면 + 터치</td><td>화면 폭을 채우는 하단 고정 바예요. 홈 인디케이터를 피하고, 화면 키보드가 올라오면 그만큼 위로 밀려서 항상 누를 수 있어요.</td></tr>
            <tr><td>작은 화면 + 마우스</td><td>본문 컬럼 아래에 붙는 버튼 줄이에요.</td></tr>
            <tr><td>중간 · 넓은 화면</td><td>본문 흐름 속 제자리예요. 하단 고정 버튼은 터치 관습이지 데스크톱 관습이 아니거든요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>presentation</td><td>모습 이름 | &#123; 화면등급: 모습 &#125;</td><td>action-bar · sticky-footer · inline 중에서 직접 지정할 수 있어요.</td></tr>
            <tr><td>버튼 속성 전부</td><td>type, disabled, onClick, form ...</td><td>안쪽은 진짜 button 요소예요. 폼 제출 연결, 로딩 · 비활성 상태가 그대로 통과해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>화면 키보드를 피하는 방법</h2>
      <p>
        입력 중에 키보드가 버튼을 가리면 곤란하죠. PrimaryAction은 브라우저의{' '}
        <code>visualViewport</code>로 키보드가 가린 높이를 재서{' '}
        <code>--protean-vk-offset</code>이라는 CSS 변수로 내보내요. 참고 스타일시트가 그
        값만큼 버튼을 위로 올려요. 이 기능이 없는 브라우저에서는 그냥 바닥에 붙어 있어요.
      </p>

      <p>
        <Link href="/screen-demo">화면 데모</Link>를 폰에서 열고, 프로모 코드 입력칸에
        포커스해 보세요. 키보드가 올라와도 버튼이 계속 보여요.
      </p>
    </div>
  )
}
