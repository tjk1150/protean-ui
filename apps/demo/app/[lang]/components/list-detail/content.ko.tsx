import Link from 'next/link'

export default function ListDetailKo() {
  return (
    <div className="doc" lang="ko">
      <h1>ListDetail</h1>
      <p className="lede">
        마스터-디테일 화면이에요. 넓은 화면에서는 목록과 상세가 <strong>두 패널로
        나란히</strong>, 폰에서는 <strong>한 번에 한 화면씩</strong> 보여요. 메일함,
        채팅, 설정처럼 &quot;목록에서 골라 상세를 보는&quot; 모든 화면의 뼈대예요.
      </p>

      <div className="callout">
        <Link href="/list-detail-demo">리스트-디테일 데모</Link>에서 메시지를 하나
        고른 채 창 폭을 600px 기준으로 오가 보세요. 같은 선택이 한쪽에서는 패널로,
        다른 쪽에서는 화면으로 나타나요.
      </div>

      <pre><code>{`const [selected, setSelected] = useState<string | null>(null)

<ListDetail.Root
  aria-label="받은 편지함"
  detailActive={selected !== null}
  onBack={() => setSelected(null)}
>
  <ListDetail.List>{/* 목록 - 항목 클릭 시 setSelected */}</ListDetail.List>
  <ListDetail.Detail>
    <ListDetail.Back>뒤로</ListDetail.Back>
    {/* 선택된 항목의 상세 */}
  </ListDetail.Detail>
</ListDetail.Root>`}</code></pre>

      <h2>환경마다 이렇게 배치돼요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>배치</th></tr></thead>
          <tbody>
            <tr><td>중간 · 넓은 화면</td><td>두 패널이 나란해요(목록 240~320px + 상세). 뒤로 버튼은 숨겨져요 - 필요가 없으니까요.</td></tr>
            <tr><td>작은 화면</td><td>스택이에요. 선택 전에는 목록만, 선택하면 상세만 보이고 뒤로 버튼이 나타나요. 상세로 넘어가면 포커스도 함께 이동해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>라우터에 묶이지 않아요</h2>
      <p>
        어떤 항목이 선택됐는지는 <strong>여러분의 상태</strong>예요.{' '}
        <code>detailActive</code>에 상태를(또는 라우트 유무를) 넣고,{' '}
        <code>onBack</code>에서 해제하면 끝이에요. URL로 상세를 표현하고 싶으면
        라우트 세그먼트와 연결하면 되고, 그러면 서버도 첫 화면을 정확히 알아요. 두
        패널이 항상 같은 DOM에 있고 무엇을 보일지는 CSS가 정하니까, hydration이
        어긋날 것도 화면이 밀릴 것도 없어요. 한 가지 주의: 여러분의 CSS가 항상
        이기는 구조라서, <code>[data-part=&quot;list&quot;]</code>에 직접{' '}
        <code>display</code>를 걸면 스택의 숨김과 충돌해요. 배치 스타일은 안쪽
        래퍼에 주거나, 보이는 상태로 스코프해 주세요.
      </p>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Root: detailActive</td><td>boolean</td><td>상세가 활성인지예요. 스택에서는 어느 화면을 보일지를 정해요.</td></tr>
            <tr><td>Root: onBack</td><td>() =&gt; void</td><td>뒤로 버튼이 눌리면 호출돼요. 보통 선택 해제예요.</td></tr>
            <tr><td>Root: presentation</td><td>&quot;stack&quot; | &quot;panes&quot; | &#123; 화면등급: 모습 &#125;</td><td>이 화면만 다르게 배치하고 싶을 때 지정해요.</td></tr>
            <tr><td>List · Detail · Back</td><td></td><td>구조 조각이에요. div/button 속성이 그대로 통과해요. Detail은 스택 전환 시 포커스를 받도록 tabIndex=-1이에요.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
