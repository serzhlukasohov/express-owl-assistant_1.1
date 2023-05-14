export function getDefaultOraOptions(output) {
    return {
        text: 'Loading',
        stream: output,
        discardStdin: false,
    };
}
const defaultConfig = {
    numContextDocumentsToRetrieve: 6,
    numMemoryDocumentsToRetrieve: 4,
    useWindowMemory: true,
};
let config = { ...defaultConfig };
export function getConfig() {
    return config;
}
export function setNumContextDocumentsToRetrieve(numContextDocumentsToRetrieve) {
    config = { ...config, numContextDocumentsToRetrieve };
}
export function setNumMemoryDocumentsToRetrieve(numMemoryDocumentsToRetrieve) {
    config = { ...config, numMemoryDocumentsToRetrieve };
}
export function setUseWindowMemory(useWindowMemory) {
    config = { ...config, useWindowMemory };
}
//# sourceMappingURL=index.js.map