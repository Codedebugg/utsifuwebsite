
import { generateMagicIdeas } from './n8nService';

/**
 * DEPRECATED: Standardizing all AI logic on the sovereign n8n engine.
 * This wrapper remains for backward compatibility in the component tree.
 */
export const getAutomationSuggestions = async (businessType: string) => {
  return generateMagicIdeas(businessType);
};
