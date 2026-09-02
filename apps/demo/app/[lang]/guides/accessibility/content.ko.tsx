import Link from 'next/link'

export default function AccessibilityKo() {
  return (
    <div className="doc" lang="ko">
      <h1>접근성</h1>
      <p className="lede">
        모습이 바뀌어도 &quot;그 UI가 무엇인지&quot;는 절대 바뀌면 안 돼요. Protean은
        이걸 권장 사항이 아니라 지켜야 하는 계약으로 다뤄요.
      </p>

      <h2>모습이 달라도 의미는 같아요</h2>
      <p>
        바텀 시트로 열리든 모달로 열리든, 스크린 리더에게는 둘 다 똑같은{' '}
        <code>role=&quot;dialog&quot;</code>이고 이름도 같아요. 내비게이션은 탭 바
        모습이든 사이드바 모습이든 항상 <code>nav &gt; ul</code> 구조에{' '}
        <code>aria-current=&quot;page&quot;</code>로 현재 위치를 알려요. 보조기기
        사용자는 적응이 일어났다는 사실조차 몰라도 되게요.
      </p>

      <h2>어려운 부분은 검증된 곳에 맡겨요</h2>
      <p>
        포커스 가두기, 닫을 때 포커스 되돌리기, ESC 닫기, 리스트박스 키보드 조작 같은
        동작은 Base UI가 처리해요. 직접 만든 포커스 트랩은 사고가 나기 쉬운 대표적인
        코드라서, Protean은 이 영역을 다시 만들지 않는 걸 규칙으로 정했어요.
      </p>

      <h2>Protean이 얹어 주는 것</h2>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>속성</th><th>하는 일</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>alert</td>
              <td>&quot;되돌릴 수 없어요&quot; 같은 위험한 확인 창을 <code>role=&quot;alertdialog&quot;</code>로 알려요.</td>
            </tr>
            <tr>
              <td>describedBy</td>
              <td>본문 설명 문단들을 다이얼로그의 <code>aria-describedby</code>로 연결해요.</td>
            </tr>
            <tr>
              <td>initialFocus</td>
              <td>열릴 때 포커스를 받을 요소를 정해요. 위험한 확인 창에서 &quot;취소&quot;에 먼저 포커스를 주는 패턴에 써요.</td>
            </tr>
            <tr>
              <td>finalFocus</td>
              <td>닫힐 때 포커스가 갈 곳을 정해요. 작업 완료 후 앱이 직접 포커스를 옮기고 싶다면 함수로 false를 돌려주면 돼요.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>측정한 결과</h2>
      <ul>
        <li>내비게이션의 모든 모습과 전체 화면 다이얼로그에서 접근성 자동 검사(axe) 위반 0건이었어요.</li>
        <li>
          모달이 열린 상태에서는, 같은 부품으로 만든 수동 레시피보다 지적 항목이 오히려
          1개 적었어요. 남은 항목은 포커스가 밖으로 새지 않게 막는 보이지 않는 보조
          요소를 검사 도구가 표시하는 것으로, 수동 구현에도 똑같이 있는 알려진 검사
          특성이에요.
        </li>
        <li>
          실제 앱 이관에서는 키보드 트랩과 포커스 복귀를 검사하는 기존 테스트 699개가
          교체 후에도 전부 통과했어요.
        </li>
      </ul>
      <p>
        검사 수치는 릴리스마다 달라질 수 있어서, 최신 숫자는{' '}
        <Link href="/ko/about/status">품질·지원 상태</Link>에서 관리해요.
      </p>

      <h2>입력 수단은 능력을 제한하지 않아요</h2>
      <p>
        입력 수단에 따라 패턴과 밀도가 달라져도, 할 수 있는 일은 같아요. 키보드
        조작은 어떤 모습에서도 항상 돼요 - 태블릿에 키보드를 연결한 사용자도
        있으니까요. 동작 줄이기(prefers-reduced-motion) 설정은 참고 스타일시트의 CSS
        미디어쿼리가 직접 존중해서, 시트 슬라이드 같은 모션이 한꺼번에 조용해져요.
      </p>
    </div>
  )
}
