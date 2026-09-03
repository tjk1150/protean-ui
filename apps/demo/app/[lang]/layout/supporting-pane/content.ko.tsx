import Link from 'next/link'
import { SupportingPaneDemo } from './supporting-pane-demo'

export default function SupportingPaneKo() {
  return (
    <div className="doc" lang="ko">
      <h1>SupportingPane</h1>
      <p className="lede">
        본문 옆에 <strong>있으면 도움이 되지만, 본문 자체는 아닌 정보</strong>를
        보여줄 때 사용해요. 상품 상세와 구매 정보, 문서와 목차, 편집 화면과 속성
        패널, 지도와 장소 정보 같은 화면이에요. 공간이 충분하면 본문 옆에 계속
        보여줄 수 있지만, 작은 화면에서는 두 영역을 나란히 놓기 어려워요.
        SupportingPane은 같은 본문과 보조 영역을 유지하면서 좁은 화면에서 어떻게
        보여줄지만 정리할 수 있게 해줘요.
      </p>

      <div className="callout">
        <strong>CSS 중심 컴포넌트예요.</strong> SupportingPane은 환경을 읽어{' '}
        <code>sheet</code>나 <code>stacked</code> 중 하나를 자동으로 선택하지
        않아요. 좁은 화면에서 어떤 방식이 더 자연스러운지는 콘텐츠의 성격에 따라
        개발자가 직접 정하고, 실제 반응형 배치는 CSS가 담당해요.
      </div>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">창을 600px보다 좁혀 보세요</span>
        <SupportingPaneDemo
          paneLabel="문서 정보"
          body="계약서 본문이 여기 흐른다고 상상해 보세요. 넓은 화면에서는 오른쪽에 문서 정보가 항상 보이고, 폰에서는 아래 버튼을 눌러야 올라와요."
          rows={[
            ['작성자', '장진태'],
            ['수정', '2026년 9월 2일'],
            ['크기', '18KB'],
          ]}
        />
      </div>

      <h2>기본 사용법</h2>
      <p>상품 상세 화면에 구매 정보를 붙여볼게요.</p>
      <pre><code>{`<SupportingPane.Root paneLabel="구매 정보">
  <SupportingPane.Main>
    <ProductDetail />
  </SupportingPane.Main>
  <SupportingPane.Pane>
    <PurchaseOptions />
  </SupportingPane.Pane>
</SupportingPane.Root>`}</code></pre>
      <p>공간이 충분하면 본문 옆에 보조 영역이 보여요.</p>
      <pre><code>{`┌──────────────────────┬──────────────┐
│                      │              │
│      상품 상세       │   구매 정보  │
│                      │              │
└──────────────────────┴──────────────┘`}</code></pre>
      <p>
        작은 화면에서는 기본값(<code>compact=&quot;sheet&quot;</code>)에 따라
        구매 정보가 접히고, <code>paneLabel</code>을 사용하는 버튼으로 열 수
        있어요.
      </p>

      <h2>좁은 화면에서는 두 가지 방법이 있어요</h2>
      <p>
        보조 영역의 성격에 따라 작은 화면에서 더 자연스러운 방식이 달라요. 그래서
        SupportingPane은 두 가지 compact 전략을 제공해요. 이 값은 Protean이
        환경을 보고 정하는 게 아니에요.{' '}
        <strong>이 보조 정보가 작은 화면에서 어떻게 보여야 하는지는 앱이 알고
        있기 때문이에요.</strong>
      </p>

      <h3>sheet - 필요할 때 열기 (기본값)</h3>
      <p>작은 화면에서는 기본적으로 접혀 있고:</p>
      <pre><code>{`┌──────────────────────┐
│      상품 상세       │
│                      │
│ [ 구매 정보 ]        │
└──────────────────────┘`}</code></pre>
      <p>버튼을 누르면 화면 아래에서 보조 영역을 열 수 있어요.</p>
      <pre><code>{`┌──────────────────────┐
│      상품 상세       │
├──────────────────────┤
│      구매 정보       │
│ 옵션                 │
│ 수량                 │
└──────────────────────┘`}</code></pre>
      <p>
        본문을 읽는 동안 계속 보여줄 필요는 없지만, 필요할 때 바로 확인할 수
        있어야 하는 정보에 잘 맞아요.
      </p>

      <h3>stacked - 본문 아래에 이어서 보여주기</h3>
      <p>보조 정보가 작은 화면에서도 항상 보여야 한다면 <code>stacked</code>를 사용해요.</p>
      <pre><code>{`<SupportingPane.Root paneLabel="상품 정보" compact="stacked">
  ...
</SupportingPane.Root>`}</code></pre>
      <pre><code>{`┌──────────────────────┐
│      상품 상세       │
├──────────────────────┤
│      상품 정보       │
└──────────────────────┘`}</code></pre>
      <p>
        본문 아래에 그대로 이어지고, 별도의 열기 버튼은 만들지 않아요 -{' '}
        <code>stacked</code>에서는 toggle과 backdrop이 DOM에 아예 렌더되지
        않아요.
      </p>

      <h2>어떤 걸 선택해야 하나요?</h2>
      <p>간단한 기준은 이래요.</p>
      <pre><code>{`sheet
필요할 때만 보면 되는 정보
상품 상세 → 구매 옵션 / 편집 화면 → 속성 패널 / 지도 → 장소 상세

stacked
본문과 함께 읽어야 하는 정보
문서 → 참고 정보 / 상품 설명 → 추가 정보`}</code></pre>
      <pre><code>{`앱  → compact에서 sheet인지 stacked인지 결정
CSS → 현재 화면 공간에 맞게 실제 배치`}</code></pre>

      <h2>넓은 화면에서는 둘 다 옆에 보여요</h2>
      <p>
        <code>compact</code>라는 이름 그대로 이 선택은{' '}
        <strong>좁은 화면에서의 처리 방식</strong>을 정해요.{' '}
        <code>sheet</code>와 <code>stacked</code> 모두 공간이 충분하면 같은
        방식으로 본문 옆에 Pane을 보여줘요. 서로 다른 데스크톱 레이아웃처럼
        이해하면 안 돼요 - 차이는 compact 상태에서만 나타나요.
      </p>
      <p>
        참고로 SupportingPane에는 <code>presentation</code>이 없어요.{' '}
        <code>compact=&quot;sheet&quot;</code>는 &quot;환경을 보고 어떤 패턴을
        고를까&quot;에 대한 답이 아니라, &quot;작은 화면이 되었을 때 이 보조
        정보를 어떤 방식으로 접을까&quot;라는{' '}
        <strong>작성자의 콘텐츠 선택</strong>이에요. 환경에 따른 실제 전환은
        CSS가 담당해요.
      </p>

      <h2>sheet도 같은 Pane을 사용해요</h2>
      <p>
        작은 화면에서 시트 형태로 열린다고 해서 별도의 Pane 컴포넌트를 새로
        만드는 건 아니에요. 실제 구조는 개념적으로:
      </p>
      <pre><code>{`<div data-scope="supporting">
  <div data-part="main">...</div>
  <aside data-part="pane" aria-label="구매 정보">...</aside>
  <div data-part="backdrop" />
  <button data-part="pane-toggle">구매 정보</button>
</div>`}</code></pre>
      <p>
        열리면 Root에 <code>data-open</code>이 표시되고, CSS가 기존 Pane을 화면
        아래쪽 패널처럼 표현해요. 마크업이 환경과 무관해서 서버와 클라이언트가
        언제나 같은 구조를 그려요.
      </p>
      <pre><code>{`React           → 같은 Main / Pane 유지
SupportingPane  → 열림 상태 관리
CSS             → 옆 pane 또는 compact sheet로 표현`}</code></pre>

      <h2>paneLabel은 꼭 필요해요</h2>
      <p><code>paneLabel</code>은 두 곳에서 사용돼요.</p>
      <ul>
        <li>
          <strong>Pane의 이름</strong> - 보조 영역은 실제{' '}
          <code>&lt;aside aria-label=&quot;구매 정보&quot;&gt;</code>로
          렌더링돼요.
        </li>
        <li>
          <strong>작은 화면의 열기 버튼</strong> -{' '}
          <code>compact=&quot;sheet&quot;</code>에서 같은 값이 버튼 이름으로
          사용돼요.
        </li>
      </ul>
      <p>
        그래서 <code>paneLabel=&quot;열기&quot;</code>보다{' '}
        <code>paneLabel=&quot;구매 정보&quot;</code>처럼{' '}
        <strong>무엇을 여는지 알 수 있는 이름</strong>을 사용하는 게 좋아요.
      </p>

      <h2>열림 상태를 직접 관리할 수도 있어요</h2>
      <p>
        sheet의 열림 상태는 기본적으로 SupportingPane이 관리해요(처음에는 닫힘).
        필요하다면:
      </p>
      <pre><code>{`<SupportingPane.Root
  paneLabel="구매 정보"
  open={open}
  onOpenChange={setOpen}
>
  ...
</SupportingPane.Root>`}</code></pre>
      <p>
        처럼 직접 관리할 수 있고, 처음 열린 상태만 지정하려면{' '}
        <code>defaultOpen</code>을 사용하면 돼요.
      </p>

      <h2>Sheet를 닫는 방법</h2>
      <p>열려 있을 때는 몇 가지 방법으로 닫을 수 있어요.</p>
      <ul>
        <li>같은 toggle 버튼을 다시 누르기</li>
        <li>배경 영역 누르기</li>
        <li><code>Escape</code> 키 누르기</li>
      </ul>
      <p>
        <code>Escape</code>를 눌렀을 때 Root에 전달된 기존{' '}
        <code>onKeyDown</code>이 먼저 실행되고, 이벤트가 취소되지 않았다면 Pane을
        닫아요. 일반적인 사용에서는 이 세부 순서를 신경 쓸 필요는 없어요.
      </p>

      <div className="callout">
        <strong>Dialog와 같은 모달은 아니에요.</strong> 작은 화면에서 시트처럼
        보이지만, Pane은 계속 <code>&lt;aside&gt;</code>를 유지하고 Dialog처럼
        포커스를 가두지 않아요. 새로운 대화를 여는 게 아니라{' '}
        <strong>원래 화면에 있던 보조 영역을 작은 공간에서 다른 방식으로
        보여주는 것</strong>이에요.
      </div>

      <h2>참고 스타일을 사용하려면 opt-in이 필요해요</h2>
      <p>
        SupportingPane의 반응형 참고 레이아웃(넓은 화면 2열, 작은 화면 시트
        접기와 backdrop)은 다른 레이아웃 컴포넌트와 마찬가지로{' '}
        <code>protean-defaults</code> 클래스를 켠 앱에서 적용돼요. 이미
        프로젝트에 자체 레이아웃이 있다면 안정적인 DOM hook만 이용해 직접 구성할
        수도 있어요.
      </p>
      <pre><code>{`[data-scope="supporting"] > [data-part="pane"] {
  /* 프로젝트 pane 스타일 */
}`}</code></pre>

      <h2>SupportingPane.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>paneLabel</code></td><td>Pane의 접근성 이름과 compact toggle의 이름이에요. 필수예요.</td></tr>
            <tr><td><code>compact</code></td><td>좁은 화면에서 <code>sheet</code> 또는 <code>stacked</code> 중 어떤 방식으로 보여줄지 정해요. 기본값은 <code>sheet</code>예요.</td></tr>
            <tr><td><code>open</code></td><td>sheet의 열림 상태를 직접 관리할 때 사용해요.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>처음 열림 상태를 지정해요. 기본값은 닫힘이에요.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>sheet의 열림 상태가 바뀔 때 호출돼요.</td></tr>
            <tr><td><code>children</code></td><td>Main과 Pane이에요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>그 외 일반 <code>&lt;div&gt;</code> 속성도 사용할 수 있어요.</p>

      <h2>SupportingPane.Main / SupportingPane.Pane</h2>
      <p>
        본문 영역과 보조 정보 영역이에요. Main은{' '}
        <code>div[data-part=&quot;main&quot;]</code>으로, Pane은{' '}
        <code>aside[data-part=&quot;pane&quot;]</code>으로 렌더링되고{' '}
        <code>paneLabel</code>이 Pane의 접근성 이름으로 연결돼요. 둘 다 일반 HTML
        속성을 그대로 받고, <code>SupportingPane.Root</code> 안에서 사용해야
        해요.
      </p>

      <h2>DOM 상태</h2>
      <p>현재 상태는 Root의 data 속성으로 확인할 수 있어요.</p>
      <pre><code>{`[data-scope="supporting"]                     기본 (sheet)
[data-scope="supporting"][data-compact="stacked"]  stacked
[data-scope="supporting"][data-open]          sheet 열림`}</code></pre>
      <p>
        내부 요소는 <code>main</code> · <code>pane</code> ·{' '}
        <code>backdrop</code> · <code>pane-toggle</code>의{' '}
        <code>data-part</code>를 사용해요. presentation이 없어도 이런 data
        속성만 읽으면 CSS 중심 컴포넌트의 상태를 커스터마이징할 수 있어요 -
        구체적인 활용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>접근성</h2>
      <p>
        Pane은 <code>&lt;aside&gt;</code>로 본문을 보조하는 영역이라는 의미를
        유지하고, toggle 버튼은 열림 상태를 <code>aria-expanded</code>로
        전달하며 <code>aria-controls</code>로 해당 Pane을 가리켜요. Dialog 같은
        포커스 가두기나 <code>dialog</code> 역할은 제공하지 않아요 - 작은 화면의
        시트도 같은 보조 영역을 다른 레이아웃으로 표현하는 것이에요. 제품 전체의
        접근성 원칙은 <Link href="/ko/guides/accessibility">접근성</Link>{' '}
        페이지에서 설명해요.
      </p>

      <h2>정리하면</h2>
      <p>SupportingPane은 본문 옆의 보조 정보를 위한 레이아웃이에요.</p>
      <pre><code>{`공간이 충분하면
Main | Pane

작은 화면에서는
compact="sheet"   → 필요할 때 열기
compact="stacked" → 본문 아래에 계속 보여주기`}</code></pre>
      <p>
        <strong>보조 정보를 좁은 화면에서 숨겨 열지, 아래에 이어 붙일지는 앱이
        정하고, 실제 배치는 CSS가 맡아요.</strong> 다음은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>이에요.
      </p>
    </div>
  )
}
