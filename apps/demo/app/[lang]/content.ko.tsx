import Link from 'next/link'

export default function OverviewKo() {
  return (
    <div className="doc" lang="ko">
      <h1>같은 UI를 환경마다 두 번 만들지 마세요</h1>
      <p className="lede">
        Protean UI는 React에서 직접 작성하던 <strong>환경별 UI 분기</strong>를
        대신해요. 컴포넌트가 무엇인지 선언하면, 현재 환경에 어울리는 UI 패턴과
        밀도를 골라서 보여줘요.
      </p>

      <h2>보통은 이렇게 만들어요</h2>
      <pre><code>{`const isMobile = useMediaQuery("(max-width: 768px)");

return isMobile ? (
  <BottomSheet rowHeight={44}>
    <CycleOptions />
  </BottomSheet>
) : (
  <Dropdown rowHeight={36}>
    <CycleOptions />
  </Dropdown>
);`}</code></pre>
      <p>같은 기능인데도 직접 해야 할 일이 늘어나요.</p>
      <ul>
        <li>지금이 모바일 환경인지 판단하고</li>
        <li>드롭다운과 바텀 시트를 나누고</li>
        <li>마우스와 터치에 맞는 크기를 따로 맞추고</li>
        <li>두 구현이 계속 같은 기능을 하도록 관리해야 해요</li>
      </ul>
      <p>
        이런 분기가 화면마다 생기기 시작하면 반응형 코드는 UI 곳곳으로 퍼져요.
      </p>

      <h2>Protean에서는 하나만 만들어요</h2>
      <pre><code>{`<Select.Root aria-label="결제 주기" value={cycle} onValueChange={setCycle} items={cycles}>
  <Select.Trigger placeholder="결제 주기" />
  <Select.Content>
    <Select.Item value="monthly">매월</Select.Item>
    <Select.Item value="yearly">매년</Select.Item>
  </Select.Content>
</Select.Root>`}</code></pre>
      <p>어떤 환경에서 어떤 모습으로 보여줄지는 Protean이 결정해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>보여주는 방식</th></tr>
          </thead>
          <tbody>
            <tr><td>데스크톱 + 마우스</td><td>드롭다운 + 촘촘한 항목</td></tr>
            <tr><td>작은 화면 + 터치</td><td>바텀 시트 + 넉넉한 항목</td></tr>
            <tr><td>태블릿 + 터치</td><td>드롭다운 + 터치하기 쉬운 항목</td></tr>
            <tr><td>좁은 창 + 마우스</td><td>여전히 드롭다운</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>화면이 좁다고 해서 항상 모바일은 아니니까요.</strong> 데스크톱에서
        브라우저 창을 작게 열었을 수도 있고, 넓은 태블릿을 손가락으로 사용하고
        있을 수도 있어요. Protean은 화면 너비 하나로 모바일을 추측하지 않고,{' '}
        <strong>현재 공간과 입력 방식을 함께 보고 UI를 선택해요.</strong>
      </p>

      <h2>Protean이 결정하는 것</h2>
      <p>Protean이 맡는 일은 크게 두 가지예요.</p>
      <h3>패턴</h3>
      <p>
        같은 기능을 지금 상황에 더 자연스러운 UI로 보여줘요. 예를 들어 같은 선택
        UI가 환경에 따라 드롭다운이나 바텀 시트가 될 수 있어요.
      </p>
      <h3>밀도</h3>
      <p>
        같은 UI 안에서도 마우스로 사용할 때는 조금 더 촘촘하게, 손가락으로 사용할
        때는 조금 더 넉넉하게 보여줘요. 그래서 패턴이 바뀔 때마다{' '}
        <code>rowHeight</code>나 터치 영역을 앱 코드에서 다시 맞출 필요가 없어요.
      </p>

      <h2>CSS를 대신하지 않아요</h2>
      <p>
        Protean은 새로운 반응형 CSS 엔진이 아니에요. 레이아웃, 색상, 간격, 모서리,
        부드러운 크기 변화처럼 <strong>CSS가 잘하는 일은 계속 CSS가 담당해요.</strong>{' '}
        Protean이 맡는 건 그 전에 필요한 선택이에요.
      </p>
      <div className="callout">
        지금 이 UI는 드롭다운이 자연스러운가, 시트가 자연스러운가?
        <br />
        지금은 촘촘하게 보여줄까, 터치하기 쉽게 넉넉하게 보여줄까?
      </div>
      <p>단순한 스타일 변화라면 Protean이 필요하지 않아요.</p>

      <h2>실제 앱에서도 확인했어요</h2>
      <p>
        같은 기능을 직접 분기한 비교 구현에서는 앱 코드가{' '}
        <strong>55줄에서 15줄로 줄었어요.</strong> 또 실제 앱에 적용한 뒤 기존{' '}
        <strong>699개 테스트를 그대로 통과</strong>하는지 확인했어요. 더 자세한
        검증 결과와 현재 지원 상태는{' '}
        <Link href="/ko/about/status">품질과 지원</Link>에서 확인할 수 있어요.
      </p>

      <h2>이 문서도 Protean으로 동작해요</h2>
      <p>
        이 문서 사이트의 내비게이션도 Protean을 사용해요. 브라우저 창의 크기를
        바꿔 보면 사용할 수 있는 공간에 따라 내비게이션의 모습이 달라지는 것을
        확인할 수 있어요. 내부 환경값이나 판단 과정은 여기서 외울 필요가 없어요.
        어떻게 선택하는지가 궁금할 때{' '}
        <Link href="/ko/concepts/pattern-adaptation">패턴 적응</Link>에서 자세히
        살펴볼 수 있어요.
      </p>

      <h2>다음 단계</h2>
      <p>
        처음 사용한다면 <Link href="/ko/getting-started">10분 시작하기</Link>에서
        컴포넌트 하나를 직접 만들어 보세요. Protean이 어떤 기준으로 UI를
        선택하는지 먼저 알고 싶다면{' '}
        <Link href="/ko/concepts/pattern-adaptation">패턴 적응</Link>으로
        이동하세요.
      </p>
    </div>
  )
}
