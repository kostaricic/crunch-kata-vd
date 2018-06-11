<template>
    <div>
        <div
            :style="[borderLeft, indent]"
            @click="showChildren = !showChildren"
            class="recursive-container"
            :class="{'cursor-pointer': valueProp, 'left-border': !valueProp}"
            >
            <h4 style="lineHeight:50%">
                <i v-if="valueProp" :class="iconClasses"></i>
                {{ keyProp.length > 1 ? keyValueProp.name : keyProp[0] }}
            </h4>
            <p>
                {{ keyValueProp ? (!keyValueProp.description && !valueProp ? "NO DESCRIPTION" : keyValueProp.description ) : '' }}
            </p>
        </div>

        <transition-group name="slide-fade">
            <display-data
                v-if="showChildren"
                v-for="(node, index) in valueProp"
                :key="index"
                :valueProp="node[Object.keys(node)]"
                :keyProp="Object.keys(node)"
                :keyValueProp="node"
                :depth="depth + 1"
                >
            </display-data>
        </transition-group>
    </div>
</template>

<script>
import {ranNum} from '../helpers'
export default {
    props: ['keyProp', 'valueProp', 'keyValueProp', 'depth'],

    data () {
        return { showChildren: false }
    },

    computed: {

        indent () {
            return {
                transform: `translate(${this.depth * 30}px)`
            }
        },

        iconClasses () {
            return {
                'fa fa-plus-square': !this.showChildren,
                'fa fa-minus-square': this.showChildren
            }
        },

        borderLeft () {
            return {
                borderLeft: `5px solid rgba(${ranNum(256)},${ranNum(256)},${ranNum(256)},.1)`
            }
        }

    },
}

</script>

<style>

    i {
        color: rgb(65, 65, 65);
    }

    .recursive-container {
        border: 1px solid rgba(124, 124, 124, 0.172);
        border-radius: 5px;
        padding-left: 12px;
        margin: 10px;
        background-color: rgba(240, 240, 240, 0.282);
        box-shadow: 2px 1px 40px -14px rgba(0,0,0,0.52);
        -webkit-box-shadow: 2px 1px 40px -14px rgba(0,0,0,0.52);
        -moz-box-shadow: 2px 1px 40px -14px rgba(0,0,0,0.52);
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .left-border {
        border-left: 8px solid rgba(106, 106, 106, 0.336);
    }

    /* vue transition */
    .slide-fade-enter-active {
    transition: all .3s ease;
    }
    .slide-fade-leave-active {
    transition: all .2s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
    }

</style>
