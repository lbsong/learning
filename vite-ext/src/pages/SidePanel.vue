<template>
    <h2 class="word">{{ voc }}</h2>
    <ol class="list-group">
        <li v-for="word in vocabulary.value" class="list-group-item">
            <span class="fw-bold">{{ word.phonetic }}</span>
            <ul>
                <li v-for="meaning in word.meanings">
                    <h6>{{ meaning.partOfSpeech }}</h6>
                    <ol>
                        <li v-for="definition in meaning.definitions">
                            <span class="fst-italic">{{ definition.definition }}</span>
                            <br />
                            <span class="border-bottom border-subtle">{{ definition.example }}</span>
                        </li>
                    </ol>
                </li>
            </ul>
        </li>
    </ol>
    <ul class="list-group">
        <li v-for="word in words.value">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ word }}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, reactive } from 'vue';

const voc = ref('');
const val: DefinitionResponse[] = [];
const vocabulary = reactive({ value: val });

const test: string[] = [];
const words = reactive({value: test});

export interface Phonetic {
    text: string;
    phonetic: string;
    phonetics: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Array<Definition>;
}

export interface Definition {
    definition: string;
    example: string;
}

export interface DefinitionResponse {
    word: string;
    phonetic: string;
    phonetics: Array<Phonetic>;
    meanings: Array<Meaning>;
}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    voc.value = message.data.value;
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${voc.value}`);
    const defs = await response.json();
    vocabulary.value = defs;
    console.log(vocabulary.value);

    const test = await chrome.storage.local.get(null);
    words.value = Object.keys(test);
})
</script>