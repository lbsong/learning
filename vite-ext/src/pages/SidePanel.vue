<template>
    <h1>SidePanel Test</h1>
    <div id="divWord">
        <h2>{{ word.value }}</h2>
        <ul>
            <li v-for="def in response.value">
                <h3>{{ def.phonetic }}</h3>
                <ul>
                    <li v-for="meaning in def.meanings">
                        <h4>{{ meaning.partOfSpeech }}</h4>
                        <ul>
                            <li v-for="definition in meaning.definitions">
                                <p>{{ definition.definition }}</p>
                                <p>{{ definition.example }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { reactive } from 'vue'
    const word = reactive({ value: '' });

    interface Phonetic {
        text: string;
        audio: string;
        sourceUrl: string;
    }

    interface Meaning {
        partOfSpeech: string;
        definitions: Array<Definition>;
    }

    interface Definition {
        definition: string;
        example: string;
    }

    interface DefinitionResponse {
        word: string;
        phonetic: string;
        phonetics: Array<Phonetic>;
        meanings: Array<Meaning>;
    }

    const response = reactive({ value: Array<DefinitionResponse> });

    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
        console.log("Message received!");
        console.log(message);
        console.log(sender);
        console.log(sendResponse);
        word.value = message.data.value;

        const def = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`);
        const defJson = await def.json();
        console.log(defJson);

        response.value = defJson;
    })
</script>