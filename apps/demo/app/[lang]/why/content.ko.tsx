import Link from 'next/link'

export default function WhyKo() {
  return (
    <div className="doc" lang="ko">
      <h1>왜 만들었나요</h1>
      <p className="lede">
        안드로이드 앱은 왜 전부 봐줄 만하게 나올까요? 평범한 개발자가 만들어도요. 그
        이유를 분해해 보면, 웹 개발자가 어디서 고생하고 있는지 — 그리고 Protean이 그중
        정확히 어느 조각인지가 보여요.
      </p>

      <h2>차이는 감각이 아니라 구조예요</h2>
      <p>
        안드로이드와 웹의 차이는 개발자의 미적 감각이 아니에요.{' '}
        <strong>선택지를 누가 소유하느냐</strong>의 차이예요. 안드로이드는 플랫폼이
        결정을 소유하고 개발자에게 &quot;의미&quot;만 고르게 해요. 웹은 모든 결정을
        개발자에게 던져요. 그리고 결정 지점 하나하나가, 평범한 개발자가 일관성에서
        이탈하는 지점이 돼요. 구체적으로 다섯 가지 장치가 일해요.
      </p>

      <h3>1. 기본값이 곧 정답이에요</h3>
      <p>
        Compose에서 <code>Button(onClick) &#123; Text(&quot;확인&quot;) &#125;</code>을
        쓰면, 스타일 결정을 하나도 안 내렸는데 결과물에 이미 다 들어 있어요. 최소 48dp
        터치 타깃, 올바른 패딩, 테마의 모서리, 맞는 글자 크기, 대비가 보장된 색, 눌림
        피드백, 비활성 상태까지요. 웹에서 <code>&lt;button&gt;확인&lt;/button&gt;</code>은
        1995년의 회색 버튼이고요. 안드로이드는 &quot;노력 0&quot;과 &quot;봐줄
        만함&quot; 사이 거리가 0이에요. 웹은 그 거리가 수백 개의 선택이에요.
      </p>

      <h3>2. 값을 고르지 않고 역할을 골라요</h3>
      <p>
        Material 개발자는 <code>#3F51B5</code>를 쓰지 않고{' '}
        <code>colorScheme.primary</code>를 써요. 색은 역할 쌍으로 존재해서
        (<code>primary</code>가 있으면 반드시 <code>onPrimary</code>가 있어요) 글자
        대비가 검수 항목이 아니라 구조적 보장이에요. 글자 크기는 15개 역할, 모서리는
        5단계뿐이라 폰트 크기가 37가지인 앱은 구조적으로 나올 수 없어요. 웹에서
        shadcn/ui가 폭발한 진짜 이유도 컴포넌트가 아니라{' '}
        <code>--background</code>, <code>--primary</code> 같은 역할 토큰을 사실상
        표준화한 것이었어요. 웹 개발자들도 이 층에 굶주려 있다는 증거예요.
      </p>

      <h3>3. 패턴이 곧 컴포넌트예요</h3>
      <p>
        <code>Scaffold</code>, <code>NavigationBar</code>,{' '}
        <code>ModalBottomSheet</code> — 안드로이드 개발자는 UX 패턴을 조립하지, div에서
        발명하지 않아요.
      </p>

      <h3>4. 환경 적응이 프레임워크 소관이에요</h3>
      <p>
        <code>WindowSizeClass</code>가 화면을 compact · medium · expanded로 나누고
        (Protean의 600/840 임계값이 여기서 왔어요),{' '}
        <code>NavigationSuiteScaffold</code>는 창 크기에 따라 하단 바 · 레일 · 서랍을
        알아서 오가요. &quot;태블릿이면 레일&quot; 같은 분기를 앱 코드에 쓰지 않아요.
      </p>

      <h3>5. 일탈이 순응보다 어려워요</h3>
      <p>
        48dp 최소 터치 타깃은 컴포넌트가 자동으로 지켜 주고, 간격 그리드는 컴포넌트
        패딩에 박혀 있어요. 규율이 문서가 아니라 코드예요. 어기려면 오히려 노력이
        필요해요. 웹은 반대죠. 지키려면 노력이 필요해요.
      </p>

      <h2>그런데 웹에서는 번들이 실패해요</h2>
      <p>
        여기까지 보면 답이 &quot;웹에도 Material을 만들자&quot;처럼 들려요. 하지만 그건
        여러 번 시도됐고, 항상 같은 벽에 부딪혔어요. Material의 &quot;모두 보기
        좋음&quot;은 시각 언어까지 통째로 강제하는 <strong>번들</strong>의 결과인데,
        웹에서 브랜드를 가진 팀은 남의 시각 언어를 받아들이지 않아요. MUI를 쓰면
        &quot;Material처럼 보이는&quot; 대가를 치르고, 회사 디자인 시스템의 적응형
        컴포넌트는 그 회사 밖에서 쓸 수 없어요.
      </p>
      <p>
        그래서 웹에서 같은 결과를 내려면 <strong>언번들</strong>해야 해요. 다섯 장치 중
        보편적인 것과 팀 고유의 것을 분리하는 거예요.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>층</th><th>안드로이드</th><th>웹의 현재</th></tr></thead>
          <tbody>
            <tr><td>행동과 접근성 (포커스, 제스처, ARIA)</td><td>컴포넌트 내장</td><td>해결됨 — Base UI, Radix, React Aria</td></tr>
            <tr><td>패턴 결정 (환경 → UX 패턴)</td><td>WindowSizeClass, NavigationSuite</td><td><strong>빈칸 — Protean이 만드는 것</strong></td></tr>
            <tr><td>역할 토큰 (값이 아닌 의미)</td><td>Material 토큰</td><td>표준 없음 — shadcn 관습이 근접</td></tr>
            <tr><td>파라메트릭 규율 (타깃, 간격, 안전 영역)</td><td>컴포넌트 내장</td><td>빈칸 — 참고 스타일시트가 시연</td></tr>
            <tr><td>시각 언어 (색, 모양, 브랜드)</td><td>Material로 강제</td><td><strong>각 팀의 것 — 여기는 비워 두는 게 맞아요</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Protean은 이 표에서 비어 있으면서 동시에 보편화할 수 있는 칸 —{' '}
        <strong>패턴 결정</strong> — 을 채워요. 행동은 Base UI에 맡기고, 시각 언어는
        여러분에게 남겨요. 참고 스타일시트는 &quot;아무것도 안 하면 봐줄 만한
        기본&quot;을 주되 언제든 갈아끼울 수 있는, 다섯 번째 줄을 침범하지 않는
        기본값이에요.
      </p>

      <h2>한 문장으로 하면</h2>
      <div className="callout">
        Material이 번들로 이룬 것을, 웹에서는 언번들로 이뤄야 해요. 웹 개발자가
        고생하는 건 감각이 없어서가 아니라, 플랫폼이 소유해야 할 결정들이 전부 앱
        코드에 떠넘겨져 있기 때문이에요. Protean은 그중 패턴 결정을 회수해요.
      </div>
      <p>
        이 구조가 코드로 어떻게 구현됐는지는{' '}
        <Link href="/ko/concepts/design-principles">설계 원리</Link>에서, 10분 만에
        직접 써 보는 방법은 <Link href="/ko/getting-started">시작하기</Link>에서 볼 수
        있어요.
      </p>
    </div>
  )
}
