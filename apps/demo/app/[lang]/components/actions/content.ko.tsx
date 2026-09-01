import { ActionsDemo } from './actions-demo'

export default function ActionsKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Actions</h1>
      <p className="lede">
        액션 버튼들의 줄이에요. 자리가 있으면 전부 나란히 놓이고, 작은 화면에서는{' '}
        <code>secondary</code>로 표시한 것들이 &quot;더보기&quot; 뒤로 접혔다가, 누르면
        그 자리에서 펼쳐져요. 문서 편집기 상단 바, 카드의 도구 줄 같은 곳에 써요.
      </p>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 창을 600px보다 좁혀 보세요</span>
        <ActionsDemo
          labels={{ save: '저장', share: '공유', rename: '이름 변경', remove: '삭제' }}
          moreLabel="더보기"
          onPick="선택함"
        />
      </div>

      <pre><code>{`<Actions.Root aria-label="문서 도구" moreLabel="더보기">
  <Actions.Item onClick={save}>저장</Actions.Item>
  <Actions.Item onClick={share}>공유</Actions.Item>
  <Actions.Item secondary onClick={rename}>이름 변경</Actions.Item>
  <Actions.Item secondary destructive onClick={remove}>삭제</Actions.Item>
</Actions.Root>`}</code></pre>

      <h2>환경마다 이렇게 보여요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>중간 · 넓은 화면</td><td>전부 한 줄로 나란해요. 더보기 버튼은 숨겨져요.</td></tr>
            <tr><td>작은 화면</td><td>secondary 항목이 더보기 뒤로 접혀요. 누르면 그 자리에서 전폭 행으로 펼쳐지고, 하나를 실행하면 다시 접혀요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>어떤 게 접힐지는 여러분이 정해요</h2>
      <p>
        &quot;무엇이 부차적인가&quot;는 환경이 아니라 <strong>의미</strong>의 문제라서,
        런타임이 추측하지 않고 여러분이 <code>secondary</code>로 표시해요. 표시는
        환경과 무관해서 서버와 클라이언트의 마크업이 언제나 같고, 접힘 여부는 참고
        스타일시트의 CSS가 정해요 - Navigation의 &quot;더보기&quot;와 같은 원리예요.
        패널 안에서 컨테이너 폭 기준으로 접고 싶으면, 같은 data 속성에 CSS 컨테이너
        쿼리를 쓰면 돼요.
      </p>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Root: moreLabel</td><td>string (기본 &quot;More&quot;)</td><td>더보기 버튼의 라벨이에요.</td></tr>
            <tr><td>Item: secondary</td><td>boolean</td><td>자리가 좁으면 접혀도 되는 액션 표시예요.</td></tr>
            <tr><td>Item: destructive</td><td>boolean</td><td>파괴적 액션 표시예요. <code>data-variant=&quot;danger&quot;</code>로 찍혀요.</td></tr>
            <tr><td>Item: icon · onClick · disabled ...</td><td></td><td>버튼 속성이 그대로 통과해요.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
