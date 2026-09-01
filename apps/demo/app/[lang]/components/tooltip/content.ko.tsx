import { TooltipDemo } from './tooltip-demo'

export default function TooltipKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Tooltip</h1>
      <p className="lede">
        짧은 힌트예요. 호버가 있는 환경에서는 익숙한 툴팁으로 뜨고, 터치 환경에서는{' '}
        <strong>탭해서 여는 말풍선</strong>(토글팁)이 돼요. 터치에는 호버가 없어서 툴팁
        패턴 자체가 성립하지 않거든요 - &quot;화면이 작아서&quot;가 아니라 &quot;입력
        수단이 달라서&quot; 바뀌는, 입력 축의 가장 순수한 예시예요.
      </p>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 마우스로 올려 보고, 터치 화면에서는 탭해 보세요</span>
        <TooltipDemo label="배송비 안내" hint="3만 원 이상이면 배송비가 무료예요." text="배송비 3,000원" />
      </div>

      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="배송비 안내">?</Tooltip.Trigger>
  <Tooltip.Content>3만 원 이상이면 배송비가 무료예요.</Tooltip.Content>
</Tooltip.Root>`}</code></pre>

      <h2>환경마다 이렇게 열려요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>호버 가능 (마우스 · 하이브리드)</td><td>호버와 키보드 포커스로 열리는 툴팁이에요. 벗어나면 닫혀요.</td></tr>
            <tr><td>호버 불가 (터치)</td><td>탭으로 열고 닫는 말풍선이에요. 포커스를 훔치지 않고, 바깥을 탭하면 닫혀요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>규칙도 새로 생겼어요: hint</h2>
      <p>
        이 판단은 오버레이 역할이 아니라 별도의 규칙 도메인 <code>hint</code>예요.
        기본값은 &quot;호버가 있으면 tooltip, 없으면 popover&quot;이고, 다른 도메인처럼
        규칙 파일에서 바꾸거나(<code>hint: ({'{ traits, defaults }'}) =&gt; ...</code>)
        인스턴스에서 <code>presentation</code>으로 지정할 수 있어요.
      </p>

      <div className="callout">
        <strong>중요한 사용 원칙:</strong> 힌트는 곁들이는 정보예요. 서버는 순수한
        버튼만 그리고 클라이언트가 마운트된 뒤에 힌트 동작이 붙기 때문에(JavaScript가
        없으면 힌트도 없어요), 꼭 전달돼야 하는 내용은 본문이나 라벨에 두세요. 이건
        모든 툴팁의 접근성 원칙이기도 해요.
      </div>

      <h2>속성</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>Root: presentation</td><td>&quot;tooltip&quot; | &quot;popover&quot; | &#123; 화면등급: 모습 &#125;</td><td>이 힌트만 다르게 열고 싶을 때 지정해요.</td></tr>
            <tr><td>Trigger: aria-label</td><td>string</td><td>트리거가 &quot;?&quot; 같은 기호라면 꼭 붙여 주세요.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
