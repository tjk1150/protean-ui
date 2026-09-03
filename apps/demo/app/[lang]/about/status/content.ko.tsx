import Link from 'next/link'

export default function StatusKo() {
  return (
    <div className="doc" lang="ko">
      <h1>지금 어디까지 믿고 써도 되나요?</h1>
      <p className="lede">
        수치와 지원 범위는 릴리스마다 변해요. 그래서 한 페이지에만 두고 날짜를
        박아요 - 다른 페이지의 숫자와 다르면 이 페이지가 맞아요. 이 페이지는 좋은
        결과만 나열하지 않고,{' '}
        <strong>자동화된 검증 · 수동 검증 · 아직 하지 않은 검증을 구분해서</strong>{' '}
        보여줘요.
      </p>
      <pre><code>{`기준일               2026-09-03
@protean-ui/react    0.1.0-alpha.9 (2026-09-02 배포)
상태                 pre-alpha
React                >= 18
라이선스             MIT`}</code></pre>
      <div className="callout">
        <strong>지금도 사용할 수 있지만 안정 버전처럼 취급하면 안 돼요.</strong>{' '}
        0.1.0 안정 릴리스 전이라 API가 예고 없이 바뀔 수 있어요. 실험이나 내부
        도구에서는 사용해볼 수 있고, 실제 서비스라면 버전을 고정하고 핵심 사용자
        흐름을 자체 테스트로 보호하는 편을 권장해요.
      </div>

      <h2>현재 검증 수준을 먼저 보면</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>영역</th><th>현재 상태</th></tr></thead>
          <tbody>
            <tr><td>기본 adaptive decision</td><td>72개 조합 전수 자동 테스트</td></tr>
            <tr><td>라이브러리 동작</td><td>245개 자동 테스트 (판단 엔진 123 + React 122)</td></tr>
            <tr><td>경계값 · 상태 전환 · 예외</td><td>자동 테스트</td></tr>
            <tr><td>실제 앱 이관</td><td>24개 화면, 기존 시나리오 699개 유지 (외부 저장소)</td></tr>
            <tr><td>번들 예산 · 서버 HTML 불변식</td><td>릴리스 게이트에서 자동 검사</td></tr>
            <tr><td>브라우저 호환성</td><td>Chrome + Apple Simulator 중심 수동 검증</td></tr>
            <tr><td>접근성</td><td>컴포넌트 계약 자동 테스트 + axe 수동 검사</td></tr>
            <tr><td>실제 screen reader matrix</td><td>아직 없음</td></tr>
            <tr><td>물리 기기 전체 검증</td><td>아직 없음</td></tr>
            <tr><td>자동화된 browser E2E · hydration 전용 테스트</td><td>아직 없음</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        즉 <strong>decision과 React 동작에 대한 자동 테스트는 강한 편이고, 실제
        브라우저 · 기기 · 보조 기술을 아우르는 검증은 아직 확장 중</strong>이에요.
      </p>

      <h2>기본 판단은 72개 조합을 전부 확인해요</h2>
      <p>
        기본 규칙은 대표 케이스 몇 개가 아니라{' '}
        <strong>72개 기본 조합 전체를 직접 assert</strong>해요 - 오버레이 3역할 ×
        3크기 × 3입력에 더해 내비게이션 · 주 행동 · 힌트 · 리스트-디테일 · 밀도의
        기본 결과까지요. <code>compact + touch + form → fullscreen</code> 같은
        개별 결과가 테스트 코드의 기대값으로 적혀 있어서, 정책을 바꾸면 표도
        의식적으로 함께 바꿔야 해요. adaptive UI에서는 조합 하나만 빠져도 예상하지
        못한 패턴이 나올 수 있어서 <strong>가능한 조합 자체를 테스트 데이터로
        취급</strong>해요.
      </p>
      <p>
        경계값도 따로 확인해요 - 크기 경계의 바로 앞뒤(599/600, 839/840), 떨림
        방지 전환의 양방향, 가상 키보드 임계값 같은 것들요. 그리고 상태 전환(열릴
        때 판단 고정, 재열림 재판단, live 전환의 DOM · 포커스 유지, 드로어 ·
        더보기 초기화, stack 포커스 이동)과 예외 입력(빠른 연속 클릭, 값이 목록에
        없는 Select, 측정 불가 Boundary, visualViewport 없는 환경)도 별도 테스트가
        담당해요. 숫자가 많다는 사실 자체를 품질 보증으로 쓰지 않아요 - 중요한 건{' '}
        <strong>어떤 위험을 어떤 테스트가 담당하는지</strong>예요.
      </p>

      <h2>실제 앱에도 이관해 봤어요</h2>
      <p>
        기존 앱의 <strong>24개 화면</strong>을 Protean 구조로 이관했고, 이관
        전부터 있던 <strong>699개 앱 시나리오 테스트가 이관 후에도 전부
        통과</strong>하는 것을 기준으로 삼았어요(기준일에 재실행해 699/699 확인).
        이 이관에서 application code는 152줄 순감소했는데, 모든 프로젝트에서 같은
        양이 줄어든다는 뜻이 아니라 &quot;분기를 제거했을 때 앱이 더 복잡해지지는
        않았는가&quot;를 확인한 한 사례의 결과예요.
      </p>
      <div className="callout">
        <strong>실앱 suite에는 중요한 제한이 있어요.</strong> 699개 시나리오는
        공개 저장소 밖의 별도 앱 저장소에 있어서, 공개 CI(push/PR)에서는 이 항목을
        건너뛰어요. 즉 245개 라이브러리 테스트는 공개 저장소에서 재현 가능하고,
        699개는 실제 이관 증거이지만 외부 suite예요.
      </div>

      <h2>변경할 때는 하나의 릴리스 게이트를 사용해요</h2>
      <p>
        저장소의 <code>pnpm gate</code> 한 명령이 라이브러리 테스트 · 워크스페이스
        타입체크 · 패키지 빌드 · 번들 예산 · 배포된 서버 HTML의 Overlay 불변식을
        자동으로 확인하고, 실패하면 발행이 차단돼요. GitHub push와 PR에서도 같은
        게이트가 실행돼요(외부 실앱 suite 제외). 발행 자체는 태그 푸시로 CI가
        수행하고 서명된 출처 증명이 자동으로 붙어요.
      </p>
      <p>
        다만 게이트 안에서도 모든 항목이 자동은 아니에요. 다음은 현재{' '}
        <strong>수동 확인 체크리스트</strong>로 남아 있어요: 데모 상태의 axe 검사,
        내비게이션 CLS 확인, 브라우저 · 시뮬레이터 호환성, 문서와 실제 API의
        일치. 수동 검증 결과와 자동 테스트 결과를 같은 것으로 표현하지 않아요 -
        예를 들어 한국어 문서는 이번 재작성으로 구현과 대조를 마쳤지만, 영어
        문서의 같은 수준 재작성은 아직 진행 전이에요.
      </p>

      <h2>테스트 방법에도 기준을 두고 있어요</h2>
      <p>
        무엇을 품질로 볼지는 ISO/IEC 25010의 품질 특성 분류를, 테스트 케이스
        설계는 ISO/IEC/IEEE 29119-4의 기법(결정 테이블 · 경계값 분석 · 동등 분할 ·
        상태 전이 · 예외 · 시나리오)을 참고해요.
      </p>
      <div className="callout">
        <strong>ISO 인증을 받았다는 뜻은 아니에요.</strong> 표준의 품질 모델과
        테스트 설계 기법을 QA 구조에 적용하고 있을 뿐, 외부 기관의 적합성 심사를
        통과했다고 주장하지 않아요.
      </div>

      <h2>번들 크기는 어느 정도인가요?</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>측정 대상</th><th>gzip (기준일 재측정)</th><th>게이트 예산</th></tr></thead>
          <tbody>
            <tr><td>React 전체 role</td><td>약 7.1KB</td><td>8KB 이하</td></tr>
            <tr><td>Dialog + Provider 대표 role</td><td>약 3.1KB</td><td>3.5KB 이하</td></tr>
            <tr><td>판단 엔진 (core)</td><td>약 1.3KB</td><td>2KB 이하</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        측정에서는 React · React DOM · Base UI · core를 external로 제외하고 CSS도
        포함하지 않아요. 따라서 &quot;설치하면 네트워크 비용이 정확히
        7.1KB&quot;라는 뜻이 아니라,{' '}
        <strong>Protean 적응 계층 자체가 커지는 것을 막는 릴리스 예산</strong>
        이에요.
      </p>

      <h2>React와 Base UI</h2>
      <p>
        공개 설치 계약은 <code>react / react-dom &gt;= 18</code>이고, 현재 기본
        개발 · CI 환경은 React 19예요. React 18과 19를 릴리스마다 별도 자동
        matrix로 전수 검증하는 구조는 아직 아니에요.
      </p>
      <p>
        <code>@base-ui/react ^1.7.0</code>은 dependency로 함께 설치돼요. Dialog ·
        Select · Menu의 기반 동작을 다시 구현하지 않고 검증된 primitive를
        이용하지만, Protean이 추가하는 판단 · 표현 연결 · 연속성 · DOM 계약은
        Protean 자체 테스트가 별도로 확인해요 - Base UI 사용이 곧 검증 완료라는
        뜻이 아니에요.
      </p>

      <h2>브라우저와 기기는 어디까지 확인했나요?</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>현재 수준</th></tr></thead>
          <tbody>
            <tr><td>Chrome (데스크톱)</td><td>릴리스마다 주요 상태 확인</td></tr>
            <tr><td>iPhone Safari</td><td>iPhone 16 Pro Simulator에서 확인</td></tr>
            <tr><td>iPadOS Safari</td><td>iPad Pro 11 Simulator에서 확인</td></tr>
            <tr><td>macOS Safari · Firefox</td><td>일부 표본 검사</td></tr>
            <tr><td>Android Chrome</td><td>전체 검증 대기</td></tr>
            <tr><td>실제 iPhone / iPad / Android 기기</td><td>전체 검증 대기</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Apple Simulator는 실제 WebKit 엔진을 사용하지만 물리 기기 테스트와 같은
        의미는 아니에요. 그리고 현재 테스트의 중심은 Vitest + Testing Library +
        jsdom과 수동 브라우저 확인이라, Playwright 같은{' '}
        <strong>브라우저 기반 자동 E2E suite는 아직 없어요.</strong> 브라우저별
        렌더링과 실제 포인터 동작에 대한 신뢰 수준은 순수 decision 테스트보다
        낮아요.
      </p>

      <h2>SSR은 어디까지 검증됐나요?</h2>
      <p>
        릴리스 게이트가 배포된 페이지의 서버 HTML에서 &quot;트리거는 존재하고,
        닫힌 Overlay 팝업 마크업은 0&quot;임을 자동으로 검사해요. 문서의{' '}
        <a href="/ssr-proof">/ssr-proof</a>에서도 같은 구조를 직접 확인할 수
        있어요. 하지만 <code>renderToString → hydrateRoot</code>를 브라우저
        수준에서 감시하는 hydration 전용 자동 테스트는 아직 없어요. 현재 검증은
        서버 markup 불변식 + 동일 DOM 구조 + 수동 실증에 기반하고, 내비게이션 CLS
        확인도 수동 체크리스트 항목이에요.
      </p>

      <h2>접근성은 어디까지 검증됐나요?</h2>
      <p>
        Dialog 포커스와 live 연속성, ListDetail stack 포커스 이동, ARIA 상태
        연결, native 의미, Tooltip의 role과 포커스 비강탈 같은 계약에는 자동
        테스트가 있어요. 데모 상태에는 axe 검사를 사용하고, 릴리스 기준은
        &quot;Protean이 새로 만드는 critical/serious 문제 0&quot;이에요 - 이건
        수동 릴리스 검증 항목이에요.
      </p>
      <p>
        하지만 VoiceOver · NVDA · JAWS · TalkBack을 실제 사용자 흐름 전체에서
        릴리스마다 확인하는 <strong>screen reader matrix는 아직 없고</strong>,
        WCAG 적합성 인증을 받은 프로젝트도 아니에요. Base UI 사용도 별도의 접근성
        인증을 의미하지 않아요. 책임 경계는{' '}
        <Link href="/ko/guides/accessibility">접근성</Link> 문서에 있어요.
      </p>

      <h2>현재 알고 있는 제한</h2>
      <ul>
        <li>
          <strong>태블릿에서 모든 패턴을 별도로 최적화하지는 않았어요.</strong>{' '}
          medium/expanded의 overlay · navigation · primaryAction 기본 규칙은
          touch와 pointer를 대부분 같은 결과로 처리하고, listDetail은 입력을 보지
          않아요(단 hint는 hover를, density는 입력을 계속 봐요). 실제 기기
          데이터가 쌓이기 전까지 추측성 기본 분기를 넣지 않은 상태예요.
        </li>
        <li>
          <strong>Boundary는 페이지 chrome을 다시 판단하지 않아요.</strong>{' '}
          컨테이너 폭 판단의 소비자는 Dialog · Select · Menu이고, Navigation ·
          PrimaryAction의 컨테이너 적응은 CSS container query 몫이에요.
        </li>
        <li>
          <strong>Boundary 폭을 계속 감시하지 않아요.</strong> ResizeObserver가
          없어서, <code>continuity=&quot;live&quot;</code>여도 Boundary 폭만
          바뀌는 경우의 자동 재판단은 보장하지 않아요.
        </li>
        <li>
          <strong>시트 위치 잡기에는 upstream 구현 제약이 있어요.</strong> 현재
          시트는 기반 floating positioner를 CSS로 고정해 사용해요 - 동작은
          테스트하고 있지만 pre-alpha의 알려진 기술 제한이에요.
        </li>
        <li>
          <strong>물리 기기 · 자동 browser E2E · hydration E2E · screen reader
          matrix가 아직 부족해요.</strong> 위 표들의 &quot;아직 없음&quot; 항목
          그대로예요.
        </li>
        <li>
          <strong>배포된 어댑터는 React뿐이에요.</strong> core 판단 엔진은
          DOM 독립이지만 Vue · Svelte용 완성 어댑터는 배포돼 있지 않아요.
        </li>
      </ul>
      <p>
        pre-alpha에서 중요한 건 제한이 없는 척하는 게 아니라 무엇이 자동
        테스트됐고, 무엇이 수동이고, 무엇은 아직인지 구분하는 거예요. 검증이
        추가되거나 제한이 해결되면 이 페이지도 릴리스와 함께 갱신해요.
      </p>

      <h2>버전과 호환성</h2>
      <p>
        네 패키지(<code>protean-ui</code> · <code>@protean-ui/react</code> ·{' '}
        <code>@protean-ui/core</code> · <code>@protean-ui/css</code>)는 함께
        버전이 올라가요. pre-alpha 기간에 실제 서비스에서 쓴다면 lockfile을
        커밋하고, 업데이트 전에{' '}
        <a href="https://github.com/tjk1150/protean-ui/blob/main/CHANGELOG.md">
          CHANGELOG
        </a>
        를 확인하고, 핵심 adaptive 흐름을 자체 회귀 테스트로 보호하는 것을
        권장해요.
      </p>

      <h2>버그나 제안은 어디에 남기나요?</h2>
      <p>
        버그 · 기능 제안 · 문서 문제는{' '}
        <a href="https://github.com/tjk1150/protean-ui/issues">GitHub Issues</a>
        로 알려주세요. React 버전, 브라우저, viewport, 입력 방식, 사용한 형태와
        재현 코드를 함께 남겨주시면 특히 도움이 돼요. 일반 Issue에 대한 별도 응답
        시간을 보장하지는 않아요.
      </p>
      <div className="callout">
        <strong>보안 문제는 공개 Issue로 올리지 마세요.</strong> GitHub의 Security
        Advisory를 통해 비공개로 알려주세요. 보안 보고에는 일주일 안에 첫 응답을
        목표로 해요.
      </div>

      <h2>지금 도입할지 판단한다면</h2>
      <p>
        adaptive 분기가 실제로 반복되고 있고, pre-alpha 변경을 받아들일 수 있고,
        핵심 흐름을 자체 테스트로 보호할 수 있다면 지금부터 평가하거나 일부에
        적용해볼 수 있어요. 반대로 API 안정성, 물리 기기 matrix, 자동 browser E2E
        증거, screen reader별 검증, React 외 공식 어댑터가 필수라면 위의 현재
        상태를 보고 결정해 주세요 - 그 수준에 도달했다고 미리 주장하지 않아요.
      </p>

      <h2>정리하면</h2>
      <pre><code>{`강하게 검증된 것    → decision · 경계값 · lifecycle · React DOM/focus 계약
실앱으로 확인한 것  → 24개 화면 · 699개 기존 테스트 유지
아직 확대해야 할 것 → 물리 기기 · browser E2E · hydration E2E · screen reader`}</code></pre>
      <p>
        <strong>테스트 숫자보다 중요한 건 무엇을 테스트했고, 무엇은 아직
        테스트하지 않았는지예요.</strong> 이 페이지의 목표는 &quot;몇 개니까
        안전해요&quot;가 아니라, 사용자가 직접 도입 수준을 판단할 수 있게 하는
        거예요. 다음은{' '}
        <Link href="/ko/about/why">왜 만들었나요</Link>예요.
      </p>
    </div>
  )
}
