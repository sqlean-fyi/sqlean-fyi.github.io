import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function optimizeQuery(query: string, dbSystem: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
You are an expert Senior Database Administrator and Architect. Your task is to provide a concise, actionable optimization review for the following ${dbSystem} query or code.

---
**Core Task:**
Analyze the provided code for performance bottlenecks, anti-patterns, and platform-specific optimizations.

---
**Guidance by Database Type:**
*   **Data Warehouses (BigQuery, Snowflake, Redshift, Azure Synapse)**: Focus on partitioning, clustering, distribution/sort keys. Identify expensive joins and data shuffling.
*   **Relational (MySQL, PostgreSQL)**: Focus on indexing (B-Tree, Trigram), inefficient joins, and N+1 problems.
*   **MongoDB**: Analyze aggregation pipelines and recommend optimal indexes (compound, covered queries).
*   **DynamoDB**: Advise against \`Scan\` operations. Recommend \`Query\` operations with optimal keys and indexes (GSIs/LSIs).

---
**Your Output Must Be Concise and Follow This Exact Format:**

### Summary
A one-sentence overview of the primary issue and the proposed fix.

### Identified Issues
A **concise** bulleted list of specific problems found.

### Optimized Code/Query
The rewritten, optimized version of the code or a description of the optimal access pattern. If providing code, use a markdown code block.

### Explanation of Changes
A **concise**, bulleted list explaining *why* each change improves performance. **You must wrap all SQL keywords, table/column names, and code identifiers in backticks (\`)**. For example: "The \`JOIN\` was changed to use the indexed \`user_id\` column."

Provide your entire response in GitHub-flavored Markdown. Be direct and to the point.

Here is the code to optimize for ${dbSystem}:
\`\`\`
${query}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get optimization from Gemini API.");
  }
}