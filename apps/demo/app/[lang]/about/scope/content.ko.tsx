export default function CoverageKo() {
  return (
    <div className="doc" lang="ko">
      <h1>이걸로 다 되나요</h1>
      <p className="lede">
        됩니다. <code>npm install @protean-ui/react</code> 한 줄에 적응 계층(Protean)과 행동
        계층 전체(Base UI가 함께 설치돼요)가 같이 와요. 앱 하나를 만드는 데 다른 UI
        라이브러리를 더 깔 필요가 없어요. 이 페이지는 &quot;그럼 체크박스는? 탭은?
        토스트는?&quot;에 대한 지도예요.
      </p>

      <h2>지도: 필요한 것마다 어디서 오나</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>필요한 것</th><th>어디서</th><th>비고</th></tr></thead>
          <tbody>
            <tr><td>다이얼로그 · 셀렉트 · 메뉴 · 내비게이션 · 화면 뼈대 · 주 행동 · 툴팁 · 리스트-디테일 · 액션 줄 · 보조 패널</td><td><strong>Protean 역할</strong></td><td>환경이 상호작용 계약을 바꾸는 것들 - 판단을 런타임이 소유해요. 컨테이너 판정은 Boundary로요.</td></tr>
            <tr><td>UI 밀도 (compact · comfortable · touch)</td><td><strong>Protean 결정 + 토큰</strong></td><td>포인터 기본값은 CSS가, 사용자 설정·패턴 결합은 정책이 정해요. 밀도 문서를 보세요.</td></tr>
            <tr><td>폼 전부 - Input · Checkbox · Radio · Switch · Slider · NumberField · OtpField · Field · Fieldset · Form</td><td><strong>Base UI 그대로</strong></td><td><code>import &#123; Checkbox &#125; from &apos;@base-ui/react/checkbox&apos;</code> - 이미 설치돼 있어요. 환경이 계약을 안 바꾸니 런타임이 낄 이유가 없어요.</td></tr>
            <tr><td>Tabs · Accordion · Collapsible · Toast · Progress · Meter · Avatar · ScrollArea · Toggle · Toolbar · Menubar · ContextMenu · PreviewCard · Autocomplete</td><td><strong>Base UI 그대로</strong></td><td>같아요. 탭이 좁은 화면에서 스크롤되는 건 CSS이지 계약 변화가 아니에요.</td></tr>
            <tr><td>카드 · 뱃지 · 구획 배치 · <code>md:flex-row</code> 같은 레이아웃</td><td><strong>여러분의 CSS</strong></td><td>배치 적응은 CSS가 이미 푼 문제예요. Protean의 &quot;노 브레이크포인트&quot;는 패턴 분기에만 해당해요.</td></tr>
            <tr><td>테이블</td><td><strong>HTML + CSS</strong></td><td>시맨틱 <code>&lt;table&gt;</code>에 반응 스타일. 카드 전환이 필요한 데이터라면 ListDetail이 답인 경우가 많아요.</td></tr>
            <tr><td>DatePicker · CommandPalette · 차트</td><td><strong>아직 · 아직 · 범위 밖</strong></td><td>DatePicker는 Base UI에 캘린더가 생기면, CommandPalette는 수요가 확인되면요. 차트는 전문 라이브러리 몫이에요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>섞어 쓰면 이런 모양이에요</h2>
      <pre><code>{`import { Dialog } from 'protean-ui'              // 적응: 환경이 모습을 정해요
import { Field } from '@base-ui/react/field'      // 행동: 그대로 가져다 써요
import { Input } from '@base-ui/react/input'
import { Checkbox } from '@base-ui/react/checkbox'

<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <Field.Root>
      <Field.Label>주소</Field.Label>
      <Input />
    </Field.Root>
    <Checkbox.Root /> 기본 배송지로 저장
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        다이얼로그가 데스크톱에선 모달로, 폰에선 시트로 열리는 동안 안의 폼은 아무
        것도 몰라요. 두 계층은 원래 한 몸처럼 설계됐어요 - Protean의 백엔드가 바로 Base
        UI거든요.
      </p>

      <h2>시각은 어디까지 주나요</h2>
      <p>
        참고 스타일시트(<code>.protean-defaults</code>)는 Protean 역할들의 크롬만 입혀요.
        나머지 컴포넌트의 시각은 여러분 것이에요 - 그게 style-agnostic의 의미이고, 브랜드
        가진 팀이 디자인 시스템 번들을 거부해 온 이유이기도 해요. 대신 어휘는 공유할 수
        있어요: 여러분의 체크박스 CSS에서 같은 토큰을 소비하면 앱 전체의 밀도와 색이
        한 몸이 돼요.
      </p>
      <pre><code>{`/* 여러분의 컴포넌트도 같은 어휘로 */
.my-checkbox {
  min-height: var(--protean-target);   /* 터치 타깃 규율 공유 */
}
.my-delete-button {
  color: var(--protean-danger);        /* 위험 색 공유 */
}`}</code></pre>

      <h2>왜 이 구조인가요</h2>
      <div className="callout">
        <strong>결합이 늘지 않아요.</strong> Protean은 Base UI와 경쟁하는 평행 생태계가
        아니라 그 위의 한 층이에요. 채택해도 의존성 그래프에 새 진영이 추가되지
        않고, 떠나고 싶으면 역할 컴포넌트만 걷어내면 Base UI 앱이 그대로 남아요.
        들어오기 쉽고 나가기 쉬운 게 의도예요.
      </div>
    </div>
  )
}
