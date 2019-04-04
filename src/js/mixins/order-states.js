const ACCEPT =  2;
const CANCEL =  3;
const REJECT =  4;
const DONE =  5;

export const ORDER_STATES = {
    statesName: {
        en: {
            [ACCEPT]: "Accept",
            [CANCEL]: "Cancelled",
            [REJECT]: "Rejected",
            [DONE]: "Done"
        },
        ru: {
            [ACCEPT]: "На одобрении",
            [CANCEL]: "Отменен",
            [REJECT]: "Отклонен",
            [DONE]: "Выполнен"
        },

    },

    isCancelled(state) {
        return state == CANCEL;
    },
    isAccept(state) {
        return state == ACCEPT;
    },
    isDone(state) {
        return state == DONE;
    },
    isRejected(state) {
        return state == REJECT;
    },


    getName(state, lang) {

       lang = lang || "en";


        if(typeof  this.statesName[lang][state] != "undefined" )
        {
            let result = this.statesName[lang][state];

            return result;
        }

        return state;

    }
}

