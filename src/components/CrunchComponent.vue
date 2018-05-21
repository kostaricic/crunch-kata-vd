<template>
    <div>
        <!-- for debugging -->
        <!-- <div>
            <h1>key</h1>
            {{ keyProp }}
            <hr>
            <h1>value</h1>
            {{ valueProp }}
            <hr>
            <h1>keyvalue</h1>
            {{ keyValueProp }}
        </div> -->

        <div :style="indent" @click="toggleChildren()">
            {{ keyProp.length > 1 ? keyValueProp.name : keyProp[0] }}
        </div>

        <div>

        </div>
        <crunch-component
            v-if="showChildren"
            v-for="(node, index) in valueProp"
            :key="index"
            :valueProp="node[Object.keys(node)]"
            :keyProp="Object.keys(node)"
            :keyValueProp="node"
            :depth="depth + 1"
        >
        </crunch-component>
    </div>
</template>

<script>
export default {
    props: ['keyProp', 'valueProp', 'keyValueProp', 'depth'],

    data() {
        return { showChildren: false }
    },

    computed: {
        indent () {
            return { transform: `translate(${this.depth * 30}px)` }
        }
    },

    methods: {
        toggleChildren() {
            this.showChildren = !this.showChildren
        }
    }
}

</script>
