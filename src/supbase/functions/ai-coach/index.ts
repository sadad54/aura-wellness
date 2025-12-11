// supabase/functions/ai-coach/index.ts
// ... imports and setup ...

serve(async (req) => {
  const { task, content } = await req.json() // task: 'journal', 'reframe', 'habit'

  let systemPrompt = "You are a helpful wellness coach."
  
  if (task === 'reframe') {
    systemPrompt = `
      You are an expert CBT therapist. The user has a negative thought: "${content}".
      1. Identify the cognitive distortion (e.g., All-or-nothing, Catastrophizing).
      2. Provide a specific, compassionate "Reframe" - a healthier way to view the situation.
      Return JSON: { "distortion": "Name", "reframe": "Suggestion" }
    `
  } 
  // ... handle other tasks ...

  // Call Groq API with this prompt...
  // ... return result ...
})
serve(async (req) => {
  const { task, content } = await req.json() // task: 'journal', 'reframe', 'habit'

  let systemPrompt = "You are a helpful wellness coach."
  
  if (task === 'reframe') {
    systemPrompt = `
      You are an expert CBT therapist. The user has a negative thought: "${content}".
      1. Identify the cognitive distortion (e.g., All-or-nothing, Catastrophizing).
      2. Provide a specific, compassionate "Reframe" - a healthier way to view the situation.
      Return JSON: { "distortion": "Name", "reframe": "Suggestion" }
    `
  } 
  // ... handle other tasks ...

  // Call Groq API with this prompt...
  // ... return result ...
})