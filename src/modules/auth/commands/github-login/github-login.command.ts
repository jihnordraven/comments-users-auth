import { GithubLoginInput } from './types'

export class GithubLoginCommand {
	constructor(public readonly input: GithubLoginInput) {}
}
