<template>
    <h1>SidePanel Test</h1>
    <div id="divWord"> New word is: {{ word }}</div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    console.log("Hello from the side panel!");
    // import OpenAI from "openai";

    // const openai = new OpenAI(process.env.VUE_APP_OPENAI_API_KEY);
    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         {
    //             role: "user",
    //             content: "Hello, how are you?",
    //         }
    //     ],
    //     model: "davinci"
    // });

    // console.log(completion.choices);

    let word = ref("test");

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log("Message received!");
        console.log(message);
        console.log(sender);
        console.log(sendResponse)

        word = ref(message.data.value);
        console.log("Word is: " + word);
    });
</script>