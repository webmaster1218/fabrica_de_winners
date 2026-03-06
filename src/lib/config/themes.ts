export interface AgentTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  plasma: string;
  name: string;
}

export const agentThemes: Record<string, AgentTheme> = {
  salud: {
    primary: '#0064E0',
    secondary: '#004BB3',
    accent: '#007BFF',
    background: 'rgba(0, 100, 224, 0.08)',
    plasma: '#0064E0',
    name: 'Salud'
  },
  comida: {
    primary: '#7C3AED',
    secondary: '#5B21B6',
    accent: '#8B5CF6',
    background: 'rgba(124, 58, 237, 0.08)',
    plasma: '#7C3AED',
    name: 'Comida'
  }
};

export function getAgentTheme(agentId: string): AgentTheme {
  return agentThemes[agentId] || agentThemes.salud;
}