import {ORDER_STATES} from "./order-states";
import {STATES} from "./states";

export const ACCEPT_ACTION_HANDLER = {

    handle(vm, func, data) {
       if(typeof data["order_state_id"] !== "undefined") {
           if(ORDER_STATES.isAccept(data["order_state_id"])) {
               vm.state = STATES.ANSWER;
               vm.order.id = data.id;
           } else {
               func()
           }
       }

    }
}

