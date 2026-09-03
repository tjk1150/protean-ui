import Link from 'next/link'

export default function WhyKo() {
  return (
    <div className="doc" lang="ko">
      <h1>왜 만들었나요</h1>
      <p className="lede">
        웹에서 반응형 UI를 만들다 보면 처음에는 CSS만 작성하면 돼요. 한 줄을 두
        줄로 바꾸고, 두 열을 한 열로 바꾸고, 간격을 줄이는 건 CSS가 아주 잘해요.
        그런데 어느 순간 조금 다른 문제가 생겨요.
      </p>

      <h2>레이아웃이 아니라 UI 자체가 달라지는 순간</h2>
      <p>같은 선택 기능이 환경에 따라 이렇게 달라져야 할 수 있어요.</p>
      <pre><code>{`넓은 화면 + 마우스  → Dropdown
작은 화면 + 터치    → Bottom Sheet`}</code></pre>
      <p>
        같은 Dialog도 넓은 화면에서는 모달이, 작은 터치 화면에서는 전체 화면이나
        시트가 더 자연스러울 수 있고, Navigation도 사이드바 · 레일 · 드로어 ·
        하단 바처럼 환경에 따라 적절한 패턴이 달라져요. 이건 단순히 width를
        줄이는 것과는 조금 다른 문제예요.{' '}
        <strong>같은 기능을 어떤 UI 패턴으로 표현할지 선택하는 문제</strong>예요.
      </p>

      <h2>웹에서는 이 판단이 앱 코드로 흩어지기 쉬웠어요</h2>
      <pre><code>{`if (isSmallScreen && isTouchDevice) {
  return <BottomSheet />;
}
return <Popover />;`}</code></pre>
      <p>
        한 화면에서는 별문제가 없어 보여요. 하지만 같은 판단이 Dialog · Select ·
        Menu · Navigation · Primary Action · List + Detail 곳곳에 생기기 시작하면
        문제가 달라져요. UI를 두 벌 만들면 상태 · 포커스 · 키보드 · 닫힘 · ARIA ·
        폼 값까지 두 구현 사이에서 맞춰야 해요. 반응형 문제였던 것이 점점
        애플리케이션 구조의 중복이 돼요. Protean이 해결하고 싶었던 건 이
        지점이에요.
      </p>
      <p>
        그래서 질문을 바꿔봤어요. &quot;모바일에서는 어떤 컴포넌트를 렌더링해야
        할까?&quot;가 아니라{' '}
        <strong>&quot;이 기능은 지금 어떤 presentation으로 보여주는 게
        자연스러울까?&quot;</strong>로요. 앱은{' '}
        <code>&lt;Dialog.Root role=&quot;form&quot;&gt;</code>이라고 기능의
        의미를 알려주고, Protean이 현재 환경과 정책을 보고 결과를 선택해요. 앱이
        모바일용 Dialog와 데스크톱용 Dialog를 각각 소유하지 않아도 돼요.
      </p>

      <h2>영감을 준 건 Android의 모양이 아니라 사고방식이었어요</h2>
      <p>
        이 문제를 생각할 때 Android · Material · Jetpack Compose의 adaptive UI가
        중요한 참고가 됐어요. 네이티브 UI에서는 화면 크기와 기기 형태가 달라질 때
        같은 역할이 Navigation Bar → Rail → Drawer처럼, 또 List + Detail이나
        Supporting Pane처럼 <strong>다른 구조로 표현되는 경우를 명시적으로
        다뤄요.</strong> Protean의 compact / medium / expanded와 600 / 840
        임계값도 Android의 window size class 관습에서 왔어요.
      </p>
      <p>
        가져오고 싶었던 건 Material의 색상이나 컴포넌트 디자인이 아니라 이런
        질문이었어요 - 이 UI의 역할은 무엇인가? 현재 사용할 수 있는 공간과 입력
        방식은 무엇인가? 그 환경에서 같은 역할을 어떤 패턴으로 표현하는 게
        좋은가? 즉 &quot;모바일 디자인을 웹에 복사하자&quot;가 아니라{' '}
        <strong>&quot;웹에서도 adaptive presentation을 앱 코드의 우연한 분기가
        아니라 하나의 명시적인 결정으로 다룰 수 없을까?&quot;</strong>가
        출발점이었어요.
      </p>
      <div className="callout">
        Material이 <strong>번들</strong>(패턴 + 시각 언어 전체)로 이룬 것을,
        브랜드를 가진 웹 팀들 사이에서는 <strong>언번들</strong>로 이뤄야 해요.
        행동과 접근성은 이미 검증된 primitive들이 해결했고, 시각 언어는 각 팀의
        것이에요. 비어 있던 칸은 <strong>패턴 결정</strong>이었고, Protean은 그
        칸을 채워요.
      </div>

      <h2>그렇다고 네이티브 구조를 그대로 웹에 옮기지는 않았어요</h2>
      <p>
        웹에는 이미 아주 강력한 도구가 있어요 - media query, container query,
        Grid, Flexbox, custom properties. 네이티브에서 adaptive 개념을 봤다고
        모든 반응형 처리를 JavaScript runtime으로 옮기는 건 오히려 이상했어요.
        여기서 Protean의 가장 중요한 책임 경계가 만들어졌어요.
      </p>
      <pre><code>{`2열 → 1열, gap 변화, padding, radius 표현
→ CSS가 잘하니 계속 CSS에

Popover인가 Sheet인가? Sidebar인가 Bottom Bar인가?
Tooltip을 hover로 열 수 있는가?
→ 서로 다른 패턴 중 하나를 골라야 하는 지점
→ 의미 있는 결정으로 분리`}</code></pre>
      <p>
        만들면서 가장 유용했던 기준 중 하나는{' '}
        <strong>&quot;끝점은 결정하고, 그 사이는 CSS가 움직인다&quot;</strong>
        였어요. Popover인지 Sheet인지는 이산적인 결정이지만, 선택된 패턴 안에서
        폭 · 여백 · 모서리 · 애니메이션이 변하는 과정까지 정책이 소유할 이유는
        없어요. 그건 CSS가 더 잘해요.
      </p>

      <h2>Shape도 처음에는 별도 적응 영역을 검토했어요</h2>
      <p>
        초기에는 shape도 환경에 따라 별도로 결정할 수 있지 않을까 검토했어요 -
        compact에서는 더 작은 shape, touch에서는 더 큰 radius처럼요. 하지만 실제
        컴포넌트들을 대입해보니 다른 결론이 나왔어요. Dialog가 modal · sheet ·
        fullscreen으로 결정된 뒤에는 적절한 shape도 이미 상당 부분 정해져
        있었어요 - 모달은 카드 형태, 시트는 위쪽 모서리 중심, 전체 화면은 화면
        경계에 맞는 형태.
      </p>
      <pre><code>{`[data-presentation="sheet"] {
  --protean-shape: ...;
}`}</code></pre>
      <p>
        별도의 JavaScript 결정을 하나 더 만드는 것보다 presentation 결과를 CSS가
        표현하는 편이 더 단순했어요. 그래서 현재 shape는 별도 결정 영역으로 넣지
        않았어요.
      </p>
      <p>
        이 결정이 중요한 이유가 있어요. 추가할 수 있다는 이유만으로 결정 영역을
        늘리면 shape · spacing · elevation · motion까지 모든 디자인 값을 runtime이
        판단하게 되고, Protean은 다시 거대한 반응형 프레임워크가 돼요. Shape
        실험은 오히려 <strong>무엇을 Protean에 넣지 말아야 하는가</strong>를
        정하는 계기가 됐어요.
      </p>

      <h2>Density는 반대로 남았어요</h2>
      <p>
        Density도 처음에는 단순한 CSS 크기 차이처럼 볼 수 있어요. 하지만 같은
        Select라도 정밀한 포인터에서는 더 조밀하게, 손가락에서는 더 넓은 target이
        필요하다는 <strong>사용 방식 자체와 연결된 profile 차이</strong>가
        있었고, 사용자가 직접 compact · comfortable · touch를 선택할 수도
        있었어요. 그래서 Density는 독립적인 결정 영역으로 남았어요 - 물론 실제
        시각 값은 여기서도 CSS token이 표현해요.
      </p>
      <p>
        결국 기준은 &quot;환경에 따라 변하느냐&quot;가 아니었어요.{' '}
        <strong>&quot;이 변화가 별도의 의미 있는 선택인가?&quot;</strong>였어요.
        같은 기능에 서로 다른 패턴이 필요하고, 환경 신호를 여러 개 봐야 하고,
        분기가 여러 화면에서 반복되고, 두 구현 사이에서 상태 · focus ·
        semantics를 유지해야 할수록 Protean이 맡을 가치가 커져요. 값이 연속적으로
        변하거나 순수한 레이아웃 문제라면 CSS가 더 적절해요.
      </p>

      <h2>그래서 width만 보지 않아요</h2>
      <p>
        같은 500px이라도 좁게 만든 데스크톱 브라우저 + 마우스와 스마트폰 +
        손가락은 같은 UI가 가장 편하다고 단정하기 어려워요. width 하나만으로 모든
        adaptive 패턴을 설명하기에는 부족한 경우가 있어서, Protean은 size ·
        input · hover · reducedMotion · virtualKeyboard처럼{' '}
        <strong>UI 결정에 직접 의미가 있는 환경 정보만</strong> 수집해요. 기기
        이름을 맞히는 게 목적이 아니에요.
      </p>
      <p>
        그래도 모든 컴포넌트가 모든 정보를 보지는 않아요. Tooltip에서 중요한 건
        화면 크기보다 hover 가능 여부이고, ListDetail의 기본 판단에는 입력이
        필요하지 않아요. 각 UI 역할에 실제로 필요한 정보만 사용해요. 그리고
        환경만큼 역할도 중요했어요 - 같은 compact + touch라도 짧은 확인과 긴 입력
        폼이 같은 결과여야 할 이유는 없으니까요. Protean의 결정은 단순한
        device → UI 매핑이 아니라, 개념적으로{' '}
        <strong>환경 + 기능의 역할 → presentation</strong>에 가까워요.
      </p>

      <h2>각 계층이 자신이 아는 것만 소유해요</h2>
      <p>
        이 구조 덕분에 앱은 의미를 소유해요 -{' '}
        <code>role=&quot;form&quot;</code>, <code>current</code>,{' '}
        <code>detailActive</code>처럼요. Protean이 비즈니스 상태를 추측하지 않고,
        CSS도 비즈니스 의미를 추측하지 않아요. 같은 이유로:
      </p>
      <ul>
        <li>
          <strong>Headless에 가깝게</strong> - adaptive 결정을 해결하면서 특정
          브랜드 디자인까지 강제하고 싶지 않았어요. Protean은 결정 · 상호작용
          연결 · DOM 상태 · CSS token 계약을 제공하고, 시각 언어는 프로젝트가
          소유해요. reference.css는 이 계약을 바로 확인하기 위한 선택적 참고
          구현이에요.
        </li>
        <li>
          <strong>Base UI 위에서</strong> - Dialog의 포커스 관리나 Menu의 키보드
          탐색을 처음부터 다시 만드는 건 목표가 아니었어요. 검증된 primitive가
          해결한 상호작용은 활용하고, Protean은 &quot;지금 어떤 presentation을
          사용할 것인가&quot;와 그 사이의 연결에 집중해요.
        </li>
        <li>
          <strong>서버가 몰라도 되는 구조로</strong> - 서버는 실제 viewport를
          몰라요. 더 정교한 기기 추측기 대신, 나중에 여는 UI는 열 때 결정하고,
          처음부터 보이는 UI는 같은 DOM + CSS로, Tooltip은 mount 뒤에 연결하는
          구조를 선택했어요. 정보가 없는 계층에게 억지로 결정을 맡기지 않아요.
        </li>
        <li>
          <strong>컨테이너도 작은 브라우저로 만들지 않고</strong> - Boundary가
          실제로 아는 건 컨테이너의 폭뿐이라 size만 바꿔 사용해요. 단순 컨테이너
          레이아웃은 여전히 CSS container query가 담당해요.
        </li>
      </ul>
      <pre><code>{`애플리케이션        → 기능의 의미와 상태
Protean            → 환경에 맞는 패턴과 밀도 결정
기반 primitive      → interaction behavior
CSS / 디자인 시스템 → 실제 레이아웃과 시각 표현`}</code></pre>
      <p>
        어느 한 계층이 모든 걸 소유하지 않아요. Protean은 그중 adaptive
        decision이 비어 있던 자리를 채우려고 만든 작은 레이어예요.
      </p>

      <h2>앞으로도 모든 adaptive 아이디어를 넣지는 않을 거예요</h2>
      <p>
        새 기능을 추가할 때 &quot;환경에 따라 달라지니까 넣자&quot;만으로는
        충분하지 않아요. 실제로 서로 다른 UI 패턴인가, 앱마다 같은 분기가
        반복되는가, 여러 환경 신호를 조합해야 하는가, 상태 · focus · semantics
        연결이 필요한가, CSS가 처리하는 편이 더 단순하지 않은가 - 이 질문을
        통과하지 못하면 Protean 밖에 남기는 편이 좋아요.{' '}
        <strong>기능을 추가하는 것만큼 추가하지 않을 이유를 찾는 것도
        중요해요.</strong> 작은 라이브러리로 남는 것도 목표예요.
      </p>

      <h2>처음 문제로 돌아가면</h2>
      <p>
        <code>isMobile ? &lt;MobileSomething /&gt; : &lt;DesktopSomething /&gt;</code>{' '}
        한 줄 자체가 나쁜 건 아니에요. 문제는 같은 질문이 제품 전체에서 반복되고,
        그 뒤에 상태 · focus · semantics · density · CSS까지 두 갈래로 갈라질 때
        생겨요. Protean은 그 반복을 <code>&lt;Something role=&quot;...&quot; /&gt;</code>
        와 하나의 공통 policy로 모을 수 있는지 실험하는 프로젝트예요.
      </p>

      <h2>정리하면</h2>
      <p>
        Protean UI는 네이티브 UI를 웹에 복사하기 위해 만든 라이브러리가 아니에요.
        Android와 Material의 adaptive UI에서 받은 가장 큰 영감은{' '}
        <strong>화면을 줄이는 것과 UI 패턴을 바꾸는 것은 다른 문제일 수
        있다</strong>는 점이었고, 웹에 맞게 다시 생각하면서 지금의 경계가
        만들어졌어요.
      </p>
      <pre><code>{`패턴을 선택해야 한다              → Protean
연속적인 레이아웃과 모양을 표현한다 → CSS
기능의 의미와 상태를 안다          → 애플리케이션
상호작용을 이미 잘 해결한다        → primitive를 다시 만들지 않는다`}</code></pre>
      <p>
        <strong>Protean은 CSS가 못해서 만든 게 아니라, CSS와는 다른 종류의
        결정을 앱 코드에서 분리하기 위해 만들었어요.</strong> 현재 어디까지
        검증됐는지는 <Link href="/ko/about/status">품질과 지원</Link>에 있어요.
      </p>
      <p>
        그래서 Protean이 답하려는 질문은 결국 하나예요.{' '}
        <strong>같은 기능을 환경마다 다시 만들지 않고도, 그 환경에 자연스러운
        UI로 보여줄 수 있을까?</strong>
      </p>
    </div>
  )
}
