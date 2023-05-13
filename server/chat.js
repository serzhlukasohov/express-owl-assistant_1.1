require('dotenv').config();
const readline = require('node:readline/promises');
const path = require('path');
const fs = require('fs');
const { stdin: input, stdout: output } = require('node:process');
const { CallbackManager } = require('langchain/callbacks');
const { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');
const { oneLine } = require('common-tags');
const chalk = require('chalk');
const { logChat } = require('./chatLogger'); // done
// const { createCommandHandler } = require('./commands.js');
const { getMemoryVectorStore, addDocumentsToMemoryVectorStore, getBufferWindowMemory } = require('./memoryManager');
const { getContextVectorStore } = require('./lib/contextManager.js');
const { getRelevantContext } = require('./lib/vectorStoreUtils.js');
const { sanitizeInput } = require('./utils/string.js');
const { getConfig } = require('./config/index.js');

dotenv.config();

const __dirname = new URL('..', import.meta.url).pathname;

async function processInput(input) {
  const chatLogDirectory = path.join(__dirname, 'chat_logs');
  const systemPromptTemplate = fs.readFileSync(path.join(__dirname, 'src/prompt.txt'), 'utf8');
  //   const commandHandler = createCommandHandler();
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

  let response;
  // let processedOutput = '';

  //   if (input.startsWith('/')) {
  // const [command, ...args] = input.slice(1).split(' ');
  // await commandHandler.execute(command, args, { write: (token) => (processedOutput += token) });
  //   } else {
  let memoryVectorStore = await getMemoryVectorStore();
  const question = sanitizeInput(input);
  const config = getConfig();
  const context = await getRelevantContext(contextVectorStore, question, config.numContextDocumentsToRetrieve);
  const history = await getRelevantContext(memoryVectorStore, question, config.numMemoryDocumentsToRetrieve);
  try {
    response = await chain.call({
      input: question,
      context,
      history,
      immediate_history: config.useWindowMemory ? windowMemory : '',
    });
    if (response) {
      await addDocumentsToMemoryVectorStore([
        { content: question, metadataType: 'question' },
        { content: response.text, metadataType: 'answer' },
      ]);
      await logChat(chatLogDirectory, question, response.response);
      return response.text;
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cancel:')) {
    } else if (error instanceof Error) {
      console.error(chalk.red(error.message));
    } else {
      console.error(chalk.red(error));
    }
  }
  //   }  
}

export default processInput;
