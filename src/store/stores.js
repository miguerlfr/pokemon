import { defineStore } from "pinia";
import { ref } from "vue";

export const useContStore = defineStore("admin", ()=>{
    let cont = ref(10)
    function sumar() {
        cont.value++
    }

    return{
        cont, sumar
    }
},
{
    persist:true
}
)