export type Episode = {
  id: string
  title: string
  synopsis: string
  runtimeMinutes: number
  rating: string
}

export type Season = {
  id: string
  name: string
  year: number
  summary: string
  episodes: Episode[]
}

export type Show = {
  codeName: string
  accessLevel: number
  lead: string
  division: string
  seasons: Season[]
}

export const classifiedShow: Show = {
  codeName: 'CLASSIFIED: SCP OPERATIONS',
  accessLevel: 4,
  lead: 'Administrator Nathan Kimball',
  division: 'Directorate // Admin',
  seasons: [
    {
      id: 's1',
      name: 'Season 1 — Containment Protocol',
      year: 2025,
      summary:
        'Initial incidents escalate as routine containment fractures into a chain of cross-site anomalies. A small field unit uncovers a pattern hidden in clearance-locked logs.',
      episodes: [],
    },
    {
      id: 's2',
      name: 'Season 2 — Internal Affairs',
      year: 2026,
      summary:
        'The investigation turns inward. Access logs contradict reality. An embedded cell within the Foundation forces the team to choose between truth and protocol.',
      episodes: [
        {
          id: 's2e1',
          title: 'Clearance Drift',
          synopsis:
            'Personnel IDs begin granting access to rooms they should not enter—and revoking it when it matters most.',
          runtimeMinutes: 45,
          rating: 'TV-14',
        },
        {
          id: 's2e2',
          title: 'Nine Tailed Circle',
          synopsis:
            'A joint op with the UIU goes sideways when a ritual diagram loops back into itself, trapping the team in an investigatory Möbius strip.',
          runtimeMinutes: 46,
          rating: 'TV-14',
        },
        {
          id: 's2e3',
          title: 'Mnemonic Scrub',
          synopsis:
            'Amnestics fail to erase a memory that refuses to be forgotten. The memory starts remembering them back.',
          runtimeMinutes: 44,
          rating: 'TV-14',
        },
        {
          id: 's2e4',
          title: 'Department of Nothing',
          synopsis:
            'An office appears on the intranet org chart with no staff, no budget, and perfect quarterly reports.',
          runtimeMinutes: 45,
          rating: 'TV-14',
        },
        {
          id: 's2e5',
          title: 'Exemption Clause',
          synopsis:
            'A buried exception in Foundation bylaws grants a single researcher unilateral authority for 24 hours. The countdown starts at zero.',
          runtimeMinutes: 48,
          rating: 'TV-14',
        },
        {
          id: 's2e6',
          title: 'O5-Null',
          synopsis:
            'A vote is called. The result is classified. The outcome is already happening.',
          runtimeMinutes: 52,
          rating: 'TV-14',
        },
      ],
    },
  ],
}
