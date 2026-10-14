// What the client told us, in their words, and where the demo answers it.
export type StatementId =
  | 'needs' | 'access' | 'process' | 'build' | 'actions' | 'comms' | 'roles' | 'teamOnboarding' | 'bottlenecks' | 'governance' | 'value'

export const clientStatements: Record<StatementId, { quote: string; where: string; route: string }> = {
  needs: { quote: 'Defining teams in what they need to do their job', where: 'Team Onboarding — needs definition', route: '/workflow?tab=onboarding' },
  access: { quote: 'Looking at the access levels', where: 'Access & Permissions; roles matrix', route: '/access' },
  process: { quote: 'What does the process look like', where: 'Workflow lifecycle; behind-the-scenes panels', route: '/workflow?tab=lifecycle' },
  build: { quote: 'Each team will have access to build their own workflows', where: 'Federated Workflow Studio', route: '/workflow?tab=builder' },
  actions: { quote: 'What our action items are going to look like', where: 'Decisions & next steps', route: '/decisions' },
  comms: { quote: 'Developing comms sent to the teams', where: 'Communications Center', route: '/change?tab=comms' },
  roles: { quote: 'When people get on the platform — what role they will have', where: 'Role catalogue + role assignment', route: '/workflow?tab=roles' },
  teamOnboarding: { quote: 'Onboarding for teams', where: 'Team Onboarding flow', route: '/workflow?tab=onboarding' },
  bottlenecks: { quote: 'Limiting the bottlenecks', where: 'Review lanes + bottleneck radar', route: '/workflow?tab=lanes' },
  governance: { quote: 'A lot of the governance is owned by the process teams', where: 'Federated operating model', route: '/workflow?tab=model' },
  value: { quote: 'Business value functionality exists within the tool', where: 'Executive Value', route: '/value' },
}
