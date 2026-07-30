import { getConversationContext } from "../copilot/context/conversationContext.js";

export interface OrchestratorDecision {
  useContext: boolean;
  lastIntent?: string;
}

class Orchestrator {

  decide(userPrompt: string): OrchestratorDecision {

    const context = getConversationContext();

    if (!context.lastIntent) {
      return {
        useContext: false,
      };
    }

    const prompt = userPrompt.toLowerCase();

    const followUpWords = [
      "it",
      "that",
      "this",
      "them",
      "move",
      "change",
      "cancel",
      "add",
      "remove",
      "reschedule",
      "make it",
    ];

    const isFollowUp = followUpWords.some(word =>
      prompt.includes(word)
    );

    if (!isFollowUp) {
      return {
        useContext: false,
      };
    }

    return {
      useContext: true,
      lastIntent: context.lastIntent,
    };
  }
}

export const orchestrator = new Orchestrator();