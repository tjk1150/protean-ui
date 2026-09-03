import Link from 'next/link'

export default function PrimaryActionKo() {
  return (
    <div className="doc" lang="ko">
      <h1>PrimaryAction</h1>
      <p className="lede">
        저장, 계속, 결제하기처럼 <strong>이 화면에서 가장 중요한 행동 하나</strong>를
        보여줄 때 사용해요. 같은 버튼이라도 항상 같은 위치가 편한 건 아니에요. 넓은
        화면에서는 콘텐츠 안에 자연스럽게 놓는 게 좋지만, 작은 터치 화면에서는
        손가락으로 쉽게 누를 수 있도록 화면 아래쪽에서 크게 보여주는 편이 더 편할
        수 있어요. Protean에서는 같은 <code>PrimaryAction</code> 하나를 사용해요.
      </p>

      <h2>기본 사용법</h2>
      <p>예를 들어 주문 화면의 결제 버튼이라면 이렇게 사용할 수 있어요.</p>
      <pre><code>{`<PrimaryAction.Root
  disabled={!canCheckout}
  onClick={handleCheckout}
>
  결제하기
</PrimaryAction.Root>`}</code></pre>
      <p>일반 버튼처럼 클릭 동작을 연결하면 돼요. 앱이 관리하는 건:</p>
      <ul>
        <li>버튼을 눌렀을 때 무엇을 할지</li>
        <li>버튼이 비활성화됐는지</li>
        <li>버튼 안에 무엇을 보여줄지</li>
      </ul>
      <p>
        예요. Protean은 <strong>현재 환경에서 이 중요한 행동을 어디에
        보여줄지</strong> 결정해요.
      </p>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>기본 규칙은 세 가지 형태를 사용해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>선택되는 형태</th><th>보여주는 방식</th></tr>
          </thead>
          <tbody>
            <tr><td>작은 화면 + 터치</td><td><code>action-bar</code></td><td>손가락으로 누르기 쉬운 하단 액션 영역</td></tr>
            <tr><td>작은 화면 + 마우스</td><td><code>sticky-footer</code></td><td>화면 아래쪽의 컴팩트한 액션 영역</td></tr>
            <tr><td>중간 · 넓은 화면</td><td><code>inline</code></td><td>콘텐츠 흐름 안에서 자연스럽게 표시</td></tr>
          </tbody>
        </table>
      </div>
      <p>특히 작은 화면에서 차이가 보여요.</p>
      <pre><code>{`작은 화면 + 터치
→ action-bar

작은 화면 + 마우스
→ sticky-footer`}</code></pre>
      <p>
        화면 너비는 같아도 <strong>어떻게 조작하고 있는지에 따라 중요한 버튼의
        적절한 위치와 크기가 달라져요.</strong> 이 컴포넌트도 Navigation과
        마찬가지로 좁은 화면을 곧 모바일이라고 가정하지 않아요.
      </p>

      <h3>넓은 화면에서는 콘텐츠 안에 있어요</h3>
      <p>
        공간이 충분한 화면에서는 중요한 행동을 항상 화면 아래에 붙여 둘 필요가
        없어요. 예를 들어 폼 마지막에:
      </p>
      <pre><code>{`이름
[              ]
이메일
[              ]

[ 저장하기 ]`}</code></pre>
      <p>
        처럼 콘텐츠 흐름 안에 두는 게 자연스러워요. 이 형태를 <code>inline</code>
        이라고 해요.
      </p>

      <h3>작은 터치 화면에서는 누르기 쉽게 보여줘요</h3>
      <pre><code>{`┌──────────────────┐
│                  │
│    주문 내용     │
│                  │
├──────────────────┤
│   [ 결제하기 ]   │
└──────────────────┘`}</code></pre>
      <p>
        이 형태를 <code>action-bar</code>라고 해요. 참고 스타일에서는 버튼이
        영역을 넓게 사용하고 터치하기 쉬운 크기로 표현돼요. 앱에서 별도로{' '}
        <code>isMobile && isTouch ? &lt;MobileCheckoutBar /&gt; :
        &lt;CheckoutButton /&gt;</code> 같은 컴포넌트를 만들 필요가 없어요.
      </p>
      <p>
        작은 화면에서 마우스를 쓰고 있다면 <code>action-bar</code> 대신{' '}
        <code>sticky-footer</code>가 선택돼요. 터치용으로 버튼을 화면 가득 크게
        만드는 대신, 중요한 행동을 아래쪽에 유지하면서 마우스 환경에 맞는 표현을
        사용해요.
      </p>

      <h2>버튼을 세 개 만드는 건 아니에요</h2>
      <p>
        <code>action-bar</code>, <code>sticky-footer</code>, <code>inline</code>은
        서로 다른 버튼 컴포넌트가 아니에요. 앱에서는 항상 같은{' '}
        <code>PrimaryAction.Root</code>를 사용하고, 렌더링되는 구조도 하나예요.
      </p>
      <pre><code>{`<div
  data-scope="primary-action"
  data-presentation="inline"
>
  <button data-part="button">
    저장하기
  </button>
</div>`}</code></pre>
      <p>역할은 이렇게 나뉘어요.</p>
      <pre><code>{`앱      → 버튼의 행동과 상태
Protean → action-bar / sticky-footer / inline 결정
CSS     → 실제 위치와 모양 표현`}</code></pre>
      <div className="callout">
        참고 스타일의 배치는 레이아웃 참고 스타일을 켠 앱(
        <code>protean-defaults</code> 클래스)에서 표현돼요.{' '}
        <Link href="/ko/getting-started">10분 시작하기</Link>의 레이아웃 절을
        참고하세요. 화면 뼈대와 함께 쓰는 조합은{' '}
        <Link href="/ko/guides/composition">함께 쓰기</Link>에서 보여줘요.
      </div>

      <h2>키보드가 열려도 중요한 행동을 가리지 않도록 해요</h2>
      <p>
        작은 터치 화면에서는 입력 폼을 작성하는 동안 화면 키보드가 열릴 수 있어요.
        하단 액션 영역이 키보드 뒤에 숨어버리면 사용자가 버튼을 누르기 어려워져요.
        PrimaryAction은 브라우저가 제공하는 visual viewport 정보를 이용해 키보드
        때문에 가려진 높이를 계산하고, 참고 스타일이 그 값을 사용할 수 있도록
        연결해요. 그래서 <code>action-bar</code>는 키보드가 나타났을 때도 중요한
        행동을 계속 사용할 수 있어요.
      </p>
      <p>
        이 기능은 버튼의 클릭 동작을 바꾸는 게 아니라 하단 액션 영역의 위치를
        보조하는 기능이에요. 브라우저가 해당 정보를 제공하지 않는 환경에서는 추가
        오프셋 없이 동작해요. <Link href="/screen-demo">화면 데모</Link>를 폰에서
        열고 입력칸에 포커스해 보면 직접 확인할 수 있어요.
      </p>

      <h2>Safe Area도 스타일에서 처리해요</h2>
      <p>
        홈 인디케이터가 있는 모바일 기기처럼 화면 아래쪽에 안전 영역이 필요한
        환경도 있어요. 참고 스타일은 필요한 구성에서 CSS의{' '}
        <code>env(safe-area-inset-bottom)</code>을 이용해 아래쪽 여백을 확보해요.
      </p>
      <pre><code>{`Protean      → 어떤 형태인지 결정
브라우저 정보 → 필요한 키보드 오프셋 제공
CSS          → 실제 하단 위치와 safe area 표현`}</code></pre>

      <h2>이 PrimaryAction만 결과를 바꾸고 싶다면</h2>
      <p>
        <code>presentation</code>으로 형태를 직접 지정할 수 있어요. 사용할 수
        있는 값은 <code>action-bar</code> · <code>sticky-footer</code> ·{' '}
        <code>inline</code>이에요.
      </p>
      <pre><code>{`<PrimaryAction.Root presentation="inline">
  저장하기
</PrimaryAction.Root>`}</code></pre>
      <div className="callout">
        지정은 판단 결과와 <code>data-presentation</code> 값을 바꿔요.{' '}
        <code>presentation</code>을 지정한다고 JavaScript가 버튼을 다른 위치로
        직접 이동시키는 건 아니에요. 실제 배치는 스타일 계층이 표현하고, 참고
        스타일은 현재 환경의 미디어쿼리와 함께 배치를 그리니, 지정을 눈에 보이게
        하려면 그 스탬프에 여러분의 CSS를 걸어 주세요 - 데이터 계약이에요.
      </div>
      <p>
        프로젝트 전체의 기본 규칙을 변경하려면 인스턴스마다 반복하지 말고{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        변경해요.
      </p>

      <h2>일반 버튼처럼 사용할 수 있어요</h2>
      <p>
        <code>PrimaryAction.Root</code> 안쪽은 실제 <code>&lt;button&gt;</code>{' '}
        요소예요. 그래서 일반적인 버튼 속성을 그대로 사용할 수 있어요.
      </p>
      <pre><code>{`<PrimaryAction.Root
  type="submit"
  disabled={isSaving}
  aria-busy={isSaving}
>
  {isSaving ? "저장 중..." : "저장하기"}
</PrimaryAction.Root>`}</code></pre>
      <p>
        <code>type</code>을 지정하지 않으면 기본값은 <code>button</code>이에요.
        폼 제출 버튼으로 사용하려면 <code>type=&quot;submit&quot;</code>을 직접
        지정해 주세요.
      </p>

      <h2>PrimaryAction.Root</h2>
      <p>PrimaryAction은 별도의 Trigger나 Content 없이 <code>Root</code> 하나로 사용해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>사용할 형태를 직접 지정할 때 사용해요. 환경별 지정도 가능해요.</td></tr>
            <tr><td><code>children</code></td><td>버튼 안에 보여줄 내용이에요.</td></tr>
            <tr><td><code>type</code></td><td>일반 button의 <code>type</code>이에요. 지정하지 않으면 <code>button</code>을 사용해요.</td></tr>
            <tr><td><code>disabled</code></td><td>버튼을 비활성화해요.</td></tr>
            <tr><td><code>onClick</code></td><td>버튼을 눌렀을 때 실행할 동작이에요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        그 외 일반 <code>&lt;button&gt;</code> 속성과 이벤트도 사용할 수 있어요.
        별도의 <code>loading</code>, <code>variant</code>, <code>size</code> 같은
        디자인 API는 제공하지 않아요. 그런 스타일과 상태는 사용하는 디자인
        시스템이나 앱 CSS가 담당해요.
      </p>

      <h2>PrimaryAction은 Button 컴포넌트 라이브러리가 아니에요</h2>
      <p>
        이름 때문에 <code>PrimaryAction</code>이 디자인 시스템의 Primary
        Button처럼 느껴질 수 있어요. 하지만 역할이 달라요. 일반적인 Button
        컴포넌트가 색상 · 크기 · variant · icon · loading 같은 버튼 자체의 표현을
        담당한다면, <code>PrimaryAction</code>이 관심을 갖는 건{' '}
        <strong>&quot;이 중요한 행동을 지금 어디에 보여주는 게
        자연스러운가?&quot;</strong>예요.
      </p>
      <p>
        따라서 프로젝트의 모든 버튼을 <code>PrimaryAction</code>으로 바꾸면 안
        돼요. <strong>화면에서 가장 중요한 행동처럼 환경에 따라 위치가 달라질
        가치가 있는 경우에 사용해요.</strong> 일반 버튼은 기존 디자인 시스템을
        그대로 사용하면 돼요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>현재 선택된 결과는 Root에서 확인할 수 있어요.</p>
      <pre><code>{`[data-scope="primary-action"] [data-part="button"] {
  /* 프로젝트 버튼 스타일 */
}

[data-scope="primary-action"][data-presentation="inline"] {
  /* inline 상태의 프로젝트 스타일 */
}`}</code></pre>
      <p>
        구체적인 CSS hook과 커스터마이징 방법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>접근성</h2>
      <p>
        <code>PrimaryAction.Root</code>는 실제 버튼을 사용하기 때문에 기본적인
        버튼 의미를 유지해요. <code>disabled</code>, <code>aria-*</code>, 키보드
        활성화 같은 일반 버튼 동작을 사용할 수 있어요. Protean은 이 버튼이 어떤
        작업을 실행하는지 추측하지 않아요. 버튼의 이름과 상태는 앱이 명확하게
        전달해야 해요. 제품 전체의 접근성 원칙은{' '}
        <Link href="/ko/guides/accessibility">접근성</Link> 페이지에서 설명해요.
      </p>

      <h2>정리하면</h2>
      <p>
        PrimaryAction은 버튼을 예쁘게 만드는 컴포넌트가 아니에요. 화면에서 가장
        중요한 행동을 환경에 맞는 위치에 보여주는 컴포넌트예요.
      </p>
      <pre><code>{`작은 화면 + 터치   → action-bar
작은 화면 + 마우스  → sticky-footer
중간 · 넓은 화면   → inline`}</code></pre>
      <p>
        버튼의 실제 행동은 평소처럼 앱이 관리해요.{' '}
        <strong>같은 중요한 버튼을 환경마다 다시 만들지 않고, 어디에 보여줄지만
        Protean이 바꿔요.</strong> 다음은{' '}
        <Link href="/ko/components/tooltip">Tooltip</Link>이에요.
      </p>
    </div>
  )
}
