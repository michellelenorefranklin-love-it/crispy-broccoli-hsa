/**
 * Client configuration — the only place to change the client's name or logo.
 * Keep the default ("the Client") for any session where the client has not
 * approved use of its name in a demo.
 */
export const clientConfig = {
  /** Used in sentences: "subject to the Client's security policies". */
  name: 'the Client',
  /** Used at the start of a sentence or as a title. */
  displayName: 'The Client',
  /** Short wordmark shown in the top bar when no logo is set. */
  shortName: 'Client',
  /** Optional logo: a data: URI or a path under /public. Leave empty for the wordmark. */
  logoUrl: '',
  /** Approximate workforce size, used only for illustrative framing. */
  employeeCount: 45000,
  industry: 'Financial services',
  /** Name of the demo itself. */
  demoTitle: 'AI Employee Experience & Change Transformation',
  presenterOrg: 'Consulting team',
}

/** Possessive helper: "the Client's" / "Acme's". */
export const clientPossessive = `${clientConfig.name}'s`
export const ClientPossessive = `${clientConfig.displayName}'s`
