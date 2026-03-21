// Basic Priority Algorithm
export function calculatePriority(data: { urgency: string; peopleAffected: number; hasImage: boolean }) {
  let score = 0;
  
  // Urgency Base
  const baseScores: Record<string, number> = {
    "CRITICAL": 50,
    "HIGH": 30,
    "MEDIUM": 15,
    "LOW": 5
  };
  
  score += baseScores[data.urgency] || 15;
  
  // Scale by people affected (max 30 pts)
  score += Math.min(data.peopleAffected * 3, 30);
  
  // Verification Bonus
  if (data.hasImage) score += 10;
  
  return score;
}

// AI Tagging (Mock)
export async function analyzeImage(_imagePath: string) {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    verified: true,
    tag: "Flood",
    severity: "HIGH",
    confidence: 0.95
  };
}
