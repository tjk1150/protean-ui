import Link from 'next/link'

export default function DensityKo() {
  return (
    <div className="doc" lang="ko">
      <h1>밀도</h1>
      <p className="lede">
        같은 UI라도 마우스에게는 아늑하게, 손가락에게는 넉넉하게가 맞아요. Protean은
        이걸 <strong>밀도 프로필</strong> 세 단계로 다뤄요 - compact · comfortable ·
        touch. 픽셀을 계산하는 게 아니라 <strong>어떤 밀도를 쓸지 결정</strong>하고,
        값은 토큰이, 렌더링은 CSS가 맡아요.
      </p>

      <div className="callout">
        <strong>protean이 필요 없는 경우부터 말할게요.</strong> 화면 크기나 포인터
        종류만 보고 앱 전역 밀도를 바꾸는 거라면, CSS 세 줄이 정답이에요:
        <pre><code>{`:root { --target: 40px; }
@media (pointer: coarse) { :root { --target: 48px; } }`}</code></pre>
        CSS는 렌더링을 아주 잘해요. protean이 맡는 건 CSS가 볼 수 없는 입력 -
        사용자 설정, 패턴 결정, 컨테이너 문맥 - 으로 <strong>어떤 밀도를 선택할지</strong>
        정하는 일이에요.
      </div>

      <h2>밀도는 이렇게 정해져요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>입력</th><th>결과</th><th>누가</th></tr></thead>
          <tbody>
            <tr><td>정밀한 포인터</td><td>comfortable</td><td>CSS 미디어쿼리 - JavaScript 0</td></tr>
            <tr><td>터치</td><td>touch</td><td>CSS 미디어쿼리 - JavaScript 0</td></tr>
            <tr><td>시트로 열림</td><td>언제나 touch</td><td>패턴 결합 - 프로필이 뭐든 시트는 엄지 표면이에요</td></tr>
            <tr><td>사용자 설정</td><td>전체 오버라이드</td><td><code>&lt;ProteanProvider density=&quot;compact&quot;&gt;</code></td></tr>
            <tr><td>compact</td><td>명시 선택으로만</td><td>기본 규칙은 절대 추측하지 않아요</td></tr>
          </tbody>
        </table>
      </div>

      <h2>사용자 밀도 설정 - 이게 핵심 사용처예요</h2>
      <p>
        Gmail의 &quot;기본/보통/간결&quot;처럼, 밀도는 실제 제품에서 사용자 옵션이에요.
        미디어쿼리는 앱 상태를 읽을 수 없으니 여기부터 protean의 일이에요:
      </p>
      <pre><code>{`const [density, setDensity] = useState()   // 사용자 설정 (저장은 여러분 몫)

<ProteanProvider density={density}>
  <div data-density={density}>             {/* 정적 콘텐츠용 스탬프 한 줄 */}
    <App />
  </div>
</ProteanProvider>`}</code></pre>
      <p>
        팝업(다이얼로그, 메뉴, 셀렉트, 툴팁)은 포털로 떠서 조상 스탬프가 닿지
        않아요. 그래서 <strong>컴포넌트가 자기 팝업에 <code>data-density</code>를 직접
        찍어요</strong> - <code>data-presentation</code>과 똑같은 계약이에요. 여러분이
        할 일은 없어요.
      </p>

      <h2>토큰이 반응해요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>토큰</th><th>compact</th><th>comfortable</th><th>touch</th></tr></thead>
          <tbody>
            <tr><td><code>--protean-target</code> (탭 타깃)</td><td>32px</td><td>40px</td><td>48px</td></tr>
            <tr><td><code>--protean-row</code> (행 높이)</td><td>28px</td><td>36px</td><td>44px</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        참조 크롬의 메뉴 행, 셀렉트 행, 액션 버튼이 이 토큰을 소비해요 - 그래서
        데스크톱 마우스에서는 메뉴가 데스크톱답게 촘촘하고, 터치에서는 넉넉해요.
        여러분의 컴포넌트도 같은 토큰을 소비하면 앱 전체가 한 몸으로 움직여요.
      </p>

      <h2>끝점은 정책이, 여행은 CSS가</h2>
      <p>
        연속적으로 부드럽게 변하는 값이 필요하면, protean이 의미 있는 양 끝점을
        토큰으로 주고 그 사이는 CSS가 컨테이너 폭 기준으로 보간하게 하세요 - 측정도
        리렌더도 없어요:
      </p>
      <pre><code>{`.my-panel {
  padding: clamp(8px, 3cqi, var(--protean-target));
}`}</code></pre>

      <h2>왜 비례 축소가 아니라 단계인가요?</h2>
      <p>
        &quot;카드가 20% 작아졌으니 radius도 20% 줄이자&quot;는 어떤 디자이너도 고른 적
        없는 값(25.6px 같은)을 만들어요. Material의 shape·density 시스템도 이산
        단계예요. 작은 화면에서 어색해지는 순간의 정답은 값의 보간이 아니라{' '}
        <strong>패턴이 바뀌거나</strong>(카드 → 리스트 행) <strong>밀도 단계가
        내려가는 것</strong>이고, 그 두 결정이 정확히 protean의 일이에요.
      </p>

      <p>
        직접 만져보려면 <Link href="/density-spike">밀도 데모</Link>에서 두 구현(protean
        vs 수제)을 나란히 비교해 보세요. 판정 근거는{' '}
        <code>explain()</code>이 말해줘요: <code>density -&gt; compact [instance]</code>.
      </p>
    </div>
  )
}
