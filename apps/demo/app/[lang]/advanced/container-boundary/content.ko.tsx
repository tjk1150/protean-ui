import Link from 'next/link'

export default function BoundaryKo() {
  return (
    <div className="doc" lang="ko">
      <h1>화면 전체가 아니라 컨테이너 크기에 맞추기</h1>
      <p className="lede">
        대시보드나 편집기처럼 한 화면 안에 여러 영역이 있는 앱에서는, 브라우저
        전체는 충분히 넓어도 실제 컴포넌트가 들어가는 패널은 좁을 수 있어요. 패널
        안의 UI가 브라우저 전체 폭만 보고 판단하면 실제 사용할 수 있는 공간과
        결과가 어긋날 수 있어요. 이런 경우 <code>ProteanBoundary</code>를 사용할
        수 있어요.
      </p>
      <pre><code>{`┌─────────────────────────────────────────┐
│                브라우저                  │
│  ┌──────────────┐  ┌─────────────────┐  │
│  │ 좁은 패널    │  │                 │  │
│  │              │  │    넓은 본문    │  │
│  │  Select      │  │                 │  │
│  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘`}</code></pre>

      <h2>기본 사용법</h2>
      <p>컨테이너 기준으로 판단하고 싶은 영역을 감싸면 돼요.</p>
      <pre><code>{`<ProteanBoundary className="side-panel">
  <Select.Root value={value} onValueChange={setValue} items={cycles}>
    <Select.Trigger />
    <Select.Content>
      <Select.Item value="daily">매일</Select.Item>
      <Select.Item value="weekly">매주</Select.Item>
    </Select.Content>
  </Select.Root>
</ProteanBoundary>`}</code></pre>
      <p>
        Boundary 자체는 실제 <code>&lt;div data-scope=&quot;boundary&quot;&gt;</code>{' '}
        하나를 만들어요. Overlay가 열릴 때 이 요소의 실제 폭을 읽고{' '}
        <code>compact</code> · <code>medium</code> · <code>expanded</code> 중
        어떤 크기인지 판단해요.
      </p>
      <div className="callout">
        <Link href="/boundary-demo">컨테이너 경계 데모</Link>에서 직접 확인해
        보세요. 같은 다이얼로그가 페이지에서는 모달로, 420px 패널 안에서는
        compact 판정을 받아요 - 어떤 모습이 되는지는 여전히 규칙이 정해요(기본
        규칙에서 마우스 환경의 입력 폼은 compact여도 모달이고, 데모의 시트는
        규칙을 그렇게 정했기 때문이에요).
      </div>

      <h2>바뀌는 건 size뿐이에요</h2>
      <p>
        브라우저 폭 900px, 패널 폭 420px, 터치 입력인 환경을 생각해 볼게요.
        Boundary가 없다면 Overlay는 브라우저 전체 폭을 기준으로{' '}
        <code>size=expanded</code>로 봐요. 같은 Select를 420px 패널의 Boundary로
        감싸면 열 때 size만 다시 계산해요.
      </p>
      <pre><code>{`size             expanded → compact   ← Boundary 기준
input            touch                ← 그대로
hover            false                ← 그대로
reducedMotion    false                ← 그대로
virtualKeyboard  false                ← 그대로`}</code></pre>
      <p>
        그래서 이 환경에서는 기본 Select 규칙(compact + touch)에 따라 시트가 될
        수 있어요. 중요한 점은{' '}
        <strong>전체 환경을 Boundary 기준으로 다시 만드는 게 아니라는 것</strong>
        이에요. Boundary는 &quot;이 컨테이너가 터치 기기인가요?&quot;를 판단하지
        않아요 - 컨테이너에는 입력 장치가 따로 존재하지 않으니까요.
      </p>
      <pre><code>{`Viewport  → input · hover · reducedMotion · virtualKeyboard
Boundary  → size만 교체`}</code></pre>
      <p>
        <strong>Boundary가 바꾸는 건 기기 환경 전체가 아니라 size 하나예요.</strong>{' '}
        그래서 기본 규칙에서 compact + touch가 필요한 결과라면, 좁은 Boundary만으로는
        부족하고 실제 입력 환경도 그 조건에 맞아야 해요.
      </p>

      <h2>어떤 컴포넌트가 Boundary를 사용하나요?</h2>
      <p>
        열리는 순간 환경을 읽는 Overlay 계열 - <code>Dialog</code> ·{' '}
        <code>Select</code> · <code>Menu</code> - 가 Boundary의 size를 사용해요.
        이 컴포넌트들은 열 때 traits를 읽고, Boundary 안에 있다면 해당 컨테이너의
        폭으로 <code>size</code>를 다시 계산해요.
      </p>
      <p>
        반면 <code>Navigation</code> · <code>PrimaryAction</code> ·{' '}
        <code>ListDetail</code> · <code>Tooltip</code>과 CSS 중심 레이아웃
        컴포넌트들은 Boundary size를 읽지 않아요. 특히 Navigation과 PrimaryAction
        같은 페이지 chrome은 기본적으로 viewport 중심 UI예요.{' '}
        <code>&lt;ProteanBoundary&gt;</code>로 감싼다고 Navigation의 판단이
        Boundary 폭 기준으로 바뀌지 않아요.
      </p>

      <h2>컨테이너 레이아웃은 CSS container query로</h2>
      <p>
        Dialog나 Select는 사용자가 여는 순간 사용할 공간을 확인하고 형태를 선택할
        수 있지만, Navigation은 페이지가 처음 보일 때부터 이미 화면 구조의
        일부예요. 이런 UI를 컨테이너 안에서 다르게 배치하고 싶다면 CSS container
        query가 더 자연스러워요.
      </p>
      <pre><code>{`.dashboard-card {
  container-type: inline-size;
}

@container (width < 480px) {
  .dashboard-actions {
    /* 좁은 카드에서의 배치 */
  }
}`}</code></pre>
      <pre><code>{`Overlay를 열 때 컨테이너 폭이 판단에 필요해요
→ ProteanBoundary

컨테이너 폭에 따라 레이아웃이나 스타일만 바꾸고 싶어요
→ CSS container query`}</code></pre>
      <p>
        둘 중 하나만 사용해야 하는 건 아니고, 같은 컨테이너에서 함께 사용할 수도
        있어요. 참고로 Boundary는 <code>container-type</code>을 자동으로 선언하지
        않아요 - container query를 함께 쓰려면 프로젝트가 직접 선언해요.
      </p>

      <h2>Boundary 안의 Overlay는 어디에 열리나요?</h2>
      <p>
        컨테이너 크기로 판단했는데 실제 Overlay가 브라우저 전체를 덮어버리면
        결과가 어색할 수 있어요. 그래서 Boundary는 판단뿐 아니라{' '}
        <strong>일부 Overlay의 Portal 위치에도 관여해요.</strong>
      </p>
      <h3>Modal · Fullscreen · Sheet는 Boundary 안에 열려요</h3>
      <p>
        Boundary 안의 Dialog가 modal · fullscreen · sheet로 결정되면 기본 구현은
        Overlay를 가장 가까운 Boundary 안에 Portal해요. 시트는 패널 바닥에서
        올라오고, 스크림도 패널만 덮고, 풀스크린은 패널을 가득 채워요. Select와
        Menu의 시트도 같아요.
      </p>
      <pre><code>{`<div data-scope="boundary">
  ...
  <div data-scope="overlay" data-part="backdrop" data-contained></div>
  <div data-scope="overlay" data-part="popup" data-contained></div>
</div>`}</code></pre>
      <p>
        <code>data-contained</code>는 &quot;이 Overlay는 document 전체가 아니라
        Boundary 안에서 표현되고 있어요&quot;라는 상태예요.
      </p>
      <h3>Anchored Popover는 document에 남아요</h3>
      <p>
        버튼에 붙는 팝오버(드롭다운, 메뉴 팝업)는 trigger 기준으로 위치를 잡아야
        해요. 좁은 Boundary 안으로 Portal하면 컨테이너의 overflow에 잘릴 수
        있어서, anchored popover는 Boundary 안에 선언돼 있어도{' '}
        <strong>document level Portal을 유지해요.</strong> 이 차이는 의도적인
        계약이에요.
      </p>
      <pre><code>{`Sheet / Modal / Fullscreen → Boundary에 contained
Anchored Popover           → document Portal 유지`}</code></pre>

      <h2>data-contained로 스타일을 바꿀 수 있어요</h2>
      <pre><code>{`[data-scope="overlay"][data-part="popup"][data-contained] {
  /* Boundary 안 Overlay의 프로젝트 스타일 */
}`}</code></pre>
      <p>
        전체 화면용 Overlay와 패널 안 Overlay의 모서리나 여백을 다르게 하고 싶을
        때 사용할 수 있어요. 참고 스타일은 Boundary에{' '}
        <code>position: relative</code>를 주어 contained Overlay의 기준 영역이
        되게 해요 - Boundary의 <code>position</code>을 프로젝트 CSS에서 바꿀 때는
        contained Overlay의 위치 기준도 함께 확인해 주세요. 구체적인 DOM hook
        원칙은 <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>
        에서 설명해요.
      </p>

      <h2>Boundary를 중첩할 수도 있어요</h2>
      <pre><code>{`<ProteanBoundary className="workspace">
  ...
  <ProteanBoundary className="side-panel">
    <Dialog.Root>...</Dialog.Root>
  </ProteanBoundary>
</ProteanBoundary>`}</code></pre>
      <p>
        안쪽의 Dialog는 <strong>가장 가까운 Boundary</strong>를 사용해요. size
        측정과 contained Portal 모두요. 테스트로 고정된 계약이에요.
      </p>

      <h2>폭을 측정할 수 없다면 viewport로 돌아가요</h2>
      <p>
        Boundary 요소가 아직 없거나 폭이 0이라 실제 폭을 사용할 수 없다면
        Protean은 억지로 compact라고 판단하지 않아요. 대신 원래 viewport traits를
        그대로 사용해요. 숨겨진 패널이나 아직 레이아웃되지 않은 영역에서 잘못된
        0px 값을 모바일 크기로 취급하지 않아요.
      </p>

      <h2>별도의 ResizeObserver는 필요하지 않아요</h2>
      <p>
        Boundary는 계속 컨테이너 폭을 감시하면서 모든 UI를 다시 렌더링하는 구조가
        아니에요. Overlay가 열릴 때 현재 Boundary의 폭을 한 번 읽어요.
      </p>
      <pre><code>{`사용자가 Overlay 열기
        ↓
가장 가까운 Boundary 확인
        ↓
현재 width 측정
        ↓
size 계산 → presentation 결정`}</code></pre>
      <p>
        기본 <code>pinned</code>라면 열린 동안 그 결과를 유지하고, 다음에 다시 열
        때 현재 Boundary 폭을 다시 확인해요.
      </p>

      <h2>Boundary는 SSR에서 컨테이너 폭을 알 수 없어요</h2>
      <p>
        서버에는 실제 브라우저 레이아웃이 없어서 &quot;이 Boundary가 실제로
        420px인가?&quot;를 알 수 없어요. Boundary도 서버에서 폭을 추측하지
        않아요. 일반적인 Overlay 사용에서는 사용자가 실제로 열 때 브라우저에서
        폭을 측정해 판단하니 문제가 없어요. interaction 이전부터 형태가 필요한
        경우(열린 상태로 서버 렌더링하는 Overlay)에는 Boundary 폭이 아직
        존재하지 않는다는 점을 고려해야 해요.
      </p>
      <div className="callout">
        <code>ssrTraits</code>로 Boundary 폭을 넣지 마세요.{' '}
        <code>ProteanProvider</code>의 <code>ssrTraits</code>는 서버에서 사용할{' '}
        <strong>viewport 환경의 fallback</strong>이지, Boundary 각각의 컨테이너
        폭을 전달하는 API가 아니에요. 자세한 SSR 전략은{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link>에서
        설명해요.
      </div>

      <h2>ProteanBoundary</h2>
      <p>API 자체는 단순해요. 실제 <code>&lt;div&gt;</code>로 렌더링돼요.</p>
      <pre><code>{`<ProteanBoundary className="preview-panel" data-testid="panel">
  ...
</ProteanBoundary>`}</code></pre>
      <p>
        일반 <code>&lt;div&gt;</code> 속성을 그대로 받고, 별도의{' '}
        <code>width</code> · <code>size</code> · <code>presentation</code> prop은
        없어요. 실제 DOM 폭을 직접 측정해요.
      </p>

      <h2>자주 헷갈리는 것</h2>
      <ul>
        <li>
          <strong>Boundary가 모바일 환경을 만드는 건 아니에요.</strong> size만
          바뀌고 input · hover 등은 viewport 값을 유지해요.
        </li>
        <li>
          <strong>모든 컴포넌트가 Boundary를 따르는 건 아니에요.</strong> 페이지
          chrome이나 CSS 중심 레이아웃에는 CSS container query를 사용해 주세요.
        </li>
        <li>
          <strong>모든 Portal을 Boundary 안에 넣는 것도 아니에요.</strong>{' '}
          contained overlay는 Boundary로, anchored popover는 document로요.
        </li>
      </ul>

      <h2>무엇을 사용해야 하나요?</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>원하는 것</th><th>사용하면 좋은 방법</th></tr></thead>
          <tbody>
            <tr><td>좁은 패널 안 Dialog / Select / Menu의 size 판단</td><td><code>ProteanBoundary</code></td></tr>
            <tr><td>패널 안 Sheet / Modal을 패널 안에서 표현</td><td><code>ProteanBoundary</code></td></tr>
            <tr><td>카드 폭에 따라 레이아웃 변경</td><td>CSS container query</td></tr>
            <tr><td>Navigation을 컨테이너별로 다르게 표시</td><td>CSS container query</td></tr>
            <tr><td>브라우저 전체 환경의 기본 규칙 변경</td><td><code>ProteanProvider</code> / policy</td></tr>
            <tr><td>서버의 viewport fallback 전달</td><td><code>ssrTraits</code></td></tr>
            <tr><td>Overlay 하나만 결과 변경</td><td><code>presentation</code></td></tr>
          </tbody>
        </table>
      </div>

      <h2>정리하면</h2>
      <p>
        <code>ProteanBoundary</code>는 새로운 작은 브라우저를 만드는 기능이
        아니에요. viewport의 실제 입력 · 사용자 환경과 Boundary의 현재 사용할 수
        있는 폭을 합쳐 Overlay가 판단할 수 있게 해요.{' '}
        <strong>Overlay 판단에는 Boundary를, 단순한 컨테이너 레이아웃에는 CSS
        container query를 사용해요.</strong> 다음은{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link>이에요.
      </p>
    </div>
  )
}
