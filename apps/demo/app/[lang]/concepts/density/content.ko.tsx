import Link from 'next/link'

export default function DensityKo() {
  return (
    <div className="doc" lang="ko">
      <h1>같은 UI도 입력 방식에 따라 편한 크기가 달라요</h1>
      <p className="lede">
        마우스로 메뉴를 사용할 때는 항목이 조금 촘촘해도 괜찮아요. 하지만 같은
        메뉴를 손가락으로 눌러야 한다면 클릭 영역이 더 넉넉한 편이 편해요.
      </p>
      <p>예를 들어 같은 메뉴 항목이라도 이런 차이가 생길 수 있어요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>밀도</th><th>행 높이</th><th>주로 어울리는 상황</th></tr>
          </thead>
          <tbody>
            <tr><td><code>compact</code></td><td>28px</td><td>많은 정보를 촘촘하게 보여줄 때</td></tr>
            <tr><td><code>comfortable</code></td><td>36px</td><td>일반적인 마우스 환경</td></tr>
            <tr><td><code>touch</code></td><td>44px</td><td>손가락으로 조작할 때</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Protean은 이 차이를 <strong>밀도(density)</strong>라고 불러요. 밀도는 UI를
        다른 컴포넌트로 바꾸는 기능이 아니에요. 같은 UI 안에서{' '}
        <strong>얼마나 촘촘하거나 넉넉하게 보여줄지</strong>를 정하는 값이에요.
      </p>

      <h2>CSS만으로 충분한 경우도 많아요</h2>
      <p>
        먼저 중요한 것부터 말할게요. 앱 전체에서 마우스와 터치에 따라 크기만 바꾸고
        싶다면 Protean이 필요하지 않아요. CSS만으로 충분해요.
      </p>
      <pre><code>{`:root {
  --target-size: 40px;
}

@media (pointer: coarse) {
  :root {
    --target-size: 48px;
  }
}`}</code></pre>
      <p>
        이 정도 요구라면 이 방식이 더 단순해요. Protean은 CSS가 잘하는 크기 변경을
        다시 구현하지 않아요.
      </p>

      <h2>그럼 Protean의 밀도는 언제 필요한가요?</h2>
      <p>
        밀도를 결정할 때 <strong>입력 방식 하나만으로는 부족한 경우</strong>가
        있어요. 대표적으로 세 가지예요.
      </p>

      <h3>1. 사용자가 밀도를 직접 선택할 때</h3>
      <p>
        어떤 서비스는 사용자가 화면을 얼마나 촘촘하게 볼지 직접 선택할 수 있어요.
        예를 들어:
      </p>
      <pre><code>{`보기 설정
○ 촘촘하게
● 기본
○ 넉넉하게`}</code></pre>
      <p>
        이 선택은 화면 크기나 CSS media query에서 알 수 있는 정보가 아니에요. 앱이
        가지고 있는 사용자 설정이에요. Protean에서는 이 값을 density 선택에 연결할
        수 있어요.
      </p>
      <pre><code>{`<ProteanProvider density="compact">
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        이렇게 지정하면 떠서 열리는 컴포넌트마다 같은 설정을 다시 연결할 필요가
        없어요. 페이지의 정적 콘텐츠에도 같은 설정을 적용하는 연결 방법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h3>2. 선택된 UI 패턴에 따라 필요한 크기가 달라질 때</h3>
      <p>
        앞 페이지에서 같은 Select가 상황에 따라 드롭다운이나 바텀 시트가 될 수
        있다고 봤어요. 이때 패턴만 바뀌고 내부 항목 크기는 그대로라면 어색할 수
        있어요. 예를 들어:
      </p>
      <pre><code>{`데스크톱 + 마우스
→ Dropdown
→ comfortable

작은 화면 + 터치
→ Sheet
→ touch`}</code></pre>
      <p>
        처럼 <strong>패턴과 밀도가 함께 움직여야 할 때</strong>가 있어요. Protean은
        어떤 패턴을 선택했는지 이미 알고 있기 때문에, 밀도도 같은 판단 흐름에
        연결할 수 있어요. 앱에서 따로:
      </p>
      <pre><code>{`const rowHeight = isSheet ? 44 : 36;`}</code></pre>
      <p>같은 연결 코드를 다시 만들 필요가 없어요.</p>
      <div className="callout">
        참고 스타일에서 바텀 시트만은 선택된 밀도와 관계없이 터치 크기로 그려요.
        시트는 어떤 환경에서든 엄지로 쓰는 표면이니까요. 이때도 밀도 결정값
        자체는 바뀌지 않고, CSS가 시트에서만 크기를 올려요.
      </div>

      <h3>3. 화면 전체가 아니라 특정 영역에 맞춰야 할 때</h3>
      <p>
        대시보드 안의 작은 패널이나 임베드 영역처럼 화면 전체와 다른 공간에서 UI가
        사용될 수도 있어요. 이 경우에는 사용할 수 있는 공간, 입력 방식, 사용자
        설정, 현재 선택된 UI 패턴 같은 정보를 함께 봐야 할 수 있어요. 이런
        상황에서는 전역 media query 하나로 밀도를 관리하는 것보다 하나의 결정
        규칙으로 관리하는 편이 더 자연스러울 수 있어요. 컨테이너 단위 적응은{' '}
        <Link href="/ko/advanced/container-boundary">컨테이너 안에서 사용하기</Link>
        에서 자세히 설명해요.
      </p>

      <h2>Protean의 기본 밀도</h2>
      <p>Protean은 기본적으로 세 가지 밀도 이름을 사용해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>밀도</th><th>행 높이</th><th>대상 크기</th><th>설명</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>compact</code></td><td>28px</td><td>32px</td>
              <td>가장 촘촘한 형태. 정보량이 많거나 사용자가 직접 촘촘한 보기를 선택한 경우에 사용할 수 있어요.</td>
            </tr>
            <tr>
              <td><code>comfortable</code></td><td>36px</td><td>40px</td>
              <td>기본적인 마우스 환경에 맞는 밀도예요.</td>
            </tr>
            <tr>
              <td><code>touch</code></td><td>44px</td><td>48px</td>
              <td>손가락으로 누르기 쉽게 더 넉넉한 밀도예요.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        이 숫자를 앱 코드에서 직접 사용하도록 만드는 게 목적은 아니에요. 컴포넌트는
        density에 맞는 CSS token을 사용하고, 필요하다면 프로젝트에서 값을 다시
        정의할 수 있어요.
      </p>

      <h2>선택 결과는 DOM에도 표시돼요</h2>
      <p>
        Dialog, Select, Menu, Tooltip처럼 Portal로 렌더링되어 떠서 열리는 UI는
        실제 팝업 요소에 현재 density가 직접 표시돼요.
      </p>
      <pre><code>{`<div data-density="comfortable">`}</code></pre>
      <p>그래서 CSS에서도 사용할 수 있어요.</p>
      <pre><code>{`[data-density="compact"] {
  --my-menu-gap: 4px;
}

[data-density="touch"] {
  --my-menu-gap: 8px;
}`}</code></pre>
      <p>
        팝업은 조상 DOM 밖으로 이동해서 렌더링되기 때문에 감싸는 요소의 스타일이
        닿지 않는데, 팝업 자신에게 값이 찍혀 있어서 같은 밀도 정보를 그대로 사용할
        수 있어요.
      </p>

      <h2>CSS가 실제 값을 그려요</h2>
      <p>
        Protean이 하는 일은 실제 픽셀 값을 계속 계산하는 게 아니에요. 예를 들어
        화면이 줄어들 때:
      </p>
      <pre><code>{`radius: 32px
→ 27.4px
→ 24.8px`}</code></pre>
      <p>
        처럼 JavaScript로 비례 계산하지 않아요. Protean은 어떤 밀도를 사용할지만
        선택해요. 그다음 실제 스타일과 부드러운 변화는 CSS가 담당해요. 예를 들어
        프로젝트에서 이렇게 만들 수 있어요.
      </p>
      <pre><code>{`[data-density="comfortable"] {
  --panel-pad-min: 12px;
  --panel-pad-max: 20px;
}

.panel {
  padding: clamp(
    var(--panel-pad-min),
    4cqi,
    var(--panel-pad-max)
  );
}`}</code></pre>
      <p>
        Protean은 <code>comfortable</code>이라는 의미 있는 상태를 선택하고, 그 범위
        안에서 실제 값이 어떻게 변할지는 CSS가 처리하는 식이에요. (예제의{' '}
        <code>--panel-pad-*</code>는 프로젝트가 정의하는 변수예요.)
      </p>

      <h2>밀도와 모양은 같은 문제가 아니에요</h2>
      <p>
        여기서 자연스럽게 이런 질문이 생길 수 있어요. 그러면 모서리 둥글기도{' '}
        <code>compact / comfortable / touch</code>처럼 별도 설정이 필요한가요?
        현재 Protean에서는 그렇게 보지 않아요. 예를 들어:
      </p>
      <pre><code>{`popover    → 둥근 모서리
sheet      → 위쪽 모서리만 둥글게
fullscreen → 모서리 없음`}</code></pre>
      <p>
        처럼 모양은 이미 <strong>선택된 UI 패턴</strong>에 따라 자연스럽게 결정돼요.
        같은 패턴 안에서 마우스 · 터치 · 사용자 설정 때문에 모양이 다시 갈리는
        실제 요구가 없기 때문에 별도의 shape 결정 기능을 만들지 않았어요. 단순한
        대응 관계라면 CSS token이 더 적절해요.
      </p>

      <h2>기본값이 마음에 들지 않으면 바꿀 수 있어요</h2>
      <p>
        <code>compact</code>, <code>comfortable</code>, <code>touch</code>라는
        이름은 Protean이 결정에 사용하는 공통 어휘예요. 하지만 실제 디자인 값까지
        Protean의 기본값을 그대로 사용할 필요는 없어요. 예를 들어 서비스 디자인
        시스템이:
      </p>
      <pre><code>{`comfortable row = 40px
touch row       = 48px`}</code></pre>
      <p>
        를 사용한다면 CSS token(<code>--protean-row</code>,{' '}
        <code>--protean-target</code>)을 그 값에 맞게 바꾸면 돼요. 또 사용자가 직접
        밀도를 선택하도록 만들고 싶다면 앱 상태와 연결할 수도 있어요. 구체적인
        방법은 <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>정리하면</h2>
      <p>밀도는 단순히 UI를 크게 만들거나 작게 만드는 기능이 아니에요.</p>
      <pre><code>{`입력 방식
사용자 설정
선택된 UI 패턴
필요한 경우 컨테이너 환경
        ↓
어떤 density를 사용할지 선택
        ↓
CSS가 실제 크기를 표현`}</code></pre>
      <p>
        앱 전체에서 단순히 터치 크기만 바꾸고 싶다면 CSS를 쓰면 돼요. 하지만 여러
        정보를 함께 보고 <strong>어떤 밀도를 사용할지 결정하고, 그 결과를 패턴
        선택과 계속 맞춰야 한다면</strong> Protean의 density가 그 연결을 맡아요.
      </p>
      <p>여기까지가 Protean의 두 핵심 개념이에요.</p>
      <ul>
        <li><strong>패턴 적응</strong> - 어떤 UI 패턴을 사용할지</li>
        <li><strong>밀도</strong> - 그 UI를 얼마나 촘촘하게 보여줄지</li>
      </ul>
      <p>
        다음부터는 실제 컴포넌트를 하나씩 살펴볼게요. 첫 번째는{' '}
        <Link href="/ko/components/dialog">Dialog</Link>예요. 기본 밀도를 서비스에
        맞게 변경하려면 <Link href="/ko/guides/customize-decisions">결과 맞춤
        설정</Link>을 보면 돼요.
      </p>
    </div>
  )
}
