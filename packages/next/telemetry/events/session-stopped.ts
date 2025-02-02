const EVENT_VERSION = 'NEXT_CLI_SESSION_STOPPED'

export type EventCliSessionStopped = {
  cliCommand: string
  nextVersion: string
  nodeVersion: string
  turboFlag?: boolean | null
  durationMilliseconds?: number | null
}

export function eventCliSession(
  event: Omit<EventCliSessionStopped, 'nextVersion' | 'nodeVersion'>
): { eventName: string; payload: EventCliSessionStopped }[] {
  // This should be an invariant, if it fails our build tooling is broken.
  if (typeof process.env.__NEXT_VERSION !== 'string') {
    return []
  }

  const payload: EventCliSessionStopped = {
    nextVersion: process.env.__NEXT_VERSION,
    nodeVersion: process.version,
    cliCommand: event.cliCommand,
    durationMilliseconds: event.durationMilliseconds,
    ...(typeof event.turboFlag !== 'undefined'
      ? {
          turboFlag: !!event.turboFlag,
        }
      : {}),
  }
  return [{ eventName: EVENT_VERSION, payload }]
}
