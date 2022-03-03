<template>
<div>
    <h2>{{loaded}}/{{total}}</h2>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import {Vue, Options} from 'vue-class-component';


declare interface ComponentData {
    loaded: number,
    total: number
    key: string
}

export default defineComponent({
    name: "ProgressBar",
    props: {
        loaded: Number,
        total: Number,
        key: String
    },
})
</script>