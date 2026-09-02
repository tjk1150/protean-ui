export default function StatusKo() {
  return (
    <div className="doc" lang="ko">
      <h1>품질·지원 상태</h1>
      <p className="lede">
        수치와 지원 범위는 릴리스마다 변해요. 그래서 한 페이지에만 두고 날짜를
        박아요 - 다른 페이지의 숫자와 다르면 이 페이지가 맞아요.
      </p>
      <div className="callout">
        <strong>기준: 2026-09-02, 0.1.0-alpha.9.</strong> pre-alpha라 API는 예고 없이
        바뀔 수 있어요.
      </div>

      <h2>이 날짜의 실측</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>항목</th><th>값</th></tr></thead>
          <tbody>
            <tr><td>라이브러리 테스트</td><td>245개 (판단 엔진 123 + React 122) - 전부 통과해야 발행돼요</td></tr>
            <tr><td>기본 규칙 전수 검증</td><td>72칸 결정 테이블 - 3크기 x 3입력에 대해 오버레이 3역할 · 내비게이션 · 주 행동 · 힌트 · 리스트-디테일 · 밀도</td></tr>
            <tr><td>실제 앱 시나리오</td><td>화면 24개짜리 앱의 기존 테스트 699개가 이관 후에도 전부 통과</td></tr>
            <tr><td>번들 (gzip, Base UI 제외)</td><td>react 전체 7.1KB · 역할 하나만 쓰면 3.1KB · 판단 엔진 1.3KB - 예산(8 / 3.5 / 2KB)은 릴리스 게이트가 지켜요</td></tr>
            <tr><td>접근성 자동 검사</td><td>내비게이션 전 모습·전체 화면 다이얼로그 위반 0 - 자세한 맥락은 접근성 문서에</td></tr>
          </tbody>
        </table>
      </div>

      <h2>어떻게 검사하나요</h2>
      <p>
        국제 표준의 틀(ISO/IEC 25010, ISO/IEC/IEEE 29119)을 빌려 이름 있는 기법으로
        검사해요: 결정 테이블 전수, 경계값(크기 임계 599/600 · 839/840, 떨림 방지
        양방향), 상태 전이(열림 중 고정 - 재열림 재판정), 예외 입력(더블클릭, 없는
        값, 측정 불가 컨테이너), 그리고 실제 앱 통합 시나리오요.
      </p>
      <p>
        npm에 나가는 모든 버전은 릴리스 게이트 한 명령을 통과해야 해요 - 위 표의
        전 항목에 더해 워크스페이스 타입체크, 배포 사이트의 서버 HTML에 오버레이
        마크업이 0바이트인지(curl 실측)까지요. 한 칸이라도 틀리면 통계가 아니라 발행
        차단이에요. 발행 자체는 태그 푸시로 CI가 수행하고, 서명된 출처 증명이
        자동으로 붙어요.
      </p>

      <h2>어디까지 검증됐나요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>상태</th></tr></thead>
          <tbody>
            <tr><td>Chrome (데스크톱, 여러 폭)</td><td>매 릴리스 확인해요</td></tr>
            <tr><td>iOS 시뮬레이터의 실제 WebKit - iPhone 16 Pro, iPad Pro</td><td>탭 바·더보기·레일 실측 완료</td></tr>
            <tr><td>macOS Safari · Firefox</td><td>표본 검사 단계 - 전수는 남아 있어요</td></tr>
            <tr><td>Android · 물리 기기</td><td>아직이에요 - 로드맵에 있어요</td></tr>
          </tbody>
        </table>
      </div>

      <h2>지원 한계, 정직하게</h2>
      <ul>
        <li>React 18+를 선언하고 그에 맞게 설계했지만(예: ref 전달 방식), 실행 테스트는 React 19에서 해요. 18에서 문제가 보이면 이슈로 알려 주세요 - 재현을 최우선으로 봐요.</li>
        <li>기본 패턴 규칙의 태블릿 분화는 실사용 데이터 확보 전까지 보류예요 - 추측 규칙을 기본값에 넣지 않아요.</li>
        <li>화면 키보드는 수집만 되고 기본 규칙이 아직 쓰지 않아요.</li>
        <li>메인테이너는 현재 1명이에요. 대신 게이트·CI·기여 안내를 갖춰서, 프로젝트 상태가 사람 머릿속이 아니라 저장소에 있게 했어요.</li>
      </ul>
      <div className="callout">
        <strong>왜 &quot;통과율 95%&quot; 같은 기준이 없나요?</strong> 결정 규칙 한 칸의
        오류나 서버 렌더링 회귀는 퍼센트로 희석될 문제가 아니라서요. 실패는 곧
        차단이고, 예외는 없어요.
      </div>
    </div>
  )
}
