// import OpenAI from "openai";

// export async function scrapeWithGPT(url) {
//     const openai = new OpenAI({
//         apiKey: process.env.OPENAI_API_KEY,
//     });

//     const prompt = `You are a helpful information collector.
//         ${url}

//         Can you crawl this and get me all the major information? I don't need any code
//         Provide the result as Text in a JSON format with keys like: name, price, description, imageUrls, etc. You can use nesting Arrays or Dictionaries if necessary
//         Do not give me any explanations, I only need the result as Text in a JSON format`;

//     const completion = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//             { role: "system", content: "You are a helpful information collector" },
//             { role: "user", content: prompt },
//         ],
//         max_tokens: 10000,
//     });

//   try {
//     const resultText = completion.choices[0].message.content;
//     const resultJson = JSON.parse(resultText);
//     return resultJson;
//   } catch (error) {
//     console.error("Failed to parse GPT response as JSON:", error);
//     return { raw: completion.choices[0].message.content };
//   }
// }