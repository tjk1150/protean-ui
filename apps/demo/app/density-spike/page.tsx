'use client'

import {
  Menu,
  ProteanProvider,
  useDensityProfile,
  type DensityProfile,
} from '@protean-ui/react'
import * as React from 'react'
import './spike.css'

/* The density spike: the same requirement built twice, so the wiring can be
   counted. Requirement: rows are comfortable for pointers, touch-sized for
   touch, a user setting overrides everything, and a sheet is always
   touch-sized no matter what. The simulation scaffolding (radio group, sheet
   checkbox, card markup, the density->value CSS) is identical on both sides;
   only the DECISION WIRING differs. Delta lines are marked [P#] / [V#]. */

const CHOICES = ['auto', 'compact', 'comfortable', 'touch'] as const
type Choice = (typeof CHOICES)[number]

function Rows() {
  return (
    <ul>
      {['받은함으로 이동', '보관하기', '라벨 달기', '삭제하기'].map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  )
}

function Controls({
  title,
  choice,
  onChoice,
  sheet,
  onSheet,
  note,
}: {
  title: string
  choice: Choice
  onChoice: (next: Choice) => void
  sheet: boolean
  onSheet: (next: boolean) => void
  note: React.ReactNode
}) {
  return (
    <>
      <h2>{title}</h2>
      <div className="controls">
        {CHOICES.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={title}
              checked={choice === value}
              onChange={() => onChoice(value)}
            />
            {value}
          </label>
        ))}
        <label className="sheetToggle">
          <input type="checkbox" checked={sheet} onChange={(e) => onSheet(e.target.checked)} />
          시트 상황
        </label>
      </div>
      <p className="note">{note}</p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* A. Protean                                                          */
/* ------------------------------------------------------------------ */

function ProteanCard({ choice, sheet }: { choice: Choice; sheet: boolean }) {
  const decision = useDensityProfile() /* [P2] */
  return (
    <div
      className="spikeCard"
      data-density={choice === 'auto' ? undefined : decision.presentation} /* [P3] */
      data-presentation={sheet ? 'sheet' : undefined} /* 실제 컴포넌트는 공짜로 찍음 */
    >
      <Rows />
      <code className="explain">
        density {'->'} {decision.presentation} [{decision.source}]
      </code>
    </div>
  )
}

function ProteanSide() {
  const [choice, setChoice] = React.useState<Choice>('auto')
  const [sheet, setSheet] = React.useState(false)
  return (
    <section>
      <Controls
        title="A. Protean"
        choice={choice}
        onChoice={setChoice}
        sheet={sheet}
        onSheet={setSheet}
        note={
          <>
            배선 3줄: Provider prop 하나, 훅 하나, 스탬프 하나. 기본값은 정책이,
            패턴 결합(시트=터치)은 컴포넌트가 찍는 data-presentation이 담당해요.
          </>
        }
      />
      <ProteanProvider density={choice === 'auto' ? undefined : (choice as DensityProfile)}>
        {/* [P1] */}
        <ProteanCard choice={choice} sheet={sheet} />
      </ProteanProvider>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* B. Vanilla (성실한 스틸맨: 기본값은 CSS 미디어쿼리에 맡김)              */
/* ------------------------------------------------------------------ */

function VanillaSide() {
  const [choice, setChoice] = React.useState<Choice>('auto')
  const [sheet, setSheet] = React.useState(false)

  /* [V1] 사용자 선택과 패턴을 밀도로 합성하는 규칙 - 앱마다 직접 설계 */
  const effective = sheet ? 'touch' : choice === 'auto' ? undefined : choice
  /* [V2] 시트=터치 규칙이 여기(JS)와 시트 CSS 양쪽에 존재 - 동기화 지점 2곳 */

  return (
    <section>
      <Controls
        title="B. React + CSS 수제"
        choice={choice}
        onChoice={setChoice}
        sheet={sheet}
        onSheet={setSheet}
        note={
          <>
            기본값은 같은 CSS 미디어쿼리를 쓰는 성실한 구현이에요. 그래도 남는 것:
            합성 규칙을 직접 설계([V1]), 패턴-밀도 결합을 JS와 CSS 두 곳에서
            유지([V2]), 그리고 왜 이 밀도인지 설명할 방법이 없어요.
          </>
        }
      />
      <div
        className="spikeCard vanillaSheet"
        data-density={effective} /* [V3] */
        data-sheet={sheet || undefined}
      >
        <Rows />
        <code className="explain">density {'->'} {effective ?? '(media query)'} [?]</code>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 통합 배당: 진짜 Menu가 density를 소비하면 데스크톱 팝오버가 촘촘해져요 */
/* ------------------------------------------------------------------ */

function IntegrationMenu({ density }: { density?: DensityProfile }) {
  return (
    <ProteanProvider density={density}>
      <div className="integration" data-density={density}>
        <Menu.Root>
          <Menu.Trigger>문서 작업 ▾</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={() => {}}>공유</Menu.Item>
            <Menu.Item onSelect={() => {}}>이름 변경</Menu.Item>
            <Menu.Item onSelect={() => {}}>복제</Menu.Item>
            <Menu.Item destructive onSelect={() => {}}>삭제</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </div>
    </ProteanProvider>
  )
}

export default function DensitySpike() {
  return (
    <main className="densitySpike protean-defaults">
      <h1>density 스파이크: 같은 요구사항, 두 구현</h1>
      <p>
        요구사항 - 포인터는 아늑하게, 터치는 넉넉하게, 사용자 설정이 전체를
        오버라이드, 시트는 언제나 터치 크기. 아래 두 카드의 뼈대와 CSS는 완전히
        같고, <strong>결정 배선만</strong> 달라요.
      </p>
      <div className="split">
        <ProteanSide />
        <VanillaSide />
      </div>

      <h2>통합 배당: 현재 결함의 수정</h2>
      <p>
        참조 크롬의 메뉴 행은 지금 환경 무관 44px이에요. density가 토큰으로
        들어가면 같은 메뉴가 데스크톱에서 촘촘해져요 - 왼쪽이 compact, 오른쪽이
        touch예요. 열어서 행 높이를 비교해 보세요.
      </p>
      <div className="split">
        <IntegrationMenu density="compact" />
        <IntegrationMenu density="touch" />
      </div>
    </main>
  )
}
