import type { Step } from './utils';

class StepManager {
	steps = $state<Step[]>([]);
	get retrieveSteps() {
		return this.steps;
	}

	set add(step: Step) {
		this.steps.push(step);
	}

	set remove(index: number) {
		this.steps = this.steps.filter((_, i) => i !== index);
	}
}

export const stepManager = new StepManager();
