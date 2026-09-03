import Link from 'next/link'

export default function PatternAdaptationKo() {
  return (
    <div className="doc" lang="ko">
      <h1>같은 기능을 상황에 맞는 UI로 보여주기</h1>
      <p className="lede">
        같은 기능이라고 해서 모든 환경에서 같은 모습이 가장 자연스러운 건 아니에요.
      </p>
      <p>
        예를 들어 삭제 전 확인을 받는 화면을 생각해 볼게요. 데스크톱에서 마우스로
        사용한다면 화면 가운데 작은 모달이면 충분해요. 하지만 작은 터치 화면에서는
        손가락으로 누르기 쉽고 화면 공간도 효율적으로 쓰는 바텀 시트가 더 자연스러울
        수 있어요. 기능의 의미는 같지만 <strong>보여주는 UI 패턴은 달라진 것</strong>
        이에요. Protean은 이런 선택을 <strong>패턴 적응</strong>이라고 불러요.
      </p>

      <h2>화면 너비만 보면 왜 부족할까요?</h2>
      <p>반응형 UI를 만들 때 흔히 이런 코드를 사용해요.</p>
      <pre><code>{`const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile ? <BottomSheet /> : <Modal />;`}</code></pre>
      <p>
        간단하지만 여기에는 하나의 가정이 들어 있어요.{' '}
        <strong>화면이 좁으면 모바일일 것이다.</strong> 실제로는 꼭 그렇지 않아요.
      </p>
      <ul>
        <li>데스크톱에서 브라우저 창을 좁게 열었을 수 있어요.</li>
        <li>태블릿처럼 화면은 넓지만 손가락으로 사용하는 기기일 수도 있어요.</li>
        <li>
          같은 화면 크기라도 마우스로 쓰는지 터치로 쓰는지에 따라 편한 UI가 달라질
          수 있어요.
        </li>
      </ul>
      <p>
        그래서 Protean은 화면 크기 하나만으로 모바일을 추측하지 않아요.{' '}
        <strong>사용할 수 있는 공간과 입력 방식을 함께 봐요.</strong> 예를 들어
        Select의 기본 동작은 이렇게 달라져요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>선택되는 패턴</th></tr>
          </thead>
          <tbody>
            <tr><td>데스크톱 + 마우스</td><td>드롭다운</td></tr>
            <tr><td>좁은 창 + 마우스</td><td>드롭다운</td></tr>
            <tr><td>태블릿 + 터치</td><td>드롭다운</td></tr>
            <tr><td>작은 화면 + 터치</td><td>바텀 시트</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        여기서 중요한 건 <strong>좁은 창과 작은 터치 화면을 같은 환경으로 취급하지
        않는다는 것</strong>이에요.
      </p>

      <h2>앱은 UI의 의미만 알려줘요</h2>
      <p>
        Protean에서 개발자가 먼저 선언하는 건 화면 크기가 아니라{' '}
        <strong>이 UI가 무엇인지</strong>예요. Dialog를 예로 들어볼게요.
      </p>
      <pre><code>{`<Dialog.Root role="confirmation">
  ...
</Dialog.Root>`}</code></pre>
      <p>
        <code>role=&quot;confirmation&quot;</code>은 &quot;이 Dialog는 사용자의
        확인을 받는 대화예요&quot;라는 의미예요. <code>mobile</code>,{' '}
        <code>desktop</code>, <code>sheet</code>, <code>modal</code>을 호출하는
        곳에서 직접 판단하지 않아요. 기본 규칙에서는 같은 Dialog도 환경에 따라 다른
        패턴을 선택할 수 있어요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>선언한 역할</th><th>데스크톱 + 마우스</th><th>작은 화면 + 터치</th></tr>
          </thead>
          <tbody>
            <tr><td><code>confirmation</code></td><td>모달</td><td>바텀 시트</td></tr>
            <tr><td><code>form</code></td><td>모달</td><td>전체 화면</td></tr>
            <tr><td><code>contextual</code></td><td>팝오버</td><td>바텀 시트</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        앱 코드는 <strong>무엇인지</strong> 말하고, Protean은{' '}
        <strong>지금 어떻게 보여줄지</strong> 선택해요.
      </p>

      <h2>왜 CSS만 바꾸는 것과 다른가요?</h2>
      <p>CSS는 같은 UI의 배치와 크기를 바꾸는 데 아주 잘 맞아요.</p>
      <pre><code>{`.card {
  width: min(100%, 480px);
}`}</code></pre>
      <p>
        이런 변화는 그대로 CSS가 담당하면 돼요. 하지만 모달을 바텀 시트로 바꾸는 건
        단순히 폭이나 높이를 바꾸는 것과는 조금 달라요. 열리는 위치뿐 아니라
        상호작용 방식이나 포커스 처리처럼 <strong>사용하는 UI 패턴 자체가 달라질 수
        있기 때문</strong>이에요.
      </p>
      <p>Protean은 CSS를 대신하려는 게 아니에요. 역할을 이렇게 나눠요.</p>
      <pre><code>{`Protean
→ 지금 어떤 UI 패턴을 사용할지 선택

CSS
→ 선택된 UI를 실제로 배치하고 꾸미기`}</code></pre>
      <p>단순한 레이아웃 변화라면 Protean이 필요하지 않아요.</p>

      <h2>선택된 결과에는 이름이 있어요</h2>
      <p>
        Protean이 선택한 실제 UI 모습을 <code>presentation</code>이라고 불러요.
        예를 들어:
      </p>
      <pre><code>{`role="confirmation"
        ↓
현재 환경 확인
        ↓
presentation="modal"`}</code></pre>
      <p>또는 작은 터치 화면에서는:</p>
      <pre><code>{`role="confirmation"
        ↓
현재 환경 확인
        ↓
presentation="sheet"`}</code></pre>
      <p>
        처럼 될 수 있어요. 이 <code>presentation</code>은 DOM에도 표시되기 때문에
        스타일을 적용하거나 현재 결과를 확인할 때 사용할 수 있어요.
      </p>
      <pre><code>{`<div data-presentation="sheet">`}</code></pre>
      <p>
        처음 사용할 때 이 값을 직접 다룰 필요는 없어요. 기본 규칙이 맞지 않을 때{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        활용하게 돼요.
      </p>

      <h2>언제 선택하나요?</h2>
      <p>모든 UI를 같은 시점에 판단하지는 않아요.</p>
      <h3>눌렀을 때 열리는 UI</h3>
      <p>
        Dialog, Select, Menu처럼 평소에는 닫혀 있는 UI는{' '}
        <strong>사용자가 열 때</strong> 현재 환경을 보고 패턴을 선택해요. 한번 열린
        뒤에는 사용하는 도중 갑자기 다른 패턴으로 바뀌지 않아요. 닫았다가 다시 열면
        그때 다시 판단해요.
      </p>
      <h3>항상 화면에 있는 UI</h3>
      <p>
        Navigation처럼 처음부터 화면에 보여야 하는 UI는 다른 방식이 필요해요. 이
        경우 Protean은 하나의 마크업을 유지하고, 첫 배치는 CSS가 담당하도록
        설계되어 있어요. 서버 렌더링에서 왜 이렇게 나누는지는{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link> 페이지에서
        자세히 설명해요.
      </p>

      <h2>breakpoint를 쓰면 안 된다는 뜻은 아니에요</h2>
      <p>
        반응형 레이아웃을 만들 때 breakpoint와 media query는 여전히 필요하고
        유용해요. Protean이 줄이려는 건 이런 코드예요.
      </p>
      <pre><code>{`isMobile
  ? <MobilePattern />
  : <DesktopPattern />`}</code></pre>
      <p>
        화면마다 같은 환경 판단을 반복하고, 그 결과에 맞춰 서로 다른 UI 패턴을 직접
        연결하는 코드예요. Protean에서는 이 판단을 한곳에서 관리하고, 컴포넌트를
        사용하는 곳에는 의미를 남겨요.
      </p>
      <pre><code>{`<Dialog.Root role="confirmation">`}</code></pre>
      <p>
        그래서 나중에 기본 규칙을 바꾸더라도 모든 호출부를 찾아서{' '}
        <code>isMobile</code> 조건을 다시 수정할 필요가 없어요.
      </p>

      <h2>정리하면</h2>
      <p>
        패턴 적응은 화면을 자동으로 예쁘게 만드는 기능이 아니에요.{' '}
        <strong>같은 의미의 UI를 현재 상황에 더 적절한 패턴으로 연결하는 것</strong>
        이에요.
      </p>
      <pre><code>{`앱
"이건 입력 폼이에요"
        ↓
Protean
"지금은 작은 터치 화면이네"
        ↓
전체 화면 Dialog`}</code></pre>
      <p>
        앱은 의미를 선언하고, 환경별 분기는 Protean이 맡아요. 그리고 어떤 패턴을
        선택했는지에 따라 UI 내부의 크기도 자연스럽게 달라져야 해요. 다음
        페이지에서는 Protean의 두 번째 핵심 개념인{' '}
        <Link href="/ko/concepts/density">밀도</Link>를 알아볼게요.
      </p>
      <p>
        기본 선택이 우리 서비스와 맞지 않는다면{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        규칙을 바꿀 수 있어요.
      </p>
    </div>
  )
}
