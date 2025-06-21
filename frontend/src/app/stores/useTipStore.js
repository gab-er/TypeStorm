import { create } from "zustand";
import Tips from "../components/TypingTip/Tips"; 
import {Random} from "random-js";


const random = new Random()

const useTipStore = create((set, get) => ({
    tips:Tips,
    displayTip: "",

    initialize: () => {
        const displayed = get().tips[random.integer(0,Tips.length-1)];
        set((state)=> (
            {
                displayTip: displayed,
                tips: state.tips.filter(tip => tip != displayed)
    }))},

    cycleTip: () => {
        if (get().tips.length == 0) {
            const displayed = random.pick(Tips.filter(tip => tip != get().displayTip))
            set((state) => ({
                displayTip: displayed,
                tips: Tips.filter(tip => tip != displayed)
            }))
        
        } else {
            const displayed = random.pick(get().tips)
            set((state) => ({
                displayTip: displayed,
                tips: state.tips.filter(tip =>tip != displayed)
            }))
        }
    }

}))

export default useTipStore