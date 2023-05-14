import dotenv from 'dotenv';
import { OpenAIChat } from 'langchain/llms/openai';
import * as readline from 'node:readline/promises';
import path from 'path';
import fs from 'fs';
import { stdin as input, stdout as output } from 'node:process';
import { CallbackManager } from 'langchain/callbacks';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts';
import { LLMChain } from 'langchain/chains';
import { oneLine } from 'common-tags';
import chalk from 'chalk';
import { logChat } from './chatLogger.js';
import { createCommandHandler } from './commands.js';
import { getMemoryVectorStore, addDocumentsToMemoryVectorStore, getBufferWindowMemory } from './lib/memoryManager.js';
import { getContextVectorStore } from './lib/contextManager.js';
import { getRelevantContext } from './lib/vectorStoreUtils.js';
import { sanitizeInput } from './utils/string.js';
import { getConfig } from './config/index.js';

dotenv.config();

const __dirname = new URL('..', import.meta.url).pathname;
const chatLogDirectory = path.join(__dirname, 'chat_logs');
const systemPromptTemplate = fs.readFileSync(path.join(__dirname, 'prompt.txt'), 'utf8');
const rl = readline.createInterface({ input, output });
const commandHandler = createCommandHandler();
const contextVectorStore = await getContextVectorStore();
const callbackManager = CallbackManager.fromHandlers({
  async handleLLMNewToken(token) {
    output.write(token);
  },
});
const llm = new OpenAIChat({
  streaming: true,
  callbackManager,
  modelName: process.env.MODEL || 'gpt-3.5-turbo',
});
const systemPrompt = SystemMessagePromptTemplate.fromTemplate(oneLine`
  ${systemPromptTemplate}
`);
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  systemPrompt,
  HumanMessagePromptTemplate.fromTemplate('QUESTION: """{input}"""'),
]);
let windowMemory = getBufferWindowMemory();
const chain = new LLMChain({
  prompt: chatPrompt,
  memory: windowMemory,
  llm,
});

async function processQuestion(question) {
  let response;

  let memoryVectorStore = await getMemoryVectorStore();
  const sanitizedQuestion = sanitizeInput(question);
  console.log("🚀 ~ file: index.js:62 ~ sanitizedQuestion:", sanitizedQuestion);
  const config = getConfig();
  const context = await getRelevantContext(contextVectorStore, sanitizedQuestion, config.numContextDocumentsToRetrieve);
  const history = await getRelevantContext(memoryVectorStore, sanitizedQuestion, config.numMemoryDocumentsToRetrieve);

  try {
    response = await chain.call({
      input: sanitizedQuestion,
      context,
      history,
      immediate_history: config.useWindowMemory ? windowMemory : '',
    });
    console.log("🚀 ~ file: index.js:72 ~ response:", response);
    if (response) {
      await addDocumentsToMemoryVectorStore([
        { content: sanitizedQuestion, metadataType: 'question' },
        { content: response.text, metadataType: 'answer' },
      ]);
      await logChat(chatLogDirectory, sanitizedQuestion, response.response);

      // Save response to a text file
      const fileName = 'response.txt';
      const filePath = path.join(__dirname, fileName);
      fs.writeFileSync(filePath, response.text);
      console.log(`Response saved to ${filePath}`);
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cancel:')) {
      // Handle cancellation error
    } else if (error instanceof Error) {
      console.error(chalk.red(error.message));
    } else {
      console.error(chalk.red(error));
    }
    // Return the error for further handling
    throw error;
  }

  return response;
}

// Example usage
// const question = "For what is used runWithEmbeddings function?";
const question = process.argv[2] || "What can you do?";
processQuestion(question)
  .then(response => {
    // Handle the response if needed
    console.log("Response:", response);
  })
  .catch(error => {
    // Handle the error if needed
    console.error("Error:", error);
  });