export interface JobPayload {
  id: string;
  type: string;
  payload: Record<string, unknown>;
}

export interface JobRunner {
  enqueue(job: JobPayload): Promise<void>;
}

export const jobRunner: JobRunner = {
  async enqueue() {
    throw new Error("Background jobs are not configured for MVP v1.");
  }
};
