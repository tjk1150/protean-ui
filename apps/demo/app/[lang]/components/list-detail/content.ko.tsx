import Link from 'next/link'

export default function ListDetailKo() {
  return (
    <div className="doc" lang="ko">
      <h1>ListDetail</h1>
      <p className="lede">
        목록에서 항목 하나를 선택하면 상세 내용을 보여주는 화면에 사용해요. 메일
        목록과 메일 내용, 주문 목록과 주문 상세, 사용자 목록과 사용자 정보 같은
        화면이에요.
      </p>
      <p>
        넓은 화면에서는 목록과 상세를 나란히 보여주는 게 자연스러워요. 하지만 좁은
        화면에서는 두 영역을 억지로 붙여 놓기보다{' '}
        <strong>목록과 상세를 한 화면씩 보여주는 편</strong>이 더 편해요.
        Protean에서는 같은 <code>ListDetail</code> 구조를 두 방식으로 사용할 수
        있어요.
      </p>

      <div className="callout">
        <Link href="/list-detail-demo">리스트-디테일 데모</Link>에서 항목을 하나
        고른 채 창 폭을 바꿔 보세요. 같은 선택이 넓은 화면에서는 패널로, 좁은
        화면에서는 한 화면씩으로 나타나요.
      </div>

      <h2>기본 사용법</h2>
      <p>어떤 항목이 선택됐는지는 평소처럼 앱 상태로 관리해요.</p>
      <pre><code>{`const [selectedId, setSelectedId] = useState<string | null>(null);

<ListDetail.Root
  aria-label="주문"
  detailActive={selectedId !== null}
  onBack={() => setSelectedId(null)}
>
  <ListDetail.List>
    <button onClick={() => setSelectedId("order-123")}>
      주문 #123
    </button>
    <button onClick={() => setSelectedId("order-456")}>
      주문 #456
    </button>
  </ListDetail.List>
  <ListDetail.Detail>
    <ListDetail.Back>목록으로</ListDetail.Back>
    {selectedId && <OrderDetail id={selectedId} />}
  </ListDetail.Detail>
</ListDetail.Root>`}</code></pre>
      <p>핵심은 역할이 나뉜다는 점이에요.</p>
      <pre><code>{`앱
→ 어떤 항목이 선택됐는지 관리

Protean
→ 현재 공간에서 목록과 상세를 어떻게 배치할지 선택`}</code></pre>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>기본 규칙은 단순해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용할 수 있는 공간</th><th>형태</th><th>보여주는 방식</th></tr>
          </thead>
          <tbody>
            <tr><td>작은 화면</td><td><code>stack</code></td><td>목록 또는 상세를 한 화면씩 보여줘요</td></tr>
            <tr><td>중간 화면</td><td><code>panes</code></td><td>목록과 상세를 나란히 보여줘요</td></tr>
            <tr><td>넓은 화면</td><td><code>panes</code></td><td>목록과 상세를 나란히 보여줘요</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        이 컴포넌트의 기본 판단에서는 입력 방식보다{' '}
        <strong>사용할 수 있는 공간</strong>이 중요해요. 작은 화면이라면 마우스를
        사용하든 터치하든 <code>stack</code>을 사용하고, 공간이 충분하면{' '}
        <code>panes</code>를 사용해요. Protean의 모든 컴포넌트가 반드시 똑같은
        환경 정보를 사용하는 건 아니에요. 각 UI에서 실제로 필요한 정보만 판단에
        사용해요.
      </p>

      <h3>stack에서는 한 화면씩 보여줘요</h3>
      <p>작은 화면에서는 목록과 상세를 동시에 좁게 보여주지 않아요. 처음에는 목록이 보여요.</p>
      <pre><code>{`┌─────────────────┐
│ 주문 목록       │
│                 │
│ 주문 #123       │
│ 주문 #456       │
│ 주문 #789       │
└─────────────────┘`}</code></pre>
      <p>사용자가 항목을 선택하면 상세 화면으로 전환돼요.</p>
      <pre><code>{`┌─────────────────┐
│ ← 목록으로      │
│                 │
│ 주문 #123       │
│ 배송 상태       │
│ 결제 정보       │
└─────────────────┘`}</code></pre>
      <p>
        이 형태를 <code>stack</code>이라고 해요. 현재 상세 화면을 보여줄지는{' '}
        <code>detailActive</code>로 알려줘요. Protean이 어떤 항목을 선택했는지
        추측하지 않아요. 선택 상태는 앱의 상태나 라우터와 연결하면 돼요.
      </p>

      <h3>panes에서는 둘 다 보여줘요</h3>
      <p>공간이 충분하면 목록과 상세를 나란히 보여줘요.</p>
      <pre><code>{`┌──────────────┬──────────────────────┐
│ 주문 목록    │ 주문 #123            │
│              │                      │
│ #123         │ 배송 상태            │
│ #456         │ 결제 정보            │
│ #789         │ 주문 상품            │
└──────────────┴──────────────────────┘`}</code></pre>
      <p>
        이 형태를 <code>panes</code>라고 해요. 같은 선택 상태를 그대로 사용하기
        때문에 화면이 넓어졌다고 별도의 상세 페이지 상태를 새로 만들 필요가
        없어요.
      </p>

      <h2>두 화면을 따로 만드는 건 아니에요</h2>
      <p>
        <code>stack</code>과 <code>panes</code>는 서로 다른 React 앱 구조가
        아니에요. 항상 같은 구조를 유지해요.
      </p>
      <pre><code>{`<ListDetail.Root>
  <ListDetail.List>...</ListDetail.List>
  <ListDetail.Detail>...</ListDetail.Detail>
</ListDetail.Root>`}</code></pre>
      <p>현재 선택된 형태와 상세 활성 여부가 Root에 표시돼요.</p>
      <pre><code>{`<div
  data-scope="list-detail"
  data-presentation="panes"
  data-detail-active
>`}</code></pre>
      <p>스타일 계층이 이 상태를 보고 실제 배치를 표현해요. 즉:</p>
      <pre><code>{`Protean
→ stack / panes 결정

앱
→ detailActive 결정

CSS
→ 실제 화면 배치`}</code></pre>
      <p>로 책임이 나뉘어요.</p>

      <h2>왜 detailActive는 앱이 정하나요?</h2>
      <p>
        Protean이 화면 배치를 결정한다고 해서{' '}
        <strong>어떤 데이터를 보고 있는지까지 관리하면 안 돼요.</strong> 예를 들어
        사용자가 <code>/orders/123</code>에 들어와 있다면 어떤 주문이 선택됐는지는
        라우터가 이미 알고 있어요.
      </p>
      <pre><code>{`<ListDetail.Root detailActive={Boolean(orderId)}>`}</code></pre>
      <p>
        처럼 연결할 수 있어요. 로컬 상태를 사용하는 화면이라면{' '}
        <code>detailActive=&#123;selectedItem !== null&#125;</code>로 연결하면
        돼요. 이렇게 앱이 상태를 소유하면 URL, 뒤로 가기, 서버 렌더링 같은 기존 앱
        구조와도 자연스럽게 연결할 수 있어요.
      </p>

      <h2>목록으로 돌아가기</h2>
      <p>
        <code>stack</code>에서는 상세가 목록을 대신해서 보이기 때문에 돌아갈
        방법이 필요해요.
      </p>
      <pre><code>{`<ListDetail.Back>목록으로</ListDetail.Back>`}</code></pre>
      <p>
        <code>ListDetail.Back</code>을 누르면 <code>ListDetail.Root</code>의{' '}
        <code>onBack</code>이 호출돼요. <code>panes</code>에서는 목록이 계속
        보이기 때문에 참고 스타일에서는 이 버튼이 표시되지 않아요. 즉 같은{' '}
        <code>Back</code> 요소를 작성해 둬도 현재 형태에 맞춰 스타일 계층이
        표현해요 - React에서 조건부로 렌더링할 필요가 없어요.
      </p>

      <h2>상세로 이동하면 포커스도 따라가요</h2>
      <p>
        작은 화면의 <code>stack</code>에서 상세가 활성화되면 단순히 화면만 바뀌는
        게 아니에요. Protean은 상세 영역으로 포커스를 이동해 키보드와 스크린 리더
        사용자가 <strong>화면이 바뀌었다는 사실을 자연스럽게 이어서 인식할 수
        있도록</strong> 해요. <code>panes</code>에서는 목록과 상세가 동시에
        보이므로 사용자가 두었던 포커스를 그대로 유지해요. 앱에서 화면 크기별
        구현을 두 벌 만들면서 이 동작을 다시 연결할 필요가 없어요.
      </p>

      <h2>이 ListDetail만 형태를 바꾸고 싶다면</h2>
      <p>
        <code>presentation</code>으로 형태를 직접 지정할 수 있어요. 사용 가능한
        값은 <code>stack</code>과 <code>panes</code>예요.
      </p>
      <pre><code>{`<ListDetail.Root presentation="panes">
  ...
</ListDetail.Root>`}</code></pre>
      <div className="callout">
        지정은 판단 결과와 DOM에 표시되는 <code>data-presentation</code>을 바꿔요.
        실제 배치는 스타일 계층이 그 결과를 표현해요 - JavaScript가{' '}
        <code>stack</code>용 DOM과 <code>panes</code>용 DOM을 서로 교체하는
        구조가 아니에요.
      </div>
      <p>
        프로젝트 전체 기본 규칙을 바꾸고 싶다면{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        변경해요.
      </p>

      <h2>서버 렌더링과도 잘 맞아요</h2>
      <p>
        <code>detailActive</code>는 앱이 직접 전달하기 때문에 서버에서도 현재
        상세가 활성화되어 있는지 알 수 있어요. 또 <code>stack</code>과{' '}
        <code>panes</code>가 같은 DOM 구조를 사용하기 때문에 서버가 별도의
        모바일 · 데스크톱 트리 중 하나를 추측해서 렌더링할 필요가 없어요.
        구체적인 첫 배치와 CSS 전략은{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link> 페이지에서
        설명해요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>Root에는 현재 상태가, 각 영역에는 이름이 붙어요.</p>
      <pre><code>{`<div data-part="list">
<div data-part="detail">
<button data-part="back">`}</code></pre>
      <p>그래서 프로젝트 CSS에서 필요한 부분만 선택할 수 있어요.</p>
      <pre><code>{`[data-scope="list-detail"][data-presentation="panes"] {
  /* 프로젝트의 2-pane 배치 */
}`}</code></pre>
      <div className="callout">
        한 가지 주의: 여러분의 CSS가 항상 이기는 구조라서,{' '}
        <code>[data-part=&quot;list&quot;]</code>에 직접 <code>display</code>를
        걸면 <code>stack</code>의 숨김과 충돌해요. 배치 스타일은 안쪽 래퍼에
        주거나, 보이는 상태로 스코프해 주세요.
      </div>
      <p>
        구체적인 <code>data-scope</code> / <code>data-part</code> 스타일링 방법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서 한
        번에 설명해요.
      </p>

      <h2>ListDetail.Root</h2>
      <p>목록-상세 화면 전체를 관리해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td><code>stack</code> 또는 <code>panes</code>를 직접 지정할 때 사용해요. 환경별 지정도 가능해요.</td></tr>
            <tr><td><code>detailActive</code></td><td>현재 상세 화면이 활성화됐는지 알려줘요. 지정하지 않으면 목록 상태예요.</td></tr>
            <tr><td><code>onBack</code></td><td><code>ListDetail.Back</code>으로 목록에 돌아갈 때 호출돼요.</td></tr>
            <tr><td><code>children</code></td><td>목록과 상세 영역이에요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>일반 <code>&lt;div&gt;</code> 속성도 그대로 전달돼요.</p>

      <h2>ListDetail.List / ListDetail.Detail</h2>
      <p>
        목록 영역과 상세 영역이에요. 목록의 선택 상태나 데이터 불러오기는 앱이
        관리해요 - Protean은 목록 데이터 관리 기능을 제공하지 않아요. 상세 영역은{' '}
        <code>stack</code>에서 새로 활성화될 때 포커스를 받을 수 있는 구조예요
        (<code>tabIndex=-1</code>). 두 영역 모두 일반 <code>&lt;div&gt;</code>{' '}
        속성을 그대로 받아요.
      </p>

      <h2>ListDetail.Back</h2>
      <p><code>stack</code>의 상세 화면에서 목록으로 돌아가기 위한 버튼이에요.</p>
      <pre><code>{`<ListDetail.Back>목록으로</ListDetail.Back>`}</code></pre>
      <p>
        누르면 먼저 버튼 자신의 <code>onClick</code>이 실행되고, 이벤트가
        취소되지 않았다면 Root의 <code>onBack</code>이 이어서 호출돼요. 일반 버튼
        속성도 사용할 수 있어요.
      </p>

      <h2>정리하면</h2>
      <p>ListDetail은 목록 → 항목 선택 → 상세 화면을 공간에 맞게 보여줘요.</p>
      <pre><code>{`작은 화면
목록 → 상세 (stack)

공간이 충분하면
목록 | 상세 (panes)`}</code></pre>
      <p>하지만 데이터와 선택 상태는 하나예요.</p>
      <pre><code>{`앱      → 어떤 항목이 선택됐는지
Protean → stack인지 panes인지
CSS     → 실제 배치`}</code></pre>
      <p>
        그래서 작은 화면용 목록 화면과 데스크톱용 2-pane 화면을 별도의 컴포넌트
        트리로 유지할 필요가 없어요. 다음은{' '}
        <Link href="/ko/components/primary-action">PrimaryAction</Link>이에요.
      </p>
    </div>
  )
}
