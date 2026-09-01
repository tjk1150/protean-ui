export default function TraitsAndPolicyKo() {
  return (
    <div className="doc" lang="ko">
      <h1>판단 기준과 규칙</h1>
      <p className="lede">
        Protean의 모든 동작은 한 줄로 요약돼요. <strong>환경을 읽어서 판단 기준으로
        정리하고, 규칙에 대입해서, 보여줄 모습을 정한다.</strong> 이 페이지에서는 그 세
        단계를 하나씩 살펴봐요.
      </p>

      <h2>판단 기준(트레이트)이 뭔가요?</h2>
      <p>
        트레이트(trait)는 지금 사용 환경을 몇 개의 이름으로 정리한 거예요. 앱 코드와
        규칙은 &quot;768px&quot; 같은 픽셀 숫자를 절대 보지 않아요. 픽셀은 분류기 안,
        딱 한 곳에만 있어요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>기준</th><th>값</th><th>이렇게 정해져요</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td>
              <td>compact (600px 미만) · medium (600~840px) · expanded (840px 초과)</td>
              <td>창 너비로 정해요. 안드로이드의 화면 크기 등급과 같은 기준이고, 숫자는 바꿀 수 있어요.</td>
            </tr>
            <tr>
              <td>input</td>
              <td>touch · pointer · hybrid</td>
              <td>터치인지 마우스인지, 브라우저의 <code>pointer</code>/<code>hover</code> 미디어 쿼리로 알아내요.</td>
            </tr>
            <tr>
              <td>그 외</td>
              <td>hover, reducedMotion, virtualKeyboard</td>
              <td>호버 가능 여부, 동작 줄이기 설정, 화면 키보드가 떠 있는지예요.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        경계 근처에서 창 크기를 미세하게 조절해도 UI가 파르르 떨리지 않도록, 등급이
        바뀌려면 경계를 16px 이상 넘어야 해요. 터치 노트북처럼 마우스와 터치가 둘 다
        되는 기기는 구조는 마우스 기준으로, 버튼 크기만 터치 기준으로 맞춰요.
      </p>

      <h2>왜 화면 크기와 입력 수단을 함께 보나요?</h2>
      <p>
        화면 폭만으로는 &quot;폰&quot;과 &quot;좁게 줄인 데스크톱 창&quot;을 구분할 수
        없어요. 그런데 두 사용자에게 자연스러운 UI는 달라요. 폰 사용자에게는 엄지로
        닿기 좋은 바텀 시트, 마우스 사용자에게는 작은 모달이죠. 폭만 보는 방식(널리
        쓰이는 수동 레시피 전부)은 이 둘을 같게 취급해요. Protean이 두 축을 보는 이유가
        바로 이거예요.
      </p>

      <h2>규칙(정책)은 어떻게 생겼나요?</h2>
      <p>규칙은 순수 함수예요. 같은 입력이면 언제나 같은 답이 나와요.</p>
      <pre><code>{`환경 측정값           -- 창 크기, 미디어 쿼리 등
      |
판단 기준으로 정리     -- 픽셀이 존재하는 유일한 곳
      |
규칙에 대입           -- (기준, 역할) => 보여줄 모습
      |
판단 결과             -- { presentation, 누가 정했는지, 당시 기준 }`}</code></pre>
      <p>
        판단 결과가 평범한 값이라는 점이 중요해요. 그래서 서버에서도 계산할 수 있고,
        단독으로 테스트할 수 있고, 콘솔에서 이유를 확인할 수 있어요.
      </p>

      <h2>기본 규칙: app-first</h2>
      <p>
        기본 규칙은 누군가의 취향이 아니라, iOS와 안드로이드 앱들이 이미 검증한 관습을
        옮긴 거예요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>역할</th><th>작은 화면 + 터치</th><th>그 외 환경</th></tr>
          </thead>
          <tbody>
            <tr><td>다이얼로그: confirmation (확인)</td><td>바텀 시트</td><td>모달</td></tr>
            <tr><td>다이얼로그: form (입력 폼)</td><td>전체 화면</td><td>모달</td></tr>
            <tr><td>다이얼로그: contextual (맥락 메뉴)</td><td>바텀 시트</td><td>팝오버</td></tr>
            <tr><td>내비게이션</td><td>하단 탭 바 (마우스면 서랍)</td><td>medium은 레일, expanded는 사이드바</td></tr>
            <tr><td>주 행동 버튼</td><td>하단 고정 바 (마우스면 하단 붙박이)</td><td>본문 속 제자리</td></tr>
          </tbody>
        </table>
      </div>

      <h2>규칙을 바꾸는 세 가지 방법</h2>
      <p>가까운 것이 이겨요. 셋 다 픽셀이 아니라 기준 이름으로 말해요.</p>
      <ol>
        <li>
          <strong>이 컴포넌트 하나만:</strong>{' '}
          <code>presentation=&quot;sheet&quot;</code> 또는{' '}
          <code>presentation=&#123;&#123; compact: &quot;fullscreen&quot; &#125;&#125;</code>
        </li>
        <li>
          <strong>프로젝트 전체:</strong> <code>protean.config.ts</code>에서{' '}
          <code>definePolicy</code>로 기본 규칙을 덮어써요. <code>defaults()</code>를
          부르면 나머지는 기본 규칙에 맡길 수 있어요.
        </li>
        <li>
          <strong>규칙 묶음 자체를 교체:</strong> app-first 대신 다른 규칙 묶음을 만들어
          쓸 수 있어요.
        </li>
      </ol>
      <p>
        판단 결과에는 누가 정했는지(기본 규칙인지, 프로젝트 규칙인지, 컴포넌트
        지정인지)가 함께 기록돼요. 디버깅할 때 &quot;왜 시트로 열렸지?&quot;를 추측할
        필요가 없어요.
      </p>
    </div>
  )
}
