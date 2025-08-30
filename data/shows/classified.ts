export type Episode = {
  id: string
  title: string
  synopsis: string
  runtimeMinutes: number
  rating: string
  released?: boolean
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
      episodes: [
        {
          id: 's1e1',
          title: 'Welcome.',
          synopsis:
            'Inside Site-1110, 30 D-Class are subjected to SCP experiments. Early encounters turn lethal, exposing Foundation cruelty. Survivors like Carson Sanders emerge. A “Shave and a Haircut” knock echoes from ventilation—something else is alive and watching.',
          runtimeMinutes: 44,
          rating: 'TV-14',
          released: false,
        },
        {
          id: 's1e2',
          title: 'Project Resilence',
          synopsis:
            'MTF Upsilon-11 arrives at Site-1110. Veterans recount past horrors and scientist inhumanity. Dread mounts as breaches feel imminent and D-Class near a breaking point. Containment frays—violence is inevitable.',
          runtimeMinutes: 46,
          rating: 'TV-14',
          released: false,
        },
        {
          id: 's1e3',
          title: 'Nine Into The Fire',
          synopsis:
            'A full-scale D-Class riot erupts. Amid chaos, the Chaos Insurgency infiltrates, breaching SCPs and driving catastrophic failures to reach the Omega Warhead silo. A D-Class turns on a CI operative near the silo. Fade to black as CI triggers a catastrophic event.',
          runtimeMinutes: 48,
          rating: 'TV-14',
          released: false,
        },
        {
          id: 's1e4',
          title: 'The O5 Prequel',
          synopsis:
            'Before Episode 1: Site-1110 in full order. A deceptive calm reveals O5, admin, and researcher operations. We return to the Omega Warhead silo where the CI leader sacrifices himself to detonate. Cut to black just before detonation.',
          runtimeMinutes: 46,
          rating: 'TV-14',
          released: false,
        },
        {
          id: 's1e5',
          title: 'Farewell, Site-1110',
          synopsis:
            'The warhead detonates. Site-1110 is annihilated. Only Administration personnel survive. The Foundation’s cruelty consumes prisoners and its own site, leaving a bleak aftermath.',
          runtimeMinutes: 50,
          rating: 'TV-14',
          released: false,
        },
        {
          id: 's1e6',
          title: 'Bonus: SCP-3008',
          synopsis:
            'A standalone side story within the same universe: survivors trapped inside SCP-3008, the infinite IKEA. A brief but harrowing detour into anomaly survival horror.',
          runtimeMinutes: 44,
          rating: 'TV-14',
          released: false,
        },
      ],
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
